import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/app/WelcomeScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import PostsScreen from '../screens/app/PostsScreen';
import CreatePostScreen from '../screens/app/CreatePostScreen';
import UserPostsScreen from '../screens/app/UserPostsScreen';
import CameraScreen from '../screens/app/CameraScreen';
import AudioScreen from '../screens/app/AudioScreen';

export interface Post {
  id: string;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type AppStackParamList = {
  Welcome: undefined;
  Profile: undefined;
  Posts: undefined;
  CreatePost: { post: Post } | undefined;
  UserPosts: undefined;
  Camera: undefined;
  Audio: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <AppStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Welcome" component={WelcomeScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="Posts" component={PostsScreen} />
      <AppStack.Screen name="CreatePost" component={CreatePostScreen} />
      <AppStack.Screen name="UserPosts" component={UserPostsScreen} />
      <AppStack.Screen name="Camera" component={CameraScreen} />
      <AppStack.Screen name="Audio" component={AudioScreen} />
    </AppStack.Navigator>
  );
};
export default AppStackNavigator;