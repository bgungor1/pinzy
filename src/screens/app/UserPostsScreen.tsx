import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { useAuth } from '../../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL?.replace('/api', '') || '';

export interface Post {
  id: string;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
type UserPostsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'UserPosts'>;
const UserPostsScreen: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<UserPostsScreenNavigationProp>();
  const { accessToken, user } = useAuth();

  const fetchUserPosts = useCallback(async () => {
    if (!accessToken || !user?.id) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts?userId=${user.id}`, { // userId ile filtrele
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserPosts(data);
      } else {
        Alert.alert('Hata', data.message || 'Gönderileriniz yüklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Gönderileriniz yüklenirken hata:', error);
      Alert.alert('Hata', 'Sunucuya bağlanırken bir sorun oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accessToken, user]);

  const handleDeletePost = async (postId: string) => {
    Alert.alert(
      'Gönderiyi Sil',
      'Bu gönderiyi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              });

              if (response.ok) {
                setUserPosts(userPosts.filter(post => post.id !== postId));
                Alert.alert('Başarılı', 'Gönderi başarıyla silindi.');
              } else {
                const data = await response.json();
                Alert.alert('Hata', data.message || 'Gönderi silinirken bir hata oluştu.');
              }
            } catch (error) {
              console.error('Gönderi silinirken hata:', error);
              Alert.alert('Hata', 'Sunucuya bağlanırken bir sorun oluştu.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  useFocusEffect(
    useCallback(() => {
      fetchUserPosts();
    }, [fetchUserPosts])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserPosts();
  }, [fetchUserPosts]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-700">Gönderileriniz yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-5 text-center text-gray-800">Postlarım</Text>

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg mb-3 shadow-md">
            <Text className="text-lg font-bold text-blue-600 mb-1">{item.title}</Text>
            <Text className="text-base text-gray-700 mb-1">{item.content}</Text>
            {user?.id === item.userId && (
              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreatePost', { post: item as any })}
                  className="mr-3 p-2 rounded-full bg-blue-100"
                >
                  <FontAwesome name="edit" size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeletePost(item.id)}
                  className="p-2 rounded-full bg-red-100"
                >
                  <FontAwesome name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
            <Text className="text-sm italic text-gray-500 text-right">
              (Oluşturuldu: {new Date(item.createdAt).toLocaleDateString()})
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-600 mt-10">Henüz hiç gönderiniz yok.</Text>
        )}
      />
    </View>
  );
};
export default UserPostsScreen;