export type IThemeName = "light" | "dark";

export interface ITheme {
  theme: IThemeName;
}

export type ThemeChangeEvent = (theme: IThemeName) => void;
