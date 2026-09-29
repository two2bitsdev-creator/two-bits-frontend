import { useCallback, useEffect, useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#&@$?/\\<>{}[]";

function pick() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export function useEncodedHover(text) {
  const [display, setDisplay] = useState(text);
  const textRef = useRef(text);
  const timerRef = useRef(0);
  const genRef = useRef(0);

  useEffect(() => {
    textRef.current = text;
    setDisplay(text);
  }, [text]);

  const cancel = useCallback(() => {
    genRef.current += 1;
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
    setDisplay(textRef.current);
  }, []);

  const play = useCallback(() => {
    const original = textRef.current;
    if (!original) return;

    genRef.current += 1;
    const gen = genRef.current;
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;

    let frame = 0;
    const n = original.length;
    const tail = 8;
    const maxFrame = n + tail;
    const tickMs = 42;

    const step = () => {
      if (gen !== genRef.current) return;

      frame += 1;
      const t = frame * 0.55;
      let out = "";
      for (let i = 0; i < n; i++) {
        const ch = original[i];
        if (ch === " ") {
          out += " ";
          continue;
        }
        if (t > i + 2) {
          out += ch;
        } else {
          out += pick();
        }
      }
      setDisplay(out);

      if (frame < maxFrame) {
        timerRef.current = window.setTimeout(step, tickMs);
      } else {
        setDisplay(original);
      }
    };

    timerRef.current = window.setTimeout(step, 0);
  }, []);

  const bind = {
    onMouseEnter: play,
    onMouseLeave: cancel,
  };

  return { display, bind, play, cancel };
}
