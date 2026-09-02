"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps refresh at the same scroll offset instead of jumping to the top
 * or (with native scrollRestoration) overshooting to the bottom.
 *
 * Native scrollRestoration is disabled in layout.tsx before hydration,
 * because it restores before the page has grown to its final height —
 * landing past the (still short) bottom. So we save/restore manually,
 * keyed by path, and poll until the document is tall enough to actually
 * hold the saved offset before scrolling to it.
 */
export default function ScrollPositionRestore() {
  const pathname = usePathname();

  useEffect(() => {
    const key = `scrollY:${pathname}`;
    const reveal = () => {
      document.documentElement.style.visibility = "";
    };

    const saved = sessionStorage.getItem(key);
    const target = saved ? parseInt(saved, 10) : 0;
    if (target > 0) {
      let attempts = 0;
      const tryRestore = () => {
        attempts += 1;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll >= target || attempts > 60) {
          window.scrollTo(0, target);
          reveal();
        } else {
          setTimeout(tryRestore, 16);
        }
      };
      tryRestore();
    } else {
      reveal();
    }

    const saveNow = () => sessionStorage.setItem(key, String(window.scrollY));

    let ticking = false;
    const save = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        saveNow();
        ticking = false;
      });
    };

    window.addEventListener("scroll", save, { passive: true });
    // Bypass the rAF throttle here: rAF can stall while the page is
    // unloading, and this is the save that matters most for a refresh.
    window.addEventListener("pagehide", saveNow);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", saveNow);
    };
  }, [pathname]);

  return null;
}
