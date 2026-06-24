"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";
import { XP_VALUES } from "@/lib/xp";

type Option = { value: string; label: string };

function OptionGroup({
  title,
  options,
  selected,
  onSelect,
  color = "#8b5cf6",
}: {
  title: string;
  options: Option[];
  selected: string;
  onSelect: (v: string) => void;
  color?: string;
}) {
  return (
    <div>
      <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: "0.6rem" }}>{title}</div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: `1px solid ${selected === opt.value ? color : "rgba(255,255,255,0.08)"}`,
              backgroundColor: selected === opt.value ? `${color}20` : "#18181b",
              color: selected === opt.value ? color : "#71717a",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: selected === opt.value ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CheckinPage() {
  const router = useRouter();
  const { state, salvarCheckin, checkinHoje, loaded } = useAppState();

  const [raphaTreinou, setRaphaTreinou] = useState<"sim" | "nao" | "pulei">("nao");
  const [elaCardio, setElaCardio] = useState<"sim" | "nao" | "pulei">("nao");
  const [alimentacao, setAlimentacao] = useState<"limpo" | "parcial" | "escorregou">("limpo");
  const [agua, setAgua] = useState<"ambos" | "um" | "nenhum">("ambos");
  const [dormiu, setDormiu] = useState<"sim" | "nao">("sim");
  const [saved, setSaved] = useState(false);
  const [xpGanho, setXpGanho] = useState({ rapha: 0, ela: 0 });

  if (!loaded) return null;

  if (checkinHoje || saved) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          gap: "1rem",
          textAlign: "center",
        }}
      >
        {saved ? (
          <>
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h2 style={{ fontWeight: 600, margin: 0 }}>Check-in salvo!</h2>
            <div style={{ color: "#71717a" }}>
              <span style={{ color: "#8b5cf6" }}>+{xpGanho.rapha} XP</span> para Rapha ·{" "}
              <span style={{ color: "#f472b6" }}>+{xpGanho.ela} XP</span> para {state.nomEla}
            </div>
            <button
              onClick={() => router.push("/")}
              style={{
                marginTop: "1rem",
                backgroundColor: "#8b5cf6",
                color: "#fafafa",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.65rem 1.5rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Ver dashboard
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: "3rem" }}>🎯</div>
            <h2 style={{ fontWeight: 600, margin: 0 }}>Check-in já feito hoje</h2>
            <div style={{ color: "#71717a", fontSize: "0.9rem" }}>
              Volte amanhã para registrar o próximo dia.
            </div>
            <button
              onClick={() => router.push("/")}
              style={{
                marginTop: "1rem",
                backgroundColor: "#18181b",
                color: "#fafafa",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0.5rem",
                padding: "0.65rem 1.5rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Voltar ao dashboard
            </button>
          </>
        )}
      </div>
    );
  }

  function calcularXP() {
    let rXP = 0;
    let eXP = 0;
    if (raphaTreinou === "sim") rXP += XP_VALUES.treinoRapha;
    if (elaCardio === "sim") eXP += XP_VALUES.cardioEla;
    if (agua === "ambos") { rXP += XP_VALUES.agua; eXP += XP_VALUES.agua; }
    else if (agua === "um") rXP += XP_VALUES.agua;
    if (dormiu === "sim") { rXP += 5; eXP += 5; }
    if (alimentacao === "limpo") { rXP += XP_VALUES.semFastFood / 2 + XP_VALUES.semDoce / 2; eXP += XP_VALUES.semFastFood / 2 + XP_VALUES.semDoce / 2; }
    else if (alimentacao === "parcial") { rXP += XP_VALUES.semFastFood / 2; eXP += XP_VALUES.semFastFood / 2; }
    return { rXP: Math.round(rXP), eXP: Math.round(eXP) };
  }

  const { rXP, eXP } = calcularXP();

  function handleConfirmar() {
    salvarCheckin({
      raphaTreinou,
      elaCardio,
      alimentacao,
      agua,
      dormiu,
      xpRapha: rXP,
      xpEla: eXP,
    });
    setXpGanho({ rapha: rXP, ela: eXP });
    setSaved(true);
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#18181b",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <h1 style={{ fontWeight: 600, fontSize: "1.4rem", margin: 0 }}>Check-in diário</h1>
        <p style={{ color: "#71717a", marginTop: "0.4rem", fontSize: "0.9rem" }}>
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </div>

      <div style={cardStyle}>
        <OptionGroup
          title="Rapha treinou hoje?"
          options={[
            { value: "sim", label: "✓ Sim" },
            { value: "nao", label: "✗ Não era dia" },
            { value: "pulei", label: "— Pulei" },
          ]}
          selected={raphaTreinou}
          onSelect={(v) => setRaphaTreinou(v as typeof raphaTreinou)}
          color="#8b5cf6"
        />
        <OptionGroup
          title={`${state.nomEla} fez cardio hoje?`}
          options={[
            { value: "sim", label: "✓ Sim" },
            { value: "nao", label: "✗ Não era dia" },
            { value: "pulei", label: "— Pulou" },
          ]}
          selected={elaCardio}
          onSelect={(v) => setElaCardio(v as typeof elaCardio)}
          color="#f472b6"
        />
      </div>

      <div style={cardStyle}>
        <OptionGroup
          title="Alimentação"
          options={[
            { value: "limpo", label: "🥗 Limpa" },
            { value: "parcial", label: "😐 Quase" },
            { value: "escorregou", label: "🍔 Escorregou" },
          ]}
          selected={alimentacao}
          onSelect={(v) => setAlimentacao(v as typeof alimentacao)}
          color="#22c55e"
        />
        <OptionGroup
          title="Água (2L cada)"
          options={[
            { value: "ambos", label: "💧 Os dois" },
            { value: "um", label: "🙂 Só um" },
            { value: "nenhum", label: "😅 Nenhum" },
          ]}
          selected={agua}
          onSelect={(v) => setAgua(v as typeof agua)}
          color="#38bdf8"
        />
        <OptionGroup
          title="Dormiram antes da 1h?"
          options={[
            { value: "sim", label: "✓ Sim" },
            { value: "nao", label: "✗ Não" },
          ]}
          selected={dormiu}
          onSelect={(v) => setDormiu(v as typeof dormiu)}
          color="#f59e0b"
        />
      </div>

      {/* Preview de XP */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          backgroundColor: "rgba(139,92,246,0.05)",
          borderRadius: "0.75rem",
          border: "1px solid rgba(139,92,246,0.15)",
          fontSize: "0.9rem",
        }}
      >
        <span style={{ color: "#71717a" }}>XP hoje:</span>
        <span style={{ color: "#8b5cf6", fontWeight: 600 }}>Rapha +{rXP}</span>
        <span style={{ color: "#71717a" }}>·</span>
        <span style={{ color: "#f472b6", fontWeight: 600 }}>{state.nomEla} +{eXP}</span>
      </div>

      <button
        onClick={handleConfirmar}
        style={{
          backgroundColor: "#8b5cf6",
          color: "#fafafa",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.85rem",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Confirmar check-in
      </button>
    </div>
  );
}
