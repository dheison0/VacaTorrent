import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import DownloadScreen from './src/screens/Download';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Procurar" component={SearchScreen} />
      <Stack.Screen name="Baixar" component={DownloadScreen} />
    </Stack.Navigator>
    <StatusBar style="dark" />
  </NavigationContainer>
);

export default App;