import React from 'react';
import { View, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface AudioControlsProps {
    isRecording: boolean;
    hasRecording: boolean;
    isPlaying: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onPlay: () => void;
    onStop: () => void;
    onReset: () => void;
    onSave: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
    isRecording,
    hasRecording,
    isPlaying,
    onStartRecording,
    onStopRecording,
    onPlay,
    onStop,
    onReset,
    onSave,
}) => {
    const navigation = useNavigation();

    const handleSave = () => {
        Alert.alert('Başarılı', 'Ses kaydı kaydedildi!');
        navigation.goBack();
    };

    return (
        <View className="flex-row items-center justify-center gap-4">
            {!hasRecording ? (
                <Pressable
                    className={`w-20 h-20 rounded-full items-center justify-center ${isRecording ? 'bg-red-500' : 'bg-primaryGreen'
                        }`}
                    onPress={isRecording ? onStopRecording : onStartRecording}
                >
                    <Ionicons
                        name={isRecording ? 'stop' : 'mic'}
                        size={36}
                        color="white"
                    />
                </Pressable>
            ) : (
                <>
                    <Pressable
                        className="w-16 h-16 rounded-full bg-gray-600 items-center justify-center"
                        onPress={onReset}
                    >
                        <Ionicons name="trash-outline" size={28} color="white" />
                    </Pressable>
                    <Pressable
                        className={`w-20 h-20 rounded-full items-center justify-center ${isPlaying ? 'bg-orange-500' : 'bg-primaryGreen'
                            }`}
                        onPress={isPlaying ? onStop : onPlay}
                    >
                        <Ionicons
                            name={isPlaying ? 'pause' : 'play'}
                            size={36}
                            color="white"
                        />
                    </Pressable>
                    <Pressable
                        className="w-16 h-16 rounded-full bg-primaryGreen items-center justify-center"
                        onPress={onSave}
                    >
                        <Ionicons name="checkmark" size={28} color="white" />
                    </Pressable>
                </>
            )}
        </View>
    );
};
export default AudioControls;