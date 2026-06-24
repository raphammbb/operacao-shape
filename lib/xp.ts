export const XP_VALUES = {
  treinoRapha: 30,
  cardioEla: 25,
  agua: 10,
  dormiu: 10,
  semFastFood: 15,
  semDoce: 10,
  checkinDominical: 20,
} as const;

export type Nivel = {
  nome: string;
  minXP: number;
};

export const NIVEIS: Nivel[] = [
  { nome: "Iniciante", minXP: 0 },
  { nome: "Ativo", minXP: 100 },
  { nome: "Consistente", minXP: 300 },
  { nome: "Dedicado", minXP: 600 },
  { nome: "Elite", minXP: 1000 },
];

export function getNivel(xp: number): Nivel {
  let nivel = NIVEIS[0];
  for (const n of NIVEIS) {
    if (xp >= n.minXP) nivel = n;
  }
  return nivel;
}

export function getProximoNivel(xp: number): Nivel | null {
  for (const n of NIVEIS) {
    if (xp < n.minXP) return n;
  }
  return null;
}

export function calcularXPDia(checkin: {
  raphaTreinou: string;
  elaCardio: string;
  alimentacao: string;
  agua: string;
  dormiu: string;
  isDomingoCheckin?: boolean;
}): { raphaXP: number; elaXP: number; total: number } {
  let raphaXP = 0;
  let elaXP = 0;

  if (checkin.raphaTreinou === "sim") raphaXP += XP_VALUES.treinoRapha;
  if (checkin.elaCardio === "sim") elaXP += XP_VALUES.cardioEla;

  const xpCompartilhado: number[] = [];
  if (checkin.alimentacao === "limpo") xpCompartilhado.push(XP_VALUES.semFastFood);
  if (checkin.alimentacao !== "escorregou") xpCompartilhado.push(XP_VALUES.semDoce);
  if (checkin.agua === "ambos") {
    raphaXP += XP_VALUES.agua;
    elaXP += XP_VALUES.agua;
  } else if (checkin.agua === "um") {
    raphaXP += XP_VALUES.agua / 2;
  }
  if (checkin.dormiu === "sim") {
    raphaXP += XP_VALUES.dormiu / 2;
    elaXP += XP_VALUES.dormiu / 2;
  }
  if (checkin.isDomingoCheckin) {
    raphaXP += XP_VALUES.checkinDominical / 2;
    elaXP += XP_VALUES.checkinDominical / 2;
  }

  const sharedTotal = xpCompartilhado.reduce((a, b) => a + b, 0);
  raphaXP += sharedTotal / 2;
  elaXP += sharedTotal / 2;

  return { raphaXP: Math.round(raphaXP), elaXP: Math.round(elaXP), total: Math.round(raphaXP + elaXP) };
}
