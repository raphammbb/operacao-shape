type Props = {
  value: number;
  max: number;
  color?: string;
  label?: string;
};

export default function ProgressBar({ value, max, color = "#8b5cf6", label }: Props) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.4rem",
            fontSize: "0.8rem",
            color: "#71717a",
          }}
        >
          <span>{label}</span>
          <span style={{ color: "#fafafa", fontVariantNumeric: "tabular-nums" }}>
            {value}/{max}
          </span>
        </div>
      )}
      <div
        style={{
          height: 6,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: color,
            borderRadius: 9999,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}
