import { TROPHIES } from "@/lib/trophies";

type Props = {
  unlocked: string[];
};

export default function TrophyGrid({ unlocked }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "0.75rem",
      }}
    >
      {TROPHIES.map((t) => {
        const ok = unlocked.includes(t.id);
        return (
          <div
            key={t.id}
            style={{
              backgroundColor: ok ? "rgba(139,92,246,0.1)" : "#18181b",
              border: `1px solid ${ok ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "0.75rem",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              opacity: ok ? 1 : 0.4,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{t.emoji}</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: ok ? "#fafafa" : "#71717a" }}>
              {t.nome}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#71717a", textAlign: "center" }}>
              {t.descricao}
            </span>
          </div>
        );
      })}
    </div>
  );
}
