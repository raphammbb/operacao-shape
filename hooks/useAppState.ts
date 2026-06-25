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
  startDate: hojeLocal(),
};

const STATE_REF = doc(db, "barriguinha", "state");

export function hojeLocal(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
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

  const salvarCheckin = useCallback(async (checkin: Omit<Checkin, "date">): Promise<void> => {
    const date = hojeLocal();
    const next = await new Promise<AppState>((resolve) => {
      setState((prev) => {
        const semHoje = prev.checkins.filter((c) => c.date !== date);
        const n: AppState = { ...prev, checkins: [{ ...checkin, date }, ...semHoje] };
        resolve(n);
        return n;
      });
    });
    await setDoc(STATE_REF, next);
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

  const checkinHoje = state.checkins.find((c) => c.date === hojeLocal());

  return {
    state,
    loaded,
    salvarCheckin,
    exportarDados,
    importarDados,
    checkinHoje,
  };
}
