import { Appearance } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { lightColors, darkColors } from "./colors";

const apiServerURL = "http://dheisom.vps-kinghost.net:1337/v1";
const darkThemeEnabled = Appearance.getColorScheme() === "dark";
const colors = darkThemeEnabled ? darkColors : lightColors;

const appRootTheme = {
  dark: darkThemeEnabled,
  colors: {
    background: colors.root,
    text: colors.texts.normal
  },
};

const defaultScreenOptions = {
  headerTintColor: colors.buttons.icons,
  headerStyle: { backgroundColor: colors.root },
  headerTitleStyle: { color: colors.texts.normal },
};

// Set navigation bar style
NavigationBar.setBackgroundColorAsync(colors.root);
NavigationBar.setButtonStyleAsync(darkThemeEnabled ? "light" : "dark");

export {
  apiServerURL, appRootTheme, colors,
  darkThemeEnabled, defaultScreenOptions,
};
