import React from 'react';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface PermissionScreenProps {
    icon: IoniconsName;
    iconColor: string;
    title: string;
    buttonText: string;
    onRequest: () => void;
    onGoBack: () => void;
}

const PermissionScreen: React.FC<PermissionScreenProps> = ({
    icon,
    iconColor,
    title,
    buttonText,
    onRequest,
    onGoBack,
}) => {
    return (
        <SafeAreaView className="flex-1 bg-customGray items-center justify-center p-5">
            <Ionicons name={icon} size={80} color={iconColor} />
            <Text className="text-white text-xl text-center mt-6 mb-4">
                {title}
            </Text>
            <Pressable
                className="bg-primaryGreen py-3 px-8 rounded-lg shadow-md mt-4"
                onPress={onRequest}
            >
                <Text className="text-white text-lg font-semibold">{buttonText}</Text>
            </Pressable>
            <Pressable
                className="py-3 px-8 mt-4"
                onPress={onGoBack}
            >
                <Text className="text-gray-400 text-base">Geri Dön</Text>
            </Pressable>
        </SafeAreaView>
    );
};
export default PermissionScreen;
