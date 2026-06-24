import type { AppState } from "@/hooks/useAppState";

export type Trophy = {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
};

export const TROPHIES: Trophy[] = [
  { id: "estreia", nome: "Estreia", descricao: "Primeiro treino registrado", emoji: "🌟" },
  { id: "trio", nome: "Trio", descricao: "3 treinos em uma semana", emoji: "🔥" },
  { id: "sequencia", nome: "Sequência", descricao: "7 dias de streak", emoji: "⚡" },
  { id: "hidratado", nome: "Hidratado", descricao: "5 dias com 2L de água", emoji: "💧" },
  { id: "mes-limpo", nome: "Mês Limpo", descricao: "30 dias sem fast food", emoji: "🥗" },
  { id: "raio", nome: "Raio", descricao: "500 XP acumulados", emoji: "⚡" },
];

export function verificarConquistas(state: AppState): string[] {
  const novas: string[] = [];
  const { checkins, streak, raphaXP, elaXP, trophies } = state;

  const temEstreia = checkins.some((c) => c.raphaTreinou === "sim" || c.elaCardio === "sim");
  if (temEstreia && !trophies.includes("estreia")) novas.push("estreia");

  const ultima7Dias = checkins.slice(0, 7);
  const treinosNaSemana = ultima7Dias.filter((c) => c.raphaTreinou === "sim").length;
  if (treinosNaSemana >= 3 && !trophies.includes("trio")) novas.push("trio");

  if (streak >= 7 && !trophies.includes("sequencia")) novas.push("sequencia");

  const diasHidratados = checkins.filter((c) => c.agua === "ambos").length;
  if (diasHidratados >= 5 && !trophies.includes("hidratado")) novas.push("hidratado");

  const diasSemFastFood = checkins.filter((c) => c.alimentacao !== "escorregou").length;
  if (diasSemFastFood >= 30 && !trophies.includes("mes-limpo")) novas.push("mes-limpo");

  if ((raphaXP + elaXP) >= 500 && !trophies.includes("raio")) novas.push("raio");

  return novas;
}
