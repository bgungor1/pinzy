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
type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register: authContextRegister } = useAuth();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword || !firstName || !lastName) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    setLoading(true);
    setError(null);
    console.log('Kayıt için gönderilen veriler:', { username, password, firstName, lastName });
    try {
      await authContextRegister(username, password, firstName, lastName);
      Alert.alert('Başarılı', `Hoş geldiniz, ${firstName} ${lastName}! Kaydınız başarıyla tamamlandı.`);
    } catch (err: any) {
      console.error('Register error:', err.message);
      setError(err.message || 'Kayıt işlemi başarısız oldu.');
      Alert.alert('Hata', err.message || 'Kayıt işlemi başarısız oldu.');
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
            <Text className="text-3xl font-bold text-center mb-4 text-white">Hesap Oluştur</Text>
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
                <View className="absolute left-3 top-4">
                  <Icon name="user" size={20} color="#9CA3AF" />
                </View>
              </View>

              <View className="relative w-11/12 mb-4">
                <TextInput
                  className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
                  placeholder="Ad"
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
                <View className="absolute left-3 top-4">
                  <Icon name="user" size={20} color="#9CA3AF" />
                </View>
              </View>

              <View className="relative w-11/12 mb-4">
                <TextInput
                  className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
                  placeholder="Soyad"
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
                <View className="absolute left-3 top-4">
                  <Icon name="user" size={20} color="#9CA3AF" />
                </View>
              </View>

              <View className="relative w-11/12 mb-4">
                <TextInput
                  className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
                  placeholder="Şifre"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <View className="absolute left-3 top-4">
                  <Icon name="lock" size={20} color="#9CA3AF" />
                </View>
              </View>

              <View className="relative w-11/12 mb-6">
                <TextInput
                  className="h-12 border border-gray-300 rounded-lg pl-12 pr-4 bg-white w-full text-black"
                  placeholder="Şifreyi Onayla"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
                <View className="absolute left-3 top-4">
                  <Icon name="lock" size={20} color="#9CA3AF" />
                </View>
              </View>
            </View>

            {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}

            <Pressable
              className={`h-12 rounded-lg items-center justify-center w-11/12 bg-primaryGreen`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-semibold">Kayıt Ol</Text>
              )}
            </Pressable>

            <Pressable
              className="mt-4"
              onPress={() => navigation.navigate('Login')} // Giriş ekranına yönlendirme
            >
              <Text className="text-primaryGreen text-lg">Zaten hesabın var mı? Giriş Yap</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterScreen;