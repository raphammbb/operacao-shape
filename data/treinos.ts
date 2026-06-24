export type Exercicio = {
  nome: string;
  series: string;
  tempo?: string;
};

export type Treino = {
  id: string;
  letra?: string;
  nome: string;
  dia: string;
  duracao: string;
  exercicios: Exercicio[];
};

export const treinosRapha: Treino[] = [
  {
    id: "rapha-a",
    letra: "A",
    nome: "Peito + Tríceps + Ombro",
    dia: "Segunda-feira",
    duracao: "50–60 min",
    exercicios: [
      { nome: "Supino reto (barra ou halteres)", series: "4x 10–12" },
      { nome: "Supino inclinado halteres", series: "3x 12" },
      { nome: "Crossover ou abraço halteres", series: "3x 15" },
      { nome: "Desenvolvimento máquina ou halteres", series: "4x 10" },
      { nome: "Elevação lateral", series: "3x 15" },
      { nome: "Tríceps corda (superset)", series: "3x 12" },
      { nome: "Tríceps barra reta (superset)", series: "3x 12" },
    ],
  },
  {
    id: "rapha-b",
    letra: "B",
    nome: "Costas + Bíceps",
    dia: "Quarta-feira",
    duracao: "50–60 min",
    exercicios: [
      { nome: "Puxada frontal (pegada aberta)", series: "4x 10–12" },
      { nome: "Remada curvada (barra ou halteres)", series: "4x 10" },
      { nome: "Remada cavalinho ou máquina", series: "3x 12" },
      { nome: "Pullover haltere", series: "3x 15" },
      { nome: "Rosca direta (barra W)", series: "4x 10–12" },
      { nome: "Rosca martelo halteres", series: "3x 12" },
    ],
  },
  {
    id: "rapha-c",
    letra: "C",
    nome: "Pernas + Abdômen",
    dia: "Sexta-feira",
    duracao: "55–65 min",
    exercicios: [
      { nome: "Agachamento (barra ou goblet)", series: "4x 10–12" },
      { nome: "Leg press 45°", series: "4x 12" },
      { nome: "Cadeira extensora", series: "3x 15" },
      { nome: "Mesa flexora ou stiff halteres", series: "3x 12" },
      { nome: "Panturrilha em pé (máquina ou step)", series: "4x 20" },
      { nome: "Elevação de pernas", series: "3x 15" },
      { nome: "Prancha isométrica", series: "3x 40s", tempo: "40s" },
    ],
  },
];

export const treinosEla: Treino[] = [
  {
    id: "ela-1",
    nome: "Cardio Moderado LISS",
    dia: "Segunda-feira",
    duracao: "~40 min",
    exercicios: [
      { nome: "Aquecimento esteira leve", series: "5 min" },
      { nome: "Esteira inclinação 4–6%, ritmo conversacional", series: "30 min" },
      { nome: "Desaquecimento + alongamento", series: "5 min" },
    ],
  },
  {
    id: "ela-2",
    nome: "HIIT Leve",
    dia: "Quarta-feira",
    duracao: "~36 min",
    exercicios: [
      { nome: "Aquecimento", series: "5 min" },
      { nome: "8 rounds: 30s acelerado / 90s moderado", series: "16 min" },
      { nome: "Cardio leve de finalização", series: "10 min" },
      { nome: "Alongamento", series: "5 min" },
    ],
  },
  {
    id: "ela-3",
    nome: "Cardio + Core",
    dia: "Sexta-feira",
    duracao: "~50 min",
    exercicios: [
      { nome: "Elíptico ou bike, resistência média", series: "25 min" },
      { nome: "Abdominal crunch", series: "3x 20" },
      { nome: "Elevação de pernas deitada", series: "3x 15" },
      { nome: "Prancha", series: "3x 30s" },
      { nome: "Alongamento completo", series: "8 min" },
    ],
  },
];
