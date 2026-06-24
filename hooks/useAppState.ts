"use client";

import { useState, useEffect, useCallback } from "react";
import { calcularStreak } from "@/lib/streak";
import { verificarConquistas } from "@/lib/trophies";

export type Checkin = {
  date: string;
  raphaTreinou: "sim" | "nao" | "pulei";
  elaCardio: "sim" | "nao" | "pulei";
  alimentacao: "limpo" | "parcial" | "escorregou";
  agua: "ambos" | "um" | "nenhum";
  dormiu: "sim" | "nao";
  xpRapha: number;
  xpEla: number;
};

export type AppState = {
  checkins: Checkin[];
  streak: number;
  raphaXP: number;
  elaXP: number;
  startDate: string;
  trophies: string[];
  nomEla: string;
  onboardingConcluido: boolean;
};

const STORAGE_KEY = "operacao-shape-v1";

const DEFAULT_STATE: AppState = {
  checkins: [],
  streak: 0,
  raphaXP: 0,
  elaXP: 0,
  startDate: new Date().toISOString().split("T")[0],
  trophies: [],
  nomEla: "Ela",
  onboardingConcluido: false,
};

function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useAppState() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  const salvarCheckin = useCallback(
    (checkin: Omit<Checkin, "date">) => {
      updateState((prev) => {
        const date = new Date().toISOString().split("T")[0];
        const jaFez = prev.checkins.some((c) => c.date === date);
        if (jaFez) return prev;

        const novoCheckin: Checkin = { ...checkin, date };
        const novosCheckins = [novoCheckin, ...prev.checkins];
        const novoStreak = calcularStreak(novosCheckins);
        const novoRaphaXP = prev.raphaXP + checkin.xpRapha;
        const novoElaXP = prev.elaXP + checkin.xpEla;

        const novoState: AppState = {
          ...prev,
          checkins: novosCheckins,
          streak: novoStreak,
          raphaXP: novoRaphaXP,
          elaXP: novoElaXP,
        };

        const novasConquistas = verificarConquistas(novoState);
        return {
          ...novoState,
          trophies: [...prev.trophies, ...novasConquistas],
        };
      });
    },
    [updateState]
  );

  const concluirOnboarding = useCallback(
    (nomEla: string, startDate: string) => {
      updateState((prev) => ({
        ...prev,
        nomEla,
        startDate,
        onboardingConcluido: true,
      }));
    },
    [updateState]
  );

  const exportarDados = useCallback(() => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "operacao-shape-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importarDados = useCallback(
    (json: string) => {
      try {
        const parsed = JSON.parse(json);
        const next = { ...DEFAULT_STATE, ...parsed };
        saveState(next);
        setState(next);
      } catch {
        console.error("Erro ao importar dados");
      }
    },
    []
  );

  const checkinHoje = state.checkins.find(
    (c) => c.date === new Date().toISOString().split("T")[0]
  );

  return {
    state,
    loaded,
    salvarCheckin,
    concluirOnboarding,
    exportarDados,
    importarDados,
    checkinHoje,
  };
}
