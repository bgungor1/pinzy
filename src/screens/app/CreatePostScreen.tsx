import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { AppStackParamList } from '../../navigation/AppStack';
import Constants from 'expo-constants';

type CreatePostScreenRouteProp = RouteProp<AppStackParamList, 'CreatePost'>;

interface Post {
  id: string;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CreatePostScreenRouteProp>();
  const editingPost = route.params?.post as Post | undefined;
  const [title, setTitle] = useState(editingPost ? editingPost.title : '');
  const [content, setContent] = useState(editingPost ? editingPost.content : '');
  const [loading, setLoading] = useState(false);

  const { accessToken } = useAuth();

  useEffect(() => {
    if (editingPost) {
      navigation.setOptions({ title: 'Gönderiyi Düzenle' });
    } else {
      navigation.setOptions({ title: 'Yeni Gönderi Oluştur' });
    }
  }, [editingPost, navigation]);

  const handleSubmitPost = async () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('Hata', 'Lütfen başlık ve içerik alanlarını doldurun.');
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL?.replace('/api', '') || '';
      let response;

      if (editingPost) {
        response = await fetch(`${API_BASE_URL}/api/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title, content }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title, content }),
        });
      }

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Başarılı', editingPost ? 'Gönderiniz başarıyla güncellendi!' : 'Gönderiniz başarıyla oluşturuldu!', [
          { text: 'Tamam', onPress: () => navigation.goBack() }
        ]);
        if (!editingPost) {
          setTitle('');
          setContent('');
        }
      } else {
        Alert.alert('Hata', data.message || (editingPost ? 'Gönderi güncellenirken bir hata oluştu.' : 'Gönderi oluşturulurken bir hata oluştu.'));
      }
    } catch (error) {
      console.error(editingPost ? 'Gönderi güncellenirken hata:' : 'Gönderi oluşturulurken hata:', error);
      Alert.alert('Hata', 'Sunucuya bağlanırken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100 justify-center">
      <Text className="text-3xl font-bold mb-8 text-center text-gray-800">{editingPost ? 'Gönderiyi Düzenle' : 'Yeni Gönderi Oluştur'}</Text>
      <TextInput
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white text-base"
        placeholder="Gönderi Başlığı"
        placeholderTextColor="#9ca3af"
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />
      <TextInput
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 bg-white text-base h-32 text-top"
        placeholder="Gönderi İçeriği"
        placeholderTextColor="#9ca3af"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        editable={!loading}
      />
      <TouchableOpacity
        className={`py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-green-500'}`}
        onPress={handleSubmitPost}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-xl font-bold text-center">{editingPost ? 'Gönderiyi Güncelle' : 'Gönderi Oluştur'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default CreatePostScreen;