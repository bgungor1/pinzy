import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import AppStackNavigator, { AppStackParamList } from './AppStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import MapScreen from '../screens/app/MapScreen';


export type DrawerParamList = {
  AppStack: NavigatorScreenParams<AppStackParamList>;
  Settings: undefined;
  CreatePost: NavigatorScreenParams<AppStackParamList>;
  Profile: NavigatorScreenParams<AppStackParamList>;
  Posts: NavigatorScreenParams<AppStackParamList>;
  MapScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="AppStack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="AppStack"
        component={AppStackNavigator}
        options={{ title: 'Ana Sayfa' }}

      />
      <Drawer.Screen
        name="Profile"
        component={AppStackNavigator}
        options={{ title: 'Profilim' }}
        initialParams={{ screen: 'Profile' }}
      />
      <Drawer.Screen
        name="CreatePost"
        component={AppStackNavigator}
        options={{ title: 'Yeni Gönderi Oluştur' }}
        initialParams={{ screen: 'CreatePost' }}
      />
      <Drawer.Screen
        name="Posts"
        component={AppStackNavigator}
        options={{ title: 'Postları Görüntüle' }}
        initialParams={{ screen: 'Posts' }}
      />
      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: 'Harita' }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;