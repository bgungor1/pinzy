import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import { View, Text, ActivityIndicator } from 'react-native';
import './global.css';
import * as Font from 'expo-font';
import DrawerNavigator from './src/navigation/DrawerNavigator'; 
// import HomeScreen from './src/screens/app/HomeScreen';

const AuthStack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};



const RootNavigator: React.FC = () => {
  const { loading, isAuthenticated } = useAuth(); 

  if (loading) {
 
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2">Uygulama Yükleniyor...</Text>
      </View>
    );
  }

  return (
    isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />
  );
};

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({

        'FontAwesome': require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Fontlar yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
      <NavigationContainer>
      <RootNavigator/>
      </NavigationContainer>
      </AuthProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;