"use client";

import Link from "next/link";
import { useAppState } from "@/hooks/useAppState";
import { NavBar } from "@/components/NavBar";

const COR_ELA = "#f472b6";
const COR_VERDE = "#22c55e";
const COR_CINZA = "#3f3f46";
const COR_LARANJA = "#f59e0b";

function diasDaSemana(): string[] {
  const hoje = new Date();
  const diaSemana = hoje.getDay();
  const seg = new Date(hoje);
  seg.setDate(hoje.getDate() - ((diaSemana + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(seg);
    d.setDate(seg.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

const DIAS_LABEL = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function isTarde(hora: string): boolean {
  const [h] = hora.split(":").map(Number);
  return h >= 1 && h < 12;
}

function Bolinha({ cor }: { cor: string | null }) {
  const bg = cor ?? "transparent";
  const border = cor ? "none" : "1px solid rgba(255,255,255,0.1)";
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: bg,
        border,
      }}
    />
  );
}

export default function ElaPage() {
  const { state, loaded, checkinHoje } = useAppState();

  const dias = diasDaSemana();

  if (!loaded) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#52525b",
        }}
      >
        carregando…
      </div>
    );
  }

  const nomEla = state.nomEla || "Ela";
  const checkinPorData = Object.fromEntries(
    state.checkins.map((c) => [c.date, c])
  );

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 1.25rem 6rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 520 }}>
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-block",
                width: 6,
                height: 28,
                background: COR_ELA,
                borderRadius: 3,
                marginBottom: "0.5rem",
                verticalAlign: "middle",
                marginRight: "0.75rem",
              }}
            />
            <h1
              style={{
                display: "inline",
                fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#fafafa",
              }}
            >
              {nomEla}
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "#52525b",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              semana atual
            </p>
          </div>

          {/* Hábitos da semana */}
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
                    color: dias[i] === hoje ? COR_ELA : "#3f3f46",
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
              <span style={{ fontSize: "0.75rem", color: "#71717a" }}>
                💧 Água
              </span>
              {dias.map((dia) => {
                const c = checkinPorData[dia];
                const cor =
                  c == null
                    ? null
                    : c.elaAgua === true
                    ? COR_VERDE
                    : c.elaAgua === false
                    ? COR_CINZA
                    : null;
                return (
                  <div key={dia} style={{ display: "flex", justifyContent: "center" }}>
                    <Bolinha cor={cor} />
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
              <span style={{ fontSize: "0.75rem", color: "#71717a" }}>
                🍬 Doce
              </span>
              {dias.map((dia) => {
                const c = checkinPorData[dia];
                const cor =
                  c == null
                    ? null
                    : c.elaComeuDoce === false
                    ? COR_VERDE
                    : c.elaComeuDoce === true
                    ? COR_LARANJA
                    : null;
                return (
                  <div key={dia} style={{ display: "flex", justifyContent: "center" }}>
                    <Bolinha cor={cor} />
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
              <span style={{ fontSize: "0.75rem", color: "#71717a" }}>
                🌙 Dormir
              </span>
              {dias.map((dia) => {
                const c = checkinPorData[dia];
                const hora = c?.elaHorarioDormir ?? null;
                return (
                  <div
                    key={dia}
                    style={{
                      textAlign: "center",
                      fontSize: "0.62rem",
                      fontWeight: 500,
                      color:
                        hora == null
                          ? "#27272a"
                          : isTarde(hora)
                          ? COR_LARANJA
                          : "#a1a1aa",
                    }}
                  >
                    {hora ?? "—"}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA check-in */}
          {!checkinHoje && (
            <Link
              href="/checkin"
              style={{
                display: "block",
                width: "100%",
                padding: "0.9rem",
                borderRadius: "0.875rem",
                border: `1px solid ${COR_ELA}`,
                background: "transparent",
                color: COR_ELA,
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "center",
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              Fazer check-in de hoje →
            </Link>
          )}
        </div>
      </div>

      <NavBar />
    </>
  );
}
