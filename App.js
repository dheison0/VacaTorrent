import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  appRootTheme,
  darkThemeEnabled,
  defaultScreenOptions,
} from "./src/init";
import HomeScreen from "./src/screens/Home";
import SearchScreen from "./src/screens/Search";
import DownloadScreen from "./src/screens/Download";
import BookmarksScreen from "./src/screens/Bookmarks";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer theme={appRootTheme}>
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Procurar" component={SearchScreen} />
      <Stack.Screen name="Baixar" component={DownloadScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
    </Stack.Navigator>
    <StatusBar style={darkThemeEnabled ? "light" : "dark"} />
  </NavigationContainer>
);

export default App;
