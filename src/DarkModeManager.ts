import { State } from "@figliolia/galena";
import type { ITheme, IThemeName, ThemeChangeEvent } from "./types";

export class DarkModeManager extends State<ITheme> {
  listener: string;
  browserSupport?: boolean;
  matcher?: MediaQueryList;
  private onThemeChange?: ThemeChangeEvent;
  constructor(onThemeChange?: ThemeChangeEvent) {
    super("Theme", { theme: "light" });
    this.onThemeChange = onThemeChange;
    this.updateDocument("light");
    this.listener = this.subscribe(this.internalUpdate);
  }

  public initialize() {
    this.browserSupport = !!window.matchMedia;
    this.matcher = window.matchMedia("(prefers-color-scheme: dark)");
    if (this.browserSupport && this.matcher.matches) {
      this.set("dark");
    }
    this.matcher.addEventListener("change", this.themeChange);
  }

  public destroy() {
    this.matcher?.removeEventListener?.("change", this.themeChange);
    this.unsubscribe(this.listener);
  }

  public toggle = () => {
    this.set(this.getState().theme === "dark" ? "light" : "dark");
  };

  public set(theme: IThemeName) {
    this.priorityUpdate(state => {
      state.theme = theme;
    });
  }

  private themeChange = (e: MediaQueryListEvent) => {
    this.set(e.matches ? "dark" : "light");
  };

  private internalUpdate = ({ theme }: ITheme) => {
    this.updateDocument(theme);
    this.onThemeChange?.(theme);
  };

  private updateDocument(theme: IThemeName) {
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }
}
