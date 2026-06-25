"use client";

import { hojeLocal } from "@/hooks/useAppState";
import type { Checkin } from "@/hooks/useAppState";

const DIAS_LABEL = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const COR_VERDE = "#22c55e";
const COR_CINZA = "#3f3f46";
const COR_LARANJA = "#f59e0b";

function diasDaSemana(): string[] {
  const d = new Date();
  const seg = new Date(d);
  seg.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const dia = new Date(seg);
    dia.setDate(seg.getDate() + i);
    return [
      dia.getFullYear(),
      String(dia.getMonth() + 1).padStart(2, "0"),
      String(dia.getDate()).padStart(2, "0"),
    ].join("-");
  });
}

function isTarde(hora: string): boolean {
  const [h] = hora.split(":").map(Number);
  return h >= 1 && h < 12;
}

function Bolinha({ cor }: { cor: string | null }) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: cor ?? "transparent",
        border: cor ? "none" : "1px solid rgba(255,255,255,0.1)",
      }}
    />
  );
}

type Props = {
  checkins: Checkin[];
  pessoa: "rapha" | "soso";
  cor: string;
};

export function HabitsWeekGrid({ checkins, pessoa, cor }: Props) {
  const dias = diasDaSemana();
  const hoje = hojeLocal();

  const porData = Object.fromEntries(checkins.map((c) => [c.date, c]));

  const campoAgua = pessoa === "rapha" ? "raphaAgua" : "elaAgua";
  const campoDoce = pessoa === "rapha" ? "raphaComeuDoce" : "elaComeuDoce";
  const campoDormir = pessoa === "rapha" ? "raphaHorarioDormir" : "elaHorarioDormir";

  return (
    <div
      style={{
        borderRadius: "0.875rem",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(15,15,18,0.65)",
        padding: "1.25rem",
        marginBottom: "0.6rem",
      }}
    >
      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#52525b",
          margin: "0 0 1.25rem",
        }}
      >
        Hábitos da semana
      </p>

      {/* Cabeçalho dias */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60px repeat(7, 1fr)",
          gap: "0.25rem",
          marginBottom: "0.75rem",
          alignItems: "center",
        }}
      >
        <div />
        {DIAS_LABEL.map((d, i) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: dias[i] === hoje ? cor : "#3f3f46",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Linha água */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60px repeat(7, 1fr)",
          gap: "0.25rem",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#71717a" }}>💧 Água</span>
        {dias.map((dia) => {
          const c = porData[dia];
          const val = c?.[campoAgua];
          const bolCor = c == null ? null : val === true ? COR_VERDE : val === false ? COR_CINZA : null;
          return (
            <div key={dia} style={{ display: "flex", justifyContent: "center" }}>
              <Bolinha cor={bolCor} />
            </div>
          );
        })}
      </div>

      {/* Linha doce */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60px repeat(7, 1fr)",
          gap: "0.25rem",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#71717a" }}>🍬 Doce</span>
        {dias.map((dia) => {
          const c = porData[dia];
          const val = c?.[campoDoce];
          const bolCor = c == null ? null : val === false ? COR_VERDE : val === true ? COR_LARANJA : null;
          return (
            <div key={dia} style={{ display: "flex", justifyContent: "center" }}>
              <Bolinha cor={bolCor} />
            </div>
          );
        })}
      </div>

      {/* Linha dormir */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60px repeat(7, 1fr)",
          gap: "0.25rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "#71717a" }}>🌙 Dormir</span>
        {dias.map((dia) => {
          const c = porData[dia];
          const hora = c?.[campoDormir] ?? null;
          return (
            <div
              key={dia}
              style={{
                textAlign: "center",
                fontSize: "0.62rem",
                fontWeight: 500,
                color: hora == null ? "#27272a" : isTarde(hora) ? COR_LARANJA : "#a1a1aa",
              }}
            >
              {hora ?? "—"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
