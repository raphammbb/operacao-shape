import type { Checkin } from "@/hooks/useAppState";

export function calcularStreak(checkins: Checkin[]): number {
  if (checkins.length === 0) return 0;

  const sorted = [...checkins].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  let current = today;

  for (const c of sorted) {
    if (c.date === current) {
      const temAtividade =
        c.raphaTreinou === "sim" ||
        c.elaCardio === "sim" ||
        c.alimentacao === "limpo";
      if (temAtividade) streak++;
      const d = new Date(current);
      d.setDate(d.getDate() - 1);
      current = d.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  return streak;
}

export function getDiaDesafio(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}
