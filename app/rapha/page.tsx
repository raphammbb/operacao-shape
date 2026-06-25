"use client";

import Link from "next/link";
import { useAppState } from "@/hooks/useAppState";

const COR_RAPHA = "#8b5cf6";
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

export default function RaphaPage() {
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
                background: COR_RAPHA,
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
              Rapha
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
                marginBottom: "1.25rem",
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
                    color: dias[i] === hoje ? COR_RAPHA : "#3f3f46",
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
                    : c.raphaAgua === true
                    ? COR_VERDE
                    : c.raphaAgua === false
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
                    : c.raphaComeuDoce === false
                    ? COR_VERDE
                    : c.raphaComeuDoce === true
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
                const hora = c?.raphaHorarioDormir ?? null;
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
                border: `1px solid ${COR_RAPHA}`,
                background: "transparent",
                color: COR_RAPHA,
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

      <NavBar active="rapha" />
    </>
  );
}

function NavBar({ active }: { active: string }) {
  const links = [
    { href: "/", label: "Home", icon: "🏠", key: "home" },
    { href: "/checkin", label: "Check-in", icon: "✅", key: "checkin" },
    { href: "/rapha", label: "Rapha", icon: "💜", key: "rapha" },
    { href: "/ela", label: "Ela", icon: "💗", key: "ela" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "0.75rem 0 calc(0.75rem + env(safe-area-inset-bottom))",
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        zIndex: 100,
      }}
    >
      {links.map((l) => (
        <Link
          key={l.key}
          href={l.href}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            textDecoration: "none",
            color: active === l.key ? "#fafafa" : "#3f3f46",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>{l.icon}</span>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
