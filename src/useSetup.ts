import { useLayoutEffect } from "react";
import type { DarkModeManager } from "./DarkModeManager";

export const useSetup = (Theme: DarkModeManager) => {
  useLayoutEffect(() => {
    Theme.initialize();
    return () => {
      Theme.destroy();
    };
  }, [Theme]);
};
