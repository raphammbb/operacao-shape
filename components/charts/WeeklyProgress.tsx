"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Checkin } from "@/hooks/useAppState";

type Props = {
  checkins: Checkin[];
};

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getDadosSemana(checkins: Checkin[]) {
  const hoje = new Date();
  const diasSemana: { dia: string; rapha: number; ela: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(hoje);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const diaNome = DIAS[d.getDay()];

    const c = checkins.find((ch) => ch.date === dateStr);
    diasSemana.push({
      dia: diaNome,
      rapha: c ? (c.raphaTreinou === "sim" ? 1 : 0) : 0,
      ela: c ? (c.elaCardio === "sim" ? 1 : 0) : 0,
    });
  }

  return diasSemana;
}

export default function WeeklyProgress({ checkins }: Props) {
  const data = getDadosSemana(checkins);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="dia"
          tick={{ fill: "#71717a", fontSize: 12 }}
          axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#71717a", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 1]}
          ticks={[0, 1]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.5rem",
            color: "#fafafa",
            fontSize: 13,
          }}
          formatter={(value) => [value === 1 ? "✓ Feito" : "—"]}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "#71717a" }}
        />
        <Line
          type="monotone"
          dataKey="rapha"
          name="Rapha"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: "#8b5cf6", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="ela"
          name="Ela"
          stroke="#f472b6"
          strokeWidth={2}
          dot={{ fill: "#f472b6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
