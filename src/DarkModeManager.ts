import { State } from "@figliolia/galena";
import type { ITheme, IThemeName, ThemeChangeEvent } from "./types";

export class DarkModeManager extends State<ITheme> {
  private listener?: string;
  private matcher?: MediaQueryList;
  private onThemeChange?: ThemeChangeEvent;
  constructor(onThemeChange?: ThemeChangeEvent) {
    super("Theme", { theme: "light" });
    this.updateDocument("light");
    this.onThemeChange = onThemeChange;
    this.subscribeInternal();
  }

  public initialize() {
    this.subscribeInternal();
    this.subscribeOS();
  }

  public destroy() {
    this.matcher?.removeEventListener?.("change", this.onOSSettingsChange);
    if (this.listener) {
      this.unsubscribe(this.listener);
      this.listener = undefined;
    }
  }

  public toggle = () => {
    this.set(this.getState().theme === "dark" ? "light" : "dark");
  };

  public set(theme: IThemeName) {
    this.priorityUpdate(state => {
      state.theme = theme;
    });
  }

  private subscribeInternal() {
    if (!this.listener) {
      this.listener = this.subscribe(this.onChangeInternal);
    }
  }

  private subscribeOS() {
    this.matcher = window?.matchMedia?.("(prefers-color-scheme: dark)");
    if (!this.matcher) {
      return;
    }
    if (this.matcher.matches) {
      this.set("dark");
    }
    this.matcher.addEventListener("change", this.onOSSettingsChange);
  }

  private onOSSettingsChange = (e: MediaQueryListEvent) => {
    this.set(e.matches ? "dark" : "light");
  };

  private onChangeInternal = ({ theme }: ITheme) => {
    this.updateDocument(theme);
    this.onThemeChange?.(theme);
  };

  private updateDocument(theme: IThemeName) {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }
}
