import { Appearance } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const apiServerURL = "http://dheisom.vps-kinghost.net:1337/v1";
const darkThemeEnabled = Appearance.getColorScheme() === "dark";

const colors = {
  box: {
    root: darkThemeEnabled ? "#282a36" : "#ffffff",
    container: darkThemeEnabled ? "#44475a" : "#F5EBE0",
  },
  texts: {
    normal: darkThemeEnabled ? "#f8f8f2" : "#111111",
    sinopse: darkThemeEnabled ? "#d1c1d2" : "#444444",
    placeholder: darkThemeEnabled ? "#888888" : "#555555",
  },
  buttons: {
    icons: darkThemeEnabled ? "#d0d0d0" : "#333333",
    search: darkThemeEnabled ? "#6272a4" : "#a475f9",
    download: darkThemeEnabled ? "#bd93f9" : "#a475f9",
    copyLink: darkThemeEnabled ? "#ff79c6" : "#a475f9",
  },
  loading: darkThemeEnabled ? "#bd93f9" : "#a475f9",
  inputBorder: darkThemeEnabled ? "#745D75" : "#95adbe",
};

let theme = darkThemeEnabled ? DarkTheme : DefaultTheme;
const appRootTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: colors.box.root,
  },
};

const defaultScreenOptions = {
  headerTintColor: colors.buttons.icons,
  headerStyle: {
    backgroundColor: colors.box.root,
  },
  headerTitleStyle: {
    color: colors.texts.normal,
  },
};

// Set navigation bar style
NavigationBar.setBackgroundColorAsync(colors.box.root);
NavigationBar.setButtonStyleAsync(darkThemeEnabled ? "light" : "dark");

export {
  apiServerURL,
  appRootTheme,
  colors,
  darkThemeEnabled,
  defaultScreenOptions,
};
