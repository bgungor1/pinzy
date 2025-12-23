import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '../../navigation/AppStack';
import { Ionicons } from '@expo/vector-icons';

type ProfileScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleShowMyPosts = () => {
    navigation.navigate('UserPosts');
  };

  const handleOpenCamera = () => {
    navigation.navigate('Camera');
  };

  const handleOpenAudio = () => {
    navigation.navigate('Audio');
  };

  return (
    <SafeAreaView className="flex-1 bg-customGray">
      <View className="flex-1 items-center justify-center p-5">
        {user ? (
          <>
            <Text className="text-3xl font-bold text-white mb-8">
              Hoş Geldin, {user.username}!
            </Text>

            {/* Postlarımı Göster butonu */}
            <Pressable
              className="bg-primaryGreen py-3 px-8 rounded-lg shadow-md w-64 mb-4"
              onPress={handleShowMyPosts}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="document-text-outline" size={22} color="white" />
                <Text className="text-white text-xl font-semibold ml-2">Postlarımı Göster</Text>
              </View>
            </Pressable>

            <Pressable
              className="bg-primaryGreen py-3 px-8 rounded-lg shadow-md w-64 mb-4"
              onPress={handleOpenCamera}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="camera-outline" size={22} color="white" />
                <Text className="text-white text-xl font-semibold ml-2">Kamera</Text>
              </View>
            </Pressable>

            <Pressable
              className="bg-primaryGreen py-3 px-8 rounded-lg shadow-md w-64"
              onPress={handleOpenAudio}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="mic-outline" size={22} color="white" />
                <Text className="text-white text-xl font-semibold ml-2">Ses Kaydı</Text>
              </View>
            </Pressable>
          </>
        ) : (
          <Text className="text-xl text-white">Kullanıcı bilgileri yüklenemedi.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;