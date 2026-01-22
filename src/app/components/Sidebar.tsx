'use client';

import React from "react";
import { Avatar } from "./Avatar";

interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  title?: string;
  items: SidebarItem[];
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title = "Dashboard",
  items,
  userName,
  userAvatar,
  onLogout,
}) => {
  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        backgroundColor: "#0f172a",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Usuario */}
      {userName && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <Avatar name={userName} imageUrl={userAvatar} size={48} />
          <div style={{ flex: 1, overflow: "hidden" }}>
            <p style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>
              {userName}
            </p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
              Usuario
            </p>
          </div>
        </div>
      )}

      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: item.active ? "#1e293b" : "transparent",
              color: item.active ? "#fff" : "#cbd5e1",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.2s ease",
              fontSize: "0.95rem",
              fontWeight: item.active ? 600 : 400,
            }}
            onMouseEnter={e => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "#1e293b";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={e => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#cbd5e1";
              }
            }}
          >
            {item.icon && <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            marginTop: "auto",
            padding: "12px",
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
        >
          🚪 Cerrar sesión
        </button>
      )}
    </aside>
  );
};
