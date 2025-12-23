import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useAudioRecorder, useAudioPlayer, AudioModule, RecordingPresets } from 'expo-audio';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { PermissionScreen } from '../../components/common';
import { RecordingIndicator, AudioControls } from '../../components/audio';

const AudioScreen: React.FC = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const player = useAudioPlayer(recordingUri || '');
    const requestPermission = async () => {
        const { granted } = await AudioModule.requestRecordingPermissionsAsync();
        setHasPermission(granted);
        if (!granted) {
            Alert.alert('İzin Reddedildi', 'Ses kaydı için mikrofon izni gerekli.');
        }
    };

    const startRecording = async () => {
        if (hasPermission === null) await requestPermission();
        if (hasPermission === false) {
            Alert.alert('İzin Gerekli', 'Lütfen mikrofon iznini verin.');
            return;
        }
        try {
            await recorder.record();
            setIsRecording(true);
            setRecordingUri(null);
        } catch (error) {
            Alert.alert('Hata', 'Kayıt başlatılamadı.');
        }
    };

    const stopRecording = async () => {
        try {
            await recorder.stop();
            setIsRecording(false);
            if (recorder.uri) setRecordingUri(recorder.uri);
        } catch (error) {
            Alert.alert('Hata', 'Kayıt durdurulamadı.');
        }
    };

    const playRecording = () => {
        if (!recordingUri) return;
        player.play();
        setIsPlaying(true);
    };

    const stopPlaying = () => {
        player.pause();
        setIsPlaying(false);
    };

    const resetRecording = () => {
        setRecordingUri(null);
        setIsPlaying(false);
    };

    const handleSave = () => {
        Alert.alert('Başarılı', 'Ses kaydı kaydedildi!');
        navigation.goBack();
    };

    if (hasPermission === null) {
        return (
            <PermissionScreen
                icon="mic-outline"
                iconColor="#0bd38a"
                title="Ses kaydı yapmak için mikrofon izni gerekli"
                buttonText="İzin Ver"
                onRequest={requestPermission}
                onGoBack={() => navigation.goBack()}
            />
        );
    }

    if (hasPermission === false) {
        return (
            <PermissionScreen
                icon="mic-off-outline"
                iconColor="#ef4444"
                title="Mikrofon izni reddedildi"
                buttonText="Tekrar Dene"
                onRequest={requestPermission}
                onGoBack={() => navigation.goBack()}
            />
        );
    }


    return (
        <SafeAreaView className="flex-1 bg-customGray">
            <View className="flex-row items-center justify-between p-4">
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </Pressable>
                <Text className="text-white text-xl font-bold">Ses Kaydı</Text>
                <View style={{ width: 28 }} />
            </View>
            <View className="flex-1 items-center justify-center p-5">
                <RecordingIndicator
                    isRecording={isRecording}
                    hasRecording={!!recordingUri}
                />
                <AudioControls
                    isRecording={isRecording}
                    hasRecording={!!recordingUri}
                    isPlaying={isPlaying}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    onPlay={playRecording}
                    onStop={stopPlaying}
                    onReset={resetRecording}
                    onSave={handleSave}
                />
            </View>
        </SafeAreaView>
    );
};
export default AudioScreen;