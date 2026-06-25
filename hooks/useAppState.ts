"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

const DEFAULT_STATE: AppState = {
  checkins: [],
  nomEla: "Soso",
  startDate: new Date().toISOString().split("T")[0],
};

const STATE_REF = doc(db, "barriguinha", "state");

function hoje(): string {
  return new Date().toISOString().split("T")[0];
}

export function useAppState() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      STATE_REF,
      (snap) => {
        if (snap.exists()) {
          setState({ ...DEFAULT_STATE, ...(snap.data() as AppState) });
        }
        setLoaded(true);
      },
      (err) => {
        console.error("Firestore:", err);
        setLoaded(true);
      }
    );
    return unsub;
  }, []);

  const salvarCheckin = useCallback((checkin: Omit<Checkin, "date">) => {
    const date = hoje();
    setState((prev) => {
      const semHoje = prev.checkins.filter((c) => c.date !== date);
      const next: AppState = {
        ...prev,
        checkins: [{ ...checkin, date }, ...semHoje],
      };
      setDoc(STATE_REF, next).catch(console.error);
      return next;
    });
  }, []);

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

  const importarDados = useCallback(async (json: string) => {
    try {
      const parsed = JSON.parse(json);
      const next: AppState = { ...DEFAULT_STATE, ...parsed };
      await setDoc(STATE_REF, next);
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
