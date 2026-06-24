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
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.25rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: 0,
              lineHeight: 1.1,
              color: "#fafafa",
            }}
          >
            Barriguinha?
          </h1>
          <p
            style={{
              marginTop: "0.6rem",
              fontSize: "1rem",
              color: "#52525b",
              fontWeight: 500,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            desafio do casal · 30 dias
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {combinados.map((c) => (
            <div
              key={c.titulo}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#111113",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: "0.1rem",
                }}
              >
                {c.emoji}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "#fafafa",
                    marginBottom: "0.3rem",
                  }}
                >
                  {c.titulo}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#52525b",
                    lineHeight: 1.55,
                  }}
                >
                  {c.descricao}
                </div>
              </div>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: c.cor,
                  flexShrink: 0,
                  marginTop: "0.55rem",
                  marginLeft: "auto",
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
            fontSize: "0.78rem",
            color: "#3f3f46",
          }}
        >
          combinados são combinados
        </p>
      </div>
    </div>
  );
}
