"use client";

import { useState, useEffect, useCallback } from "react";

export type Checkin = {
  date: string;
  raphaTreinou: "sim" | "nao" | "pulei" | null;
  elaFezCardio: "sim" | "nao" | "pulei" | null;
  fastFood: "nenhum" | "um" | "mais" | null;
  raphaAgua: boolean | null;
  elaAgua: boolean | null;
  raphaComeuDoce: boolean | null;
  elaComeuDoce: boolean | null;
  raphaHorarioDormir: string | null;
  elaHorarioDormir: string | null;
};

export type AppState = {
  checkins: Checkin[];
  nomEla: string;
  startDate: string;
};

const STORAGE_KEY = "barriguinha-v1";

const DEFAULT_STATE: AppState = {
  checkins: [],
  nomEla: "Soso",
  startDate: new Date().toISOString().split("T")[0],
};

function hoje(): string {
  return new Date().toISOString().split("T")[0];
}

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
        const date = hoje();
        const semHoje = prev.checkins.filter((c) => c.date !== date);
        return { ...prev, checkins: [{ ...checkin, date }, ...semHoje] };
      });
    },
    [updateState]
  );

  const exportarDados = useCallback(() => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "barriguinha-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importarDados = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      const next: AppState = { ...DEFAULT_STATE, ...parsed };
      saveState(next);
      setState(next);
    } catch {
      console.error("Erro ao importar dados");
    }
  }, []);

  const checkinHoje = state.checkins.find((c) => c.date === hoje());

  return {
    state,
    loaded,
    salvarCheckin,
    exportarDados,
    importarDados,
    checkinHoje,
  };
}
