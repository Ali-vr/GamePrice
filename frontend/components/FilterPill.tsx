import React from "react";

interface FilterPillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function FilterPill({
  children,
  active = false,
  onClick,
  className = "",
}: FilterPillProps) {
  const baseClass = `pill-filter ${active ? "active" : ""} ${className}`;

  return (
    <button type="button" className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
}
