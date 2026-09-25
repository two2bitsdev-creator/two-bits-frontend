"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const RAIN_DENSITY_MIN = 0;
const RAIN_DENSITY_MAX = 24;
const RAIN_DENSITY_STEP = 2;

interface RainDensityContextValue {
  density: number;
  min: number;
  max: number;
  step: number;
  increment: () => void;
  decrement: () => void;
}

const RainDensityContext = createContext<RainDensityContextValue | null>(
  null,
);

/**
 * Client-side override for the hero's matrix-rain column count. Seeds from
 * the env-driven default (`siteConfig.rainDensity`) but lets visitors tune
 * it live via the stepper in the hero, without touching the server value.
 */
function RainDensityProvider({
  defaultDensity,
  children,
}: {
  defaultDensity: number;
  children: ReactNode;
}) {
  const [density, setDensity] = useState(defaultDensity);

  const increment = useCallback(() => {
    setDensity((current) =>
      Math.min(RAIN_DENSITY_MAX, current + RAIN_DENSITY_STEP),
    );
  }, []);

  const decrement = useCallback(() => {
    setDensity((current) =>
      Math.max(RAIN_DENSITY_MIN, current - RAIN_DENSITY_STEP),
    );
  }, []);

  const value = useMemo<RainDensityContextValue>(
    () => ({
      density,
      min: RAIN_DENSITY_MIN,
      max: RAIN_DENSITY_MAX,
      step: RAIN_DENSITY_STEP,
      increment,
      decrement,
    }),
    [density, increment, decrement],
  );

  return (
    <RainDensityContext.Provider value={value}>
      {children}
    </RainDensityContext.Provider>
  );
}

function useRainDensity() {
  const ctx = useContext(RainDensityContext);
  if (!ctx) {
    throw new Error("useRainDensity must be used within a RainDensityProvider");
  }
  return ctx;
}

export { RainDensityProvider, useRainDensity };
