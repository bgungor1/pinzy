import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RecordingIndicatorProps {
    isRecording: boolean;
    hasRecording: boolean;
}

const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({
    isRecording,
    hasRecording,
}) => {
    if (isRecording) {
        return (
            <View className="items-center mb-10">
                <View className="w-32 h-32 rounded-full bg-red-500/20 items-center justify-center mb-4">
                    <Ionicons name="mic" size={60} color="#ef4444" />
                </View>
                <Text className="text-red-400 text-xl font-semibold">Kayıt yapılıyor...</Text>
            </View>
        );
    }

    if (hasRecording) {
        return (
            <View className="items-center mb-10">
                <View className="w-32 h-32 rounded-full bg-primaryGreen/20 items-center justify-center mb-4">
                    <Ionicons name="checkmark-circle" size={60} color="#0bd38a" />
                </View>
                <Text className="text-primaryGreen text-xl font-semibold">Kayıt tamamlandı!</Text>
            </View>
        );
    }

    return (
        <View className="items-center mb-10">
            <View className="w-32 h-32 rounded-full bg-gray-600 items-center justify-center mb-4">
                <Ionicons name="mic-outline" size={60} color="#9ca3af" />
            </View>
            <Text className="text-gray-400 text-xl">Kayda hazır</Text>
        </View>
    );
};

export default RecordingIndicator;
