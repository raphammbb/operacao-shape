"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "🏠", key: "home" },
  { href: "/checkin", label: "Check-in", icon: "✅", key: "checkin" },
  { href: "/rapha", label: "Rapha", icon: "💜", key: "rapha" },
  { href: "/soso", label: "Soso", icon: "💗", key: "soso" },
];

export function NavBar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  }

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        padding: "0.75rem 0 calc(0.75rem + env(safe-area-inset-bottom))",
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        zIndex: 100,
      }}
    >
      {links.map((l) => (
        <Link
          key={l.key}
          href={l.href}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            textDecoration: "none",
            color: isActive(l.href) ? "#fafafa" : "#3f3f46",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>{l.icon}</span>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
