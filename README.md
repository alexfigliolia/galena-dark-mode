# Galena Dark Mode
A Dark Mode manager for [Galena](https://www.npmjs.com/package/@figliolia/galena) Apps. Effortlessly manage dark/light mode themes!

## Installation
```
npm i @figliolia/galena @figliolia/galena-dark-mode
# or
yarn add @figliolia/galena @figliolia/galena-dark-mode
```

## Basic Usage
```typescript
// Theme.ts
import { DarkModeManager } from "@figliolia/galena-dark-mode";

export const Theme = new DarkModeManager(theme => {
  // Optional callback to execute when theme changes
});

// Begin listening for changes to user operating system preferences
Theme.initialize();

// Toggle between Dark and Light Theme
Theme.toggle();

// Set Dark or Light Mode
Theme.set("<dark | light>");

// Clean up and remove operating system listeners
Theme.destroy();
```

## Targetting Your Theme with CSS
By default, the `DarkModeManager` will add a `[data-theme]` attribute to the HTML document whenever the theme changes. The value associated with `[data-theme]` will be 'light' or 'dark'.

`[data-theme]` can be targetted in your CSS using:
```css
:root {
  --background: #fff;
  --text-color: #292929;
 /* ...and so on */
}

html[data-theme='dark'] {
  --background: #292929;
  --text-color: #fff;
  /* ...and so on */
}
```

## Integrating With React Apps
### Installation
```bash
npm i @figliolia/react-galena
# or
yarn add @figliolia/react-galena
```
### Basc Usage
The when calling `new DarkModeManager()`, a `State` instance is returned. You can generate `useState` and `useMutation` hooks using:

```typescript
// Theme.ts

import { DarkModeManager } from "@figlioliag/galena-dark-mode";
import { createUseState, createUseMutation } from "@figliolia/react-galena";

export const Theme = new DarkModeManager();
export const useTheme = createUseState(Theme);
export const useThemeMutation = createUseMutation(Theme);
```
You can also initialize and destroy your theme instance in your root component:

```tsx
// App.tsx

import { useLayoutEffect, memo, useCallback } from "react";
import { useSetup } from "@figliolia/galena-dark-mode";
import { Theme, useTheme } from "./Theme";

export const App = memo(function App() {
  // Initialize!
  useSetup(Theme);

  // Get the current theme
  const theme = useTheme(({ theme }) => theme);

  return (
    <>
      <p>The Current Theme: {theme}</p>
      <button onClick={Theme.toggle}>
        Go {theme === "dark" ? "Light" : "Dark"}
      </button>
    </>
  );
})
```
### Demo
The following demo uses CSS Custom properties for a smooth transition between themes. This feature is not available in all browsers, but [baseline support](https://caniuse.com/?search=css%20custom%20properties) is growing.

![Demo](media/demo.gif | height=300px)