import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isDarkTheme } from './src/init';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import DownloadScreen from './src/screens/Download';
import BookmarksScreen from './src/screens/Bookmarks';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer
    theme={isDarkTheme ? DarkTheme : DefaultTheme}>
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Procurar" component={SearchScreen} />
      <Stack.Screen name="Baixar" component={DownloadScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
    </Stack.Navigator>
    <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
  </NavigationContainer>
);

export default App;