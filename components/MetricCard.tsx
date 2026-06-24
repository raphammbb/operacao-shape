type Props = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
};

export default function MetricCard({ label, value, sub, accent = "#fafafa" }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#18181b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.75rem",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <span style={{ fontSize: "0.8rem", color: "#71717a", fontWeight: 400 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          color: accent,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
      {sub && (
        <span style={{ fontSize: "0.78rem", color: "#71717a" }}>{sub}</span>
      )}
    </div>
  );
}
