import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
 
};

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  
  const navigation = useNavigation<LoginScreenNavigationProp>(); 
  const { login: authContextLogin } = useAuth();




  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Hata', 'Lütfen kullanıcı adı ve şifrenizi giriniz.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await authContextLogin(username, password);

      Alert.alert('Başarılı', `Hoş geldiniz, ${username}!`);

    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message || 'Giriş işlemi başarısız oldu.');
      Alert.alert('Hata', err.message || 'Giriş işlemi başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-customGray">
      <KeyboardAvoidingView
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      
          <View className="flex-1 items-center justify-center w-full p-5">
            <Text className="text-3xl font-bold text-center mb-4 text-white">Welcome to Pinzy</Text>
            <View className="w-3/4 h-1 bg-gray-300 rounded-full mb-8" />
            <Image
              source={require('../../assets/images/logo.png')}
              className="w-64 h-64 mb-8 mt-10 rounded-full" 
            />
            <View className="w-full items-center">
          
    <View className="relative w-11/12 mb-4">
      <TextInput
        className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
        placeholder="Kullanıcı Adı"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
         <View className="absolute left-3  top-4">
         <Icon name="user" size={20} color="#9CA3AF"  />
         </View>
      
    </View>
    <View className="relative w-11/12 mb-6">
      <TextInput
        className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
        placeholder="Şifre"
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="absolute left-3 top-4">
      <Icon name="lock" size={20} color="#9CA3AF"  />
      </View>
    </View>
            </View>
            {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}
            <Pressable
              className={`h-12 rounded-lg items-center justify-center w-11/12 bg-primaryGreen`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-semibold">Giriş Yap</Text>
              )}
            </Pressable>
            <Pressable
              className="mt-4"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-primaryGreen text-lg">Kayıt Ol</Text>
            </Pressable>
            <Pressable
              className="mt-4"
              onPress={() => Alert.alert('Şifremi Unuttum', 'Şifre sıfırlama ekranına yönlendirilecek.')}
            >
              <Text className="text-primaryGreen text-lg">Şifremi Unuttum</Text>
            </Pressable>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    );
};

export default LoginScreen;