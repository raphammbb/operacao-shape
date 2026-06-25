"use client";

import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { useAppState } from "@/hooks/useAppState";

const combinados = [
  {
    emoji: "🍔",
    titulo: "Zero fast food",
    descricao: "30 dias sem fast food. Exceção: 1 refeição livre na semana 4 se tudo estiver no verde.",
    cor: "#22c55e",
  },
  {
    emoji: "🍬",
    titulo: "Zero doce",
    descricao: "Semana 1 sem doce. Avaliação todo domingo — se tiver indo bem, estende.",
    cor: "#f59e0b",
  },
  {
    emoji: "💧",
    titulo: "2L de água por dia",
    descricao: "Cada um bebe pelo menos dois litros. Sem desculpa.",
    cor: "#38bdf8",
  },
  {
    emoji: "🌙",
    titulo: "Dormir antes da 1h",
    descricao: "Tela desligada e deitado antes da meia-noite e meia.",
    cor: "#8b5cf6",
  },
  {
    emoji: "📋",
    titulo: "Check-in todo domingo",
    descricao: "Sentar junto, ver como foi a semana e decidir o que muda pra próxima.",
    cor: "#f472b6",
  },
];

export default function Page() {
  const { checkinHoje, loaded } = useAppState();

  return (
    <>
      <style>{`
        @keyframes bgPulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.75; }
        }
        .bg-image {
          animation: bgPulse 6s ease-in-out infinite;
        }
      `}</style>

      <img
        src="/operacao-shape/bg.png"
        alt=""
        className="bg-image"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "blur(3px) saturate(0.75)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.78) 0%, rgba(9,9,11,0.62) 40%, rgba(9,9,11,0.88) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.25rem 6rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 580 }}>
          {/* Título */}
          <div style={{ marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "clamp(3rem, 10vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                margin: 0,
                lineHeight: 1,
                color: "#fafafa",
              }}
            >
              Barriguinha?
            </h1>
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.78rem",
                color: "#52525b",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              desafio do casal&nbsp;&nbsp;·&nbsp;&nbsp;30 dias
            </p>
          </div>

          {/* Status do check-in de hoje */}
          {loaded && (
            <Link
              href="/checkin"
              style={{ textDecoration: "none", display: "block", marginBottom: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.9rem 1.1rem",
                  borderRadius: "0.875rem",
                  border: checkinHoje
                    ? "1px solid rgba(34,197,94,0.25)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: checkinHoje
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>
                    {checkinHoje ? "✅" : "🔲"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: checkinHoje ? "#22c55e" : "#a1a1aa",
                    }}
                  >
                    {checkinHoje ? "Check-in de hoje feito" : "Fazer check-in de hoje"}
                  </span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "#3f3f46" }}>→</span>
              </div>
            </Link>
          )}

          {/* Atalhos Rapha / Ela */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <Link
              href="/rapha"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.7rem",
                borderRadius: "0.875rem",
                border: "1px solid rgba(139,92,246,0.3)",
                background: "rgba(139,92,246,0.07)",
                color: "#8b5cf6",
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              💜 Rapha
            </Link>
            <Link
              href="/ela"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.7rem",
                borderRadius: "0.875rem",
                border: "1px solid rgba(244,114,182,0.3)",
                background: "rgba(244,114,182,0.07)",
                color: "#f472b6",
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              💗 Ela
            </Link>
          </div>

          {/* Combinados */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {combinados.map((c) => (
              <div
                key={c.titulo}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  borderRadius: "0.875rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  backgroundColor: "rgba(15,15,18,0.65)",
                }}
              >
                <div
                  style={{
                    width: 3,
                    flexShrink: 0,
                    backgroundColor: c.cor,
                    opacity: 0.8,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.1rem 1.25rem",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  >
                    {c.emoji}
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#f4f4f5",
                        marginBottom: "0.25rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.titulo}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#52525b",
                        lineHeight: 1.6,
                      }}
                    >
                      {c.descricao}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "0.72rem",
              color: "#27272a",
              letterSpacing: "0.05em",
            }}
          >
            combinados são combinados
          </p>
        </div>
      </div>

      <NavBar />
    </>
  );
}
