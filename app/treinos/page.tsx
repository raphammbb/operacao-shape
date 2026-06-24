"use client";

import { useState } from "react";
import { treinosRapha, treinosEla } from "@/data/treinos";

type Tab = "rapha" | "ela";

const card: React.CSSProperties = {
  backgroundColor: "#18181b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

export default function TreinosPage() {
  const [tab, setTab] = useState<Tab>("rapha");
  const [feitos, setFeitos] = useState<Record<string, boolean>>({});

  function toggleFeito(key: string) {
    setFeitos((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const treinos = tab === "rapha" ? treinosRapha : treinosEla;
  const accentColor = tab === "rapha" ? "#8b5cf6" : "#f472b6";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h1 style={{ fontWeight: 600, fontSize: "1.4rem", margin: "0 0 1rem" }}>Fichas de Treino</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["rapha", "ela"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "0.5rem",
                border: `1px solid ${tab === t ? (t === "rapha" ? "#8b5cf6" : "#f472b6") : "rgba(255,255,255,0.08)"}`,
                backgroundColor: tab === t ? (t === "rapha" ? "rgba(139,92,246,0.15)" : "rgba(244,114,182,0.15)") : "transparent",
                color: tab === t ? (t === "rapha" ? "#8b5cf6" : "#f472b6") : "#71717a",
                cursor: "pointer",
                fontWeight: tab === t ? 600 : 400,
                fontSize: "0.9rem",
              }}
            >
              {t === "rapha" ? "Rapha — Musculação" : "Ela — Cardio"}
            </button>
          ))}
        </div>
      </div>

      {treinos.map((treino) => (
        <div key={treino.id} style={card}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", gap: "1rem" }}>
            <div>
              {treino.letra && (
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "0.3rem",
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  TREINO {treino.letra}
                </span>
              )}
              <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>{treino.nome}</div>
              <div style={{ fontSize: "0.82rem", color: "#71717a", marginTop: "0.2rem" }}>
                {treino.dia} · {treino.duracao}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {treino.exercicios.map((ex, i) => {
              const key = `${treino.id}-${i}`;
              const done = feitos[key];
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    padding: "0.65rem 0.75rem",
                    borderRadius: "0.5rem",
                    backgroundColor: done ? `${accentColor}08` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${done ? `${accentColor}20` : "rgba(255,255,255,0.04)"}`,
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1 }}>
                    <span style={{ fontSize: "0.85rem", color: done ? "#71717a" : "#fafafa", textDecoration: done ? "line-through" : "none" }}>
                      {ex.nome}
                    </span>
                    <span
                      style={{
                        padding: "0.15rem 0.5rem",
                        borderRadius: "9999px",
                        fontSize: "0.72rem",
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {ex.series}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFeito(key)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: `2px solid ${done ? accentColor : "rgba(255,255,255,0.15)"}`,
                      backgroundColor: done ? accentColor : "transparent",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#fff",
                      fontSize: "0.75rem",
                    }}
                  >
                    {done ? "✓" : ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
