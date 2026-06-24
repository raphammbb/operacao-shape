"use client";

import { useState } from "react";

type Props = {
  onConcluir: (nomEla: string, startDate: string) => void;
};

export default function Onboarding({ onConcluir }: Props) {
  const [nomEla, setNomEla] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#18181b",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: 440,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fafafa", margin: 0 }}>
            ⚡ Operação Shape
          </h1>
          <p style={{ color: "#71717a", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Bora configurar o desafio do casal.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", color: "#71717a" }}>
            Nome dela (para personalizar o app)
          </label>
          <input
            type="text"
            value={nomEla}
            onChange={(e) => setNomEla(e.target.value)}
            placeholder="Ex: Ana, Gi, Bê..."
            style={{
              backgroundColor: "#09090b",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.5rem",
              padding: "0.6rem 0.75rem",
              color: "#fafafa",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", color: "#71717a" }}>
            Data de início do desafio
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              backgroundColor: "#09090b",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.5rem",
              padding: "0.6rem 0.75rem",
              color: "#fafafa",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <button
          onClick={() => onConcluir(nomEla || "Ela", startDate)}
          style={{
            backgroundColor: "#8b5cf6",
            color: "#fafafa",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Começar agora
        </button>
      </div>
    </div>
  );
}
