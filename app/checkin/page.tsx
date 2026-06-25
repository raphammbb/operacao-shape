"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState, type Checkin } from "@/hooks/useAppState";
import { NavBar } from "@/components/NavBar";

type Form = Omit<Checkin, "date">;

const EMPTY: Form = {
  raphaTreinou: null,
  elaFezCardio: null,
  fastFood: null,
  raphaAgua: null,
  elaAgua: null,
  raphaComeuDoce: null,
  elaComeuDoce: null,
  raphaHorarioDormir: null,
  elaHorarioDormir: null,
};

const cardStyle: React.CSSProperties = {
  borderRadius: "0.875rem",
  border: "1px solid rgba(255,255,255,0.07)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  backgroundColor: "rgba(15,15,18,0.65)",
  padding: "1.25rem",
  marginBottom: "0.6rem",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#52525b",
  marginBottom: "0.75rem",
  display: "block",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.5rem",
  marginBottom: "1rem",
};

function Toggle3<T extends string>({
  value,
  options,
  color,
  onChange,
}: {
  value: T | null;
  options: { label: string; value: T }[];
  color?: string;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "0.4rem" }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: "0.55rem 0.5rem",
              borderRadius: "0.5rem",
              border: `1px solid ${active ? (color || "#fafafa") : "rgba(255,255,255,0.08)"}`,
              background: active ? (color || "#fafafa") : "transparent",
              color: active ? "#09090b" : "#71717a",
              fontSize: "0.82rem",
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "inherit",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle2({
  value,
  color,
  onChange,
}: {
  value: boolean | null;
  color?: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <Toggle3<"sim" | "nao">
      value={value === null ? null : value ? "sim" : "nao"}
      options={[
        { label: "Sim", value: "sim" },
        { label: "Não", value: "nao" },
      ]}
      color={color}
      onChange={(v) => onChange(v === "sim")}
    />
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={rowStyle}>
      <span style={{ fontSize: "0.88rem", color: "#d4d4d8", fontWeight: 500 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function SectionCard({
  emoji,
  titulo,
  cor,
  children,
}: {
  emoji: string;
  titulo: string;
  cor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        ...cardStyle,
        display: "flex",
        alignItems: "stretch",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ width: 3, flexShrink: 0, backgroundColor: cor, opacity: 0.8 }} />
      <div style={{ flex: 1, padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>{emoji}</span>
          <span style={labelStyle as React.CSSProperties}>{titulo}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function CheckinPage() {
  const { loaded, checkinHoje, salvarCheckin, state } = useAppState();
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [salvou, setSalvou] = useState(false);

  useEffect(() => {
    if (loaded && checkinHoje) {
      const { date: _d, ...campos } = checkinHoje;
      setForm(campos);
    }
  }, [loaded, checkinHoje]);

  function set<K extends keyof Form>(key: K, val: Form[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function handleSalvar() {
    salvarCheckin(form);
    setSalvou(true);
    setTimeout(() => router.push("/"), 1200);
  }

  const nomEla = state.nomEla || "Soso";

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
            <h1
              style={{
                fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: 0,
                color: "#fafafa",
              }}
            >
              Check-in
            </h1>
            <p
              style={{
                marginTop: "0.4rem",
                fontSize: "0.75rem",
                color: "#52525b",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {salvou && (
            <div
              style={{
                ...cardStyle,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
                textAlign: "center",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✓ Salvo! Redirecionando…
            </div>
          )}

          {/* Treino */}
          <SectionCard emoji="🏋️" titulo="Treino" cor="#8b5cf6">
            <FieldRow label={`Rapha treinou?`}>
              <Toggle3
                value={form.raphaTreinou}
                options={[
                  { label: "Sim", value: "sim" },
                  { label: "Não", value: "nao" },
                  { label: "Pulei", value: "pulei" },
                ]}
                color="#8b5cf6"
                onChange={(v) => set("raphaTreinou", v)}
              />
            </FieldRow>
            <FieldRow label={`${nomEla} fez cardio?`}>
              <Toggle3
                value={form.elaFezCardio}
                options={[
                  { label: "Sim", value: "sim" },
                  { label: "Não", value: "nao" },
                  { label: "Pulei", value: "pulei" },
                ]}
                color="#f472b6"
                onChange={(v) => set("elaFezCardio", v)}
              />
            </FieldRow>
          </SectionCard>

          {/* Alimentação */}
          <SectionCard emoji="🍔" titulo="Fast Food" cor="#22c55e">
            <FieldRow label="Fast food hoje?">
              <Toggle3
                value={form.fastFood}
                options={[
                  { label: "Nenhum", value: "nenhum" },
                  { label: "Um", value: "um" },
                  { label: "Mais", value: "mais" },
                ]}
                color="#22c55e"
                onChange={(v) => set("fastFood", v)}
              />
            </FieldRow>
          </SectionCard>

          {/* Água */}
          <SectionCard emoji="💧" titulo="Água" cor="#38bdf8">
            <FieldRow label="Rapha tomou 2L?">
              <Toggle2
                value={form.raphaAgua}
                color="#38bdf8"
                onChange={(v) => set("raphaAgua", v)}
              />
            </FieldRow>
            <FieldRow label={`${nomEla} tomou 2L?`}>
              <Toggle2
                value={form.elaAgua}
                color="#38bdf8"
                onChange={(v) => set("elaAgua", v)}
              />
            </FieldRow>
          </SectionCard>

          {/* Doce */}
          <SectionCard emoji="🍬" titulo="Doce" cor="#f59e0b">
            <FieldRow label="Rapha comeu doce?">
              <Toggle2
                value={form.raphaComeuDoce}
                color="#f59e0b"
                onChange={(v) => set("raphaComeuDoce", v)}
              />
            </FieldRow>
            <FieldRow label={`${nomEla} comeu doce?`}>
              <Toggle2
                value={form.elaComeuDoce}
                color="#f59e0b"
                onChange={(v) => set("elaComeuDoce", v)}
              />
            </FieldRow>
          </SectionCard>

          {/* Dormir */}
          <SectionCard emoji="🌙" titulo="Dormir" cor="#8b5cf6">
            <FieldRow label="Rapha — que horas dormiu ontem à noite?">
              <input
                type="time"
                value={form.raphaHorarioDormir ?? ""}
                onChange={(e) =>
                  set("raphaHorarioDormir", e.target.value || null)
                }
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "0.5rem",
                  color: "#fafafa",
                  padding: "0.55rem 0.75rem",
                  fontSize: "0.88rem",
                  fontFamily: "inherit",
                  width: "100%",
                  colorScheme: "dark",
                }}
              />
            </FieldRow>
            <FieldRow label={`${nomEla} — que horas dormiu ontem à noite?`}>
              <input
                type="time"
                value={form.elaHorarioDormir ?? ""}
                onChange={(e) =>
                  set("elaHorarioDormir", e.target.value || null)
                }
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "0.5rem",
                  color: "#fafafa",
                  padding: "0.55rem 0.75rem",
                  fontSize: "0.88rem",
                  fontFamily: "inherit",
                  width: "100%",
                  colorScheme: "dark",
                }}
              />
            </FieldRow>
          </SectionCard>

          {/* Botão salvar */}
          <button
            onClick={handleSalvar}
            disabled={salvou}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "0.875rem",
              border: "none",
              background: salvou ? "rgba(34,197,94,0.2)" : "#fafafa",
              color: salvou ? "#22c55e" : "#09090b",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: salvou ? "default" : "pointer",
              fontFamily: "inherit",
              letterSpacing: "-0.01em",
              marginTop: "0.5rem",
            }}
          >
            {checkinHoje ? "Atualizar check-in" : "Salvar check-in"}
          </button>
        </div>
      </div>

      <NavBar />
    </>
  );
}
