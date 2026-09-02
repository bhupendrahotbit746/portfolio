"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_SPEED_MS = 22;
const HOLD_MS = 1800;

export function useTypewriter(text: string, onDone?: () => void) {
  const [state, setState] = useState({ text, output: "", done: text.length === 0 });
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  if (state.text !== text) {
    setState({ text, output: "", done: text.length === 0 });
  }

  useEffect(() => {
    if (text.length === 0) return;

    let i = 0;
    let holdTimer: ReturnType<typeof setTimeout>;
    const typeTimer = setInterval(() => {
      i += 1;
      setState((prev) => ({ ...prev, output: text.slice(0, i) }));
      if (i >= text.length) {
        clearInterval(typeTimer);
        setState((prev) => ({ ...prev, done: true }));
        holdTimer = setTimeout(() => {
          onDoneRef.current?.();
        }, HOLD_MS);
      }
    }, TYPE_SPEED_MS);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(holdTimer);
    };
  }, [text]);

  return { output: state.output, done: state.done };
}
