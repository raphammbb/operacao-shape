"use client";

import { useAppState } from "@/hooks/useAppState";
import TrophyGrid from "@/components/TrophyGrid";
import { NIVEIS, XP_VALUES } from "@/lib/xp";

const card: React.CSSProperties = {
  backgroundColor: "#18181b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

const REGRAS = [
  { emoji: "🍔", titulo: "Zero fast food", descricao: "30 dias sem fast food. Exceção: 1 refeição livre na semana 4 se metas no verde." },
  { emoji: "🍬", titulo: "Zero doce", descricao: "Semana 1 sem doce. Avaliação todo domingo para decidir se estende." },
  { emoji: "💧", titulo: "2L de água por dia", descricao: "Cada um bebe pelo menos 2 litros por dia." },
  { emoji: "🌙", titulo: "Dormir antes da 1h", descricao: "Tela desligada e na cama antes da meia-noite e meia." },
  { emoji: "📋", titulo: "Check-in dominical", descricao: "Check-in conjunto todo domingo para avaliar a semana." },
];

const XP_TABLE = [
  { acao: "Treino concluído", xp: XP_VALUES.treinoRapha },
  { acao: "Cardio concluído", xp: XP_VALUES.cardioEla },
  { acao: "2L de água (cada)", xp: XP_VALUES.agua },
  { acao: "Dormiu antes da 1h", xp: XP_VALUES.dormiu },
  { acao: "Dia sem fast food", xp: XP_VALUES.semFastFood },
  { acao: "Dia sem doce", xp: XP_VALUES.semDoce },
  { acao: "Check-in dominical", xp: XP_VALUES.checkinDominical },
];

export default function HabitosPage() {
  const { state, loaded, exportarDados } = useAppState();
  if (!loaded) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h1 style={{ fontWeight: 600, fontSize: "1.4rem", margin: 0 }}>Hábitos & Regras</h1>

      {/* Pacto */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Pacto do casal</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {REGRAS.map((r) => (
            <div
              key={r.titulo}
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{r.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{r.titulo}</div>
                <div style={{ fontSize: "0.8rem", color: "#71717a", marginTop: "0.2rem" }}>{r.descricao}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela XP */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Sistema de XP</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.4rem 0.5rem", color: "#71717a", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                Ação
              </th>
              <th style={{ textAlign: "right", padding: "0.4rem 0.5rem", color: "#71717a", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                XP
              </th>
            </tr>
          </thead>
          <tbody>
            {XP_TABLE.map((row) => (
              <tr key={row.acao}>
                <td style={{ padding: "0.5rem 0.5rem", color: "#fafafa" }}>{row.acao}</td>
                <td style={{ padding: "0.5rem 0.5rem", textAlign: "right", color: "#22c55e", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  +{row.xp} xp
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela de níveis */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Tabela de níveis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {NIVEIS.map((n) => {
            const raphaOk = state.raphaXP >= n.minXP;
            const elaOk = state.elaXP >= n.minXP;
            return (
              <div
                key={n.nome}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.6rem 0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ flex: 1, fontWeight: raphaOk || elaOk ? 600 : 400, color: raphaOk || elaOk ? "#fafafa" : "#71717a" }}>
                  {n.nome}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#71717a", fontVariantNumeric: "tabular-nums" }}>
                  {n.minXP} XP
                </div>
                {raphaOk && <span style={{ fontSize: "0.72rem", color: "#8b5cf6", backgroundColor: "rgba(139,92,246,0.1)", padding: "0.15rem 0.4rem", borderRadius: "0.3rem" }}>Rapha ✓</span>}
                {elaOk && <span style={{ fontSize: "0.72rem", color: "#f472b6", backgroundColor: "rgba(244,114,182,0.1)", padding: "0.15rem 0.4rem", borderRadius: "0.3rem" }}>{state.nomEla} ✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conquistas */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Conquistas</div>
        <TrophyGrid unlocked={state.trophies} />
      </div>

      {/* Backup */}
      <div
        style={{
          ...card,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Backup dos dados</div>
          <div style={{ fontSize: "0.8rem", color: "#71717a", marginTop: "0.2rem" }}>
            Exporte para não perder seu histórico ao limpar o browser.
          </div>
        </div>
        <button
          onClick={exportarDados}
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fafafa",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Exportar JSON
        </button>
      </div>
    </div>
  );
}
