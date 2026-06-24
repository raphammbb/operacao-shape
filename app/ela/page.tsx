"use client";

import { useAppState } from "@/hooks/useAppState";
import ProgressBar from "@/components/ProgressBar";
import TrophyGrid from "@/components/TrophyGrid";
import { getNivel, getProximoNivel } from "@/lib/xp";

const card: React.CSSProperties = {
  backgroundColor: "#18181b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

const SESSOES: Record<number, string> = {
  1: "LISS — Cardio moderado",
  3: "HIIT Leve",
  5: "Cardio + Core",
};
const DIAS_NOMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function getProximaSessao(): string {
  const hoje = new Date().getDay();
  if (SESSOES[hoje]) return `Hoje — ${SESSOES[hoje]}`;
  const order = [1, 3, 5];
  for (let i = 1; i <= 7; i++) {
    const d = (hoje + i) % 7;
    if (order.includes(d)) {
      return `${DIAS_NOMES[d]} — ${SESSOES[d]}`;
    }
  }
  return "—";
}

export default function ElaPage() {
  const { state, loaded } = useAppState();
  if (!loaded) return null;

  const cardiosMes = state.checkins.filter((c) => c.elaCardio === "sim").length;
  const nivel = getNivel(state.elaXP);
  const proximo = getProximoNivel(state.elaXP);
  const proximaSessao = getProximaSessao();

  const cardios4Semanas = Array.from({ length: 4 }, (_, i) => {
    const count = state.checkins
      .slice(i * 7, i * 7 + 7)
      .filter((c) => c.elaCardio === "sim").length;
    return { semana: `S${4 - i}`, cardios: count };
  }).reverse();

  const diasComAgua = state.checkins.filter((c) => c.agua === "ambos").length;
  const diasSemFastFood = state.checkins.filter((c) => c.alimentacao !== "escorregou").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header perfil */}
      <div style={{ ...card, display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "rgba(244,114,182,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#f472b6",
            flexShrink: 0,
          }}
        >
          {state.nomEla[0]?.toUpperCase() || "E"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: "1.2rem" }}>{state.nomEla}</div>
          <div style={{ color: "#f472b6", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            {nivel.nome} · {state.elaXP} XP
          </div>
          {proximo && (
            <ProgressBar
              value={state.elaXP - nivel.minXP}
              max={proximo.minXP - nivel.minXP}
              color="#f472b6"
            />
          )}
          {proximo && (
            <div style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.3rem" }}>
              {proximo.minXP - state.elaXP} XP para {proximo.nome}
            </div>
          )}
          {!proximo && (
            <div style={{ fontSize: "0.85rem", color: "#22c55e" }}>Nível máximo atingido! 🏆</div>
          )}
        </div>
      </div>

      {/* Grid métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
        <div style={card}>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Cardios no mês</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 600, color: "#f472b6", fontVariantNumeric: "tabular-nums" }}>
            {cardiosMes}<span style={{ fontSize: "1.1rem", color: "#71717a" }}>/12</span>
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <ProgressBar value={cardiosMes} max={12} color="#f472b6" />
          </div>
        </div>

        <div style={card}>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Próxima sessão</div>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fafafa", marginTop: "0.5rem", lineHeight: 1.4 }}>
            {proximaSessao}
          </div>
        </div>

        <div style={card}>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Streak atual</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 600, color: "#22c55e", fontVariantNumeric: "tabular-nums" }}>
            {state.streak}<span style={{ fontSize: "1.1rem", color: "#71717a" }}>d</span>
          </div>
        </div>
      </div>

      {/* Cardios por semana */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Cardios por semana (últimas 4)</div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end", height: 80 }}>
          {cardios4Semanas.map((s) => (
            <div key={s.semana} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
              <div
                style={{
                  width: "100%",
                  height: s.cardios === 0 ? 4 : (s.cardios / 3) * 60,
                  backgroundColor: s.cardios >= 3 ? "#f472b6" : s.cardios > 0 ? "rgba(244,114,182,0.5)" : "rgba(255,255,255,0.06)",
                  borderRadius: "0.3rem",
                  transition: "height 0.3s",
                }}
              />
              <span style={{ fontSize: "0.72rem", color: "#71717a" }}>{s.semana}</span>
              <span style={{ fontSize: "0.72rem", color: "#f472b6", fontVariantNumeric: "tabular-nums" }}>{s.cardios}/3</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hábitos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div style={card}>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Dias com água (2L)</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 600, color: "#38bdf8", fontVariantNumeric: "tabular-nums" }}>
            {diasComAgua}
          </div>
        </div>
        <div style={card}>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Dias sem fast food</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 600, color: "#22c55e", fontVariantNumeric: "tabular-nums" }}>
            {diasSemFastFood}
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div style={card}>
        <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "1rem" }}>Conquistas</div>
        <TrophyGrid unlocked={state.trophies} />
      </div>
    </div>
  );
}
