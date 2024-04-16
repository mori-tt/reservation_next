"use client";
import { useEffect, useState } from "react";

export function useHeaderFooter() {
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null);
  const [footerEl, setFooterEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setHeaderEl(document.getElementById("header"));
    setFooterEl(document.getElementById("footer"));
  }, []);
  return [headerEl, footerEl];
}
