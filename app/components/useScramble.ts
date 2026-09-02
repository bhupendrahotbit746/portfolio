"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

const FRAME_MS = 65;

export function useScramble(text: string, active: boolean, durationMs = 1800) {
  const [state, setState] = useState({ text, active, output: active ? "" : text });

  if (state.text !== text || state.active !== active) {
    setState({ text, active, output: active ? state.output : text });
  }

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const totalFrames = Math.round(durationMs / FRAME_MS);
    const revealAt = text.split("").map((_, i) =>
      Math.round((i / text.length) * totalFrames * 0.7)
    );

    const interval = setInterval(() => {
      frame += 1;
      setState((prev) => ({
        ...prev,
        output: text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame >= revealAt[i] + totalFrames * 0.3) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      }));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setState((prev) => ({ ...prev, output: text }));
      }
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [text, active, durationMs]);

  return state.output;
}
