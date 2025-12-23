import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList, Post } from '../../navigation/AppStack';
import { useAuth } from '../../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from "@expo/vector-icons/Octicons";
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL?.replace('/api', '') || '';
type PostsScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Posts'>;

const PostsScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<PostsScreenNavigationProp>();
  const { accessToken, user } = useAuth();

  const fetchPosts = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        Alert.alert('Hata', data.message || 'Gönderiler yüklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Gönderiler yüklenirken hata:', error);
      Alert.alert('Hata', 'Sunucuya bağlanırken bir sorun oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [accessToken]);

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
                setPosts(posts.filter(post => post.id !== postId));
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
    fetchPosts();
  }, [fetchPosts]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);


  const handleCreateNewPostPress = () => {
    navigation.navigate('CreatePost');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-700">Gönderiler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 relative p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-5 text-center text-gray-800">Tüm Gönderiler</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-lg mb-3 shadow-md">
            <Text className="text-lg font-bold text-blue-600 mb-1">{item.title}</Text>
            <Text className="text-base text-gray-700 mb-1">{item.content}</Text>
            {user?.id === item.userId && (
              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  onPress={() => handleDeletePost(item.id)}
                  className="p-2 rounded-full bg-red-100"
                >
                  <FontAwesome name="trash" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
            <Text className="text-sm italic text-gray-500 text-right">
              - User ID: {item.userId} (Oluşturuldu: {new Date(item.createdAt).toLocaleDateString()})
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-600 mt-10">Henüz hiç gönderi yok.</Text>
        )}
      />
      <TouchableOpacity
        className="bg-blue-600 w-16 h-16 rounded-full justify-center items-center absolute bottom-10 right-8 shadow-lg"
        onPress={handleCreateNewPostPress}
      >
        <Octicons name="diff-added" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PostsScreen;
