import { Appearance, StyleSheet } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';

const isDarkTheme = Appearance.getColorScheme() === 'dark';

// URL of the API server
const url = 'https://vacatorrent-api-dheisom.koyeb.app';

const defaultStyles = StyleSheet.create({
  thumbnail: {
    width: 125,
    height: 185,
    marginRight: 5,
    borderRadius: 4,
  }
});

const colors = {
  background:        isDarkTheme ? '#111111' : '#ffffff',
  container:         isDarkTheme ? '#1d1e26' : '#ddeee7',
  inputBorder:       isDarkTheme ? '#6a7c8f' : '#95adbe',
  text:              isDarkTheme ? '#efefef' : '#111111',
  description:       isDarkTheme ? '#cccccc' : '#444444',
  placeholder:       isDarkTheme ? '#888888' : '#555555',
  images:            isDarkTheme ? '#d0d0d0' : '#333333',
  loadingAndButtons: isDarkTheme ? '#7777EE' : '#5555EE',
}

// Set navigation bar style
NavigationBar.setBackgroundColorAsync(isDarkTheme ? '#000' : '#FFF');
NavigationBar.setButtonStyleAsync(isDarkTheme ? 'light' : 'dark');

export { isDarkTheme, url, colors, defaultStyles };