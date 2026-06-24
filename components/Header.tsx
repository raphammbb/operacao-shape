"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/hooks/useAppState";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/rapha", label: "Rapha" },
  { href: "/ela", label: "Ela" },
  { href: "/treinos", label: "Treinos" },
  { href: "/habitos", label: "Hábitos" },
  { href: "/checkin", label: "Check-in" },
];

export default function Header() {
  const pathname = usePathname();
  const { state } = useAppState();
  const totalXP = state.raphaXP + state.elaXP;

  return (
    <header
      style={{
        backgroundColor: "#18181b",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#8b5cf6",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          ⚡ Operação Shape
        </span>

        <nav
          style={{
            display: "flex",
            gap: "0.25rem",
            flex: 1,
            overflowX: "auto",
          }}
        >
          {NAV.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#fafafa" : "#71717a",
                  backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span
            style={{
              padding: "0.25rem 0.6rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "rgba(139,92,246,0.15)",
              color: "#8b5cf6",
              whiteSpace: "nowrap",
            }}
          >
            🔥 {state.streak}d
          </span>
          <span
            style={{
              padding: "0.25rem 0.6rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#22c55e",
              whiteSpace: "nowrap",
            }}
          >
            ⚡ {totalXP} XP
          </span>
        </div>
      </div>
    </header>
  );
}
