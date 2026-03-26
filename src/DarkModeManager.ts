import { State } from "@figliolia/galena";
import type { ITheme, ThemeChangeCallback } from "./types";

export class DarkModeManager extends State<ITheme> {
  private listener?: () => void;
  private matcher?: MediaQueryList;
  constructor(
    theme: ITheme = "light",
    public readonly onThemeChange?: ThemeChangeCallback,
  ) {
    super(theme);
    this.updateDocument(theme);
    this.subscribeInternal();
  }

  public initialize() {
    this.subscribeInternal();
    this.subscribeOS();
  }

  public destroy() {
    this.matcher?.removeEventListener?.("change", this.onOSSettingsChange);
    this.listener?.();
    this.listener = undefined;
  }

  public toggle = () => {
    this.update(theme => (theme === "dark" ? "light" : "dark"));
  };

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

  private onChangeInternal = (theme: ITheme) => {
    this.updateDocument(theme);
    this.onThemeChange?.(theme);
  };

  private updateDocument(theme: ITheme) {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }
}
