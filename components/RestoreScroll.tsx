"use client";

import { useEffect } from "react";

export default function RestoreScroll() {
  useEffect(() => {
    const saved = sessionStorage.getItem("blogsScrollY");
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem("blogsScrollY");
    }

    const save = () => {
      sessionStorage.setItem("blogsScrollY", String(window.scrollY));
    };

    const links = document.querySelectorAll('a[href^="/blogs/"]');
    links.forEach((l) => l.addEventListener("click", save));
    return () => links.forEach((l) => l.removeEventListener("click", save));
  }, []);

  return null;
}
