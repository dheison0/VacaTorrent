import { Appearance } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const apiServerURL = "https://vacatorrent-api-dheisom.koyeb.app";
const darkThemeEnabled = Appearance.getColorScheme() === "dark";

const colors = {
  background: darkThemeEnabled ? "#282a36" : "#ffffff",
  container: darkThemeEnabled ? "#44475a" : "#ddeee7",
  inputBorder: darkThemeEnabled ? "#745D75" : "#95adbe",
  text: darkThemeEnabled ? "#f8f8f2" : "#111111",
  description: darkThemeEnabled ? "#d1c1d2" : "#444444",
  placeholder: darkThemeEnabled ? "#888888" : "#555555",
  images: darkThemeEnabled ? "#d0d0d0" : "#333333",
  loadingAndButtons: darkThemeEnabled ? "#6272a4" : "#5555EE",
};

const appRootTheme = {
  ...(darkThemeEnabled ? DarkTheme : DefaultTheme),
  colors: {
    ...(darkThemeEnabled ? DarkTheme.colors : DefaultTheme.colors),
    background: colors.background,
  },
};

const defaultScreenOptions = {
  headerTintColor: colors.images,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    color: colors.text,
  },
};

// Set navigation bar style
NavigationBar.setBackgroundColorAsync(colors.background);
NavigationBar.setButtonStyleAsync(darkThemeEnabled ? "light" : "dark");

export {
  apiServerURL,
  appRootTheme,
  colors,
  darkThemeEnabled,
  defaultScreenOptions,
};
