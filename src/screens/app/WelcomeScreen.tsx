import React from 'react';
import { View, Text } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View className="flex-1 bg-customGray justify-center items-center p-5">
      <Text className="text-4xl text-white font-bold">Welcome to Pinzy</Text>
    </View>
  );
};

export default WelcomeScreen;
