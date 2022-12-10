import { Appearance } from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";

const darkThemeEnabled = Appearance.getColorScheme() === "dark";
const apiServerURL = "https://vacatorrent-api-dheisom.koyeb.app";

const colors = {
  header: darkThemeEnabled ? "#282a36" : "#FFF",
  background: darkThemeEnabled ? "#2B2830" : "#ffffff",
  container: darkThemeEnabled ? "#452338" : "#ddeee7",
  inputBorder: darkThemeEnabled ? "#745D75" : "#95adbe",
  text: darkThemeEnabled ? "#EFEFEF" : "#111111",
  description: darkThemeEnabled ? "#B3ACB5" : "#444444",
  placeholder: darkThemeEnabled ? "#888888" : "#555555",
  images: darkThemeEnabled ? "#d0d0d0" : "#333333",
  loadingAndButtons: darkThemeEnabled ? "#C04F57" : "#5555EE",
};

const rootTheme = {
  ...(darkThemeEnabled ? DarkTheme : DefaultTheme),
  colors: {
    ...(darkThemeEnabled ? DarkTheme.colors : DefaultTheme.colors),
    background: colors.header,
  },
};

// Set navigation bar style
NavigationBar.setBackgroundColorAsync(colors.background);
NavigationBar.setButtonStyleAsync(darkThemeEnabled ? "light" : "dark");

export { apiServerURL, colors, darkThemeEnabled, rootTheme };
