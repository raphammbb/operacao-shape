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

      {/* Imagem de fundo pulsando */}
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

      {/* Overlay gradiente */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.78) 0%, rgba(9,9,11,0.62) 40%, rgba(9,9,11,0.88) 100%)",
          zIndex: 1,
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.25rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 580 }}>
          {/* Título */}
          <div style={{ marginBottom: "2.5rem" }}>
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

          {/* Cards */}
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
                {/* Pílula colorida lateral */}
                <div
                  style={{
                    width: 3,
                    flexShrink: 0,
                    backgroundColor: c.cor,
                    opacity: 0.8,
                  }}
                />

                {/* Conteúdo do card */}
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

          {/* Footer */}
          <p
            style={{
              marginTop: "2.5rem",
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
    </>
  );
}
