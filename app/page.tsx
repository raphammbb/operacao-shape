"use client";

import { useAppState } from "@/hooks/useAppState";
import MetricCard from "@/components/MetricCard";
import ProgressBar from "@/components/ProgressBar";
import WeeklyProgress from "@/components/charts/WeeklyProgress";
import Onboarding from "@/components/Onboarding";
import Link from "next/link";
import { getDiaDesafio } from "@/lib/streak";
import { getNivel } from "@/lib/xp";

const card: React.CSSProperties = {
  backgroundColor: "#18181b",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

export default function Dashboard() {
  const { state, loaded, concluirOnboarding, checkinHoje } = useAppState();

  if (!loaded) return null;
  if (!state.onboardingConcluido) {
    return <Onboarding onConcluir={concluirOnboarding} />;
  }

  const diaAtual = getDiaDesafio(state.startDate);
  const treinosMes = state.checkins.filter((c) => c.raphaTreinou === "sim").length;
  const cardioMes = state.checkins.filter((c) => c.elaCardio === "sim").length;
  const diasSemFastFood = state.checkins.filter((c) => c.alimentacao !== "escorregou").length;
  const diasSemDoce = state.checkins.filter((c) => c.alimentacao !== "escorregou").length;
  const diasComAgua = state.checkins.filter((c) => c.agua === "ambos").length;

  const raphaLevel = getNivel(state.raphaXP);
  const elaLevel = getNivel(state.elaXP);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Status strip */}
      <div
        style={{
          ...card,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Dia do desafio</div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#f59e0b", fontVariantNumeric: "tabular-nums" }}>
            {diaAtual}<span style={{ fontSize: "1rem", color: "#71717a" }}>/30</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Streak</div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#22c55e", fontVariantNumeric: "tabular-nums" }}>
            {state.streak}<span style={{ fontSize: "1rem", color: "#71717a" }}>d</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>XP Rapha</div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#8b5cf6", fontVariantNumeric: "tabular-nums" }}>
            {state.raphaXP}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>XP {state.nomEla}</div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#f472b6", fontVariantNumeric: "tabular-nums" }}>
            {state.elaXP}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.78rem", color: "#71717a" }}>Conquistas</div>
          <div style={{ fontSize: "2rem", fontWeight: 600, color: "#fafafa", fontVariantNumeric: "tabular-nums" }}>
            {state.trophies.length}<span style={{ fontSize: "1rem", color: "#71717a" }}>/6</span>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <MetricCard
          label="Treinos Rapha (mês)"
          value={`${treinosMes}/12`}
          sub="objetivo: 12/mês"
          accent="#8b5cf6"
        />
        <MetricCard
          label={`Cardio ${state.nomEla} (mês)`}
          value={`${cardioMes}/12`}
          sub="objetivo: 12/mês"
          accent="#f472b6"
        />
        <MetricCard
          label="Dias sem fast food"
          value={`${diasSemFastFood}/30`}
          sub="meta: 30 dias"
          accent="#22c55e"
        />
        <MetricCard
          label="Água em dia"
          value={`${diasComAgua}`}
          sub="dias ambos 2L"
          accent="#38bdf8"
        />
      </div>

      {/* Gráfico semanal */}
      <div style={card}>
        <h2 style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#71717a", fontWeight: 400 }}>
          Progresso semanal
        </h2>
        <WeeklyProgress checkins={state.checkins} />
      </div>

      {/* Cards de perfil */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {/* Rapha */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(139,92,246,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#8b5cf6",
              }}
            >
              R
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Rapha</div>
              <div style={{ fontSize: "0.78rem", color: "#8b5cf6" }}>{raphaLevel.nome}</div>
            </div>
          </div>
          <ProgressBar value={treinosMes} max={12} color="#8b5cf6" label="Treinos no mês" />
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#71717a" }}>
            {state.raphaXP} XP acumulados
          </div>
        </div>

        {/* Ela */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(244,114,182,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#f472b6",
              }}
            >
              {state.nomEla[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{state.nomEla}</div>
              <div style={{ fontSize: "0.78rem", color: "#f472b6" }}>{elaLevel.nome}</div>
            </div>
          </div>
          <ProgressBar value={cardioMes} max={12} color="#f472b6" label="Cardios no mês" />
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#71717a" }}>
            {state.elaXP} XP acumulados
          </div>
        </div>
      </div>

      {/* Check-in de hoje */}
      {!checkinHoje && (
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
            <div style={{ fontWeight: 600 }}>Check-in de hoje</div>
            <div style={{ fontSize: "0.85rem", color: "#71717a", marginTop: "0.25rem" }}>
              Registre as atividades do dia para acumular XP.
            </div>
          </div>
          <Link
            href="/checkin"
            style={{
              backgroundColor: "#8b5cf6",
              color: "#fafafa",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            Fazer check-in
          </Link>
        </div>
      )}

      {/* Histórico */}
      {state.checkins.length > 0 && (
        <div style={card}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: "#71717a", fontWeight: 400 }}>
            Histórico de check-ins
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr>
                  {["Data", "Rapha", state.nomEla, "Alimentação", "Água", "XP Rapha", "XP Ela"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.4rem 0.75rem",
                        color: "#71717a",
                        fontWeight: 400,
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.checkins.slice(0, 14).map((c) => (
                  <tr key={c.date}>
                    <td style={{ padding: "0.5rem 0.75rem", color: "#fafafa" }}>{c.date}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <span style={{ color: c.raphaTreinou === "sim" ? "#22c55e" : "#71717a" }}>
                        {c.raphaTreinou === "sim" ? "✓" : c.raphaTreinou === "pulei" ? "—" : "✗"}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <span style={{ color: c.elaCardio === "sim" ? "#22c55e" : "#71717a" }}>
                        {c.elaCardio === "sim" ? "✓" : c.elaCardio === "pulei" ? "—" : "✗"}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", color: c.alimentacao === "limpo" ? "#22c55e" : c.alimentacao === "escorregou" ? "#f472b6" : "#f59e0b" }}>
                      {c.alimentacao === "limpo" ? "Limpa" : c.alimentacao === "parcial" ? "Quase" : "Escorregou"}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "#71717a" }}>
                      {c.agua === "ambos" ? "Ambos" : c.agua === "um" ? "1 só" : "Nenhum"}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "#8b5cf6", fontVariantNumeric: "tabular-nums" }}>+{c.xpRapha}</td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "#f472b6", fontVariantNumeric: "tabular-nums" }}>+{c.xpEla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
