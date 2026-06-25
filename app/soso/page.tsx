"use client";

import Link from "next/link";
import { useAppState, hojeLocal } from "@/hooks/useAppState";
import { NavBar } from "@/components/NavBar";
import { HabitsWeekGrid } from "@/components/HabitsWeekGrid";

const COR_SOSO = "#f472b6";

export default function SosoPage() {
  const { state, loaded, checkinHoje } = useAppState();

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

  const nomSoso = state.nomEla || "Soso";
  const hoje = hojeLocal();

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
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
              <div
                style={{
                  width: 6,
                  height: 32,
                  background: COR_SOSO,
                  borderRadius: 3,
                  flexShrink: 0,
                }}
              />
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#fafafa",
                  margin: 0,
                }}
              >
                {nomSoso}
              </h1>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#52525b",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              semana atual
            </p>
          </div>

          <HabitsWeekGrid checkins={state.checkins} pessoa="soso" cor={COR_SOSO} />

          {!checkinHoje && (
            <Link
              href="/checkin"
              style={{
                display: "block",
                width: "100%",
                padding: "0.9rem",
                borderRadius: "0.875rem",
                border: `1px solid ${COR_SOSO}`,
                background: "transparent",
                color: COR_SOSO,
                fontSize: "0.88rem",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              Fazer check-in de hoje →
            </Link>
          )}

          {checkinHoje && (
            <Link
              href="/checkin"
              style={{
                display: "block",
                width: "100%",
                padding: "0.9rem",
                borderRadius: "0.875rem",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "transparent",
                color: "#52525b",
                fontSize: "0.82rem",
                fontWeight: 500,
                textAlign: "center",
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              ✓ Check-in de {hoje} feito · Editar
            </Link>
          )}
        </div>
      </div>

      <NavBar />
    </>
  );
}
