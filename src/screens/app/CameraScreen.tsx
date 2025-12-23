import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CameraScreen: React.FC = () => {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return (
            <SafeAreaView className="flex-1 bg-customGray items-center justify-center">
                <Text className="text-white text-lg">Yükleniyor...</Text>
            </SafeAreaView>
        );
    }
    if (!permission.granted) {
        return (
            <SafeAreaView className="flex-1 bg-customGray items-center justify-center p-5">
                <Ionicons name="camera-outline" size={80} color="#0bd38a" />
                <Text className="text-white text-xl text-center mt-6 mb-4">
                    Fotoğraf çekmek için kamera izni gerekli
                </Text>
                <Pressable
                    className="bg-primaryGreen py-3 px-8 rounded-lg shadow-md mt-4"
                    onPress={requestPermission}
                >
                    <Text className="text-white text-lg font-semibold">İzin Ver</Text>
                </Pressable>
                <Pressable
                    className="py-3 px-8 mt-4"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-gray-400 text-base">Geri Dön</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const result = await cameraRef.current.takePictureAsync();
                if (result) {
                    setPhoto(result.uri);
                }
            } catch (error) {
                Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
            }
        }
    };

    const retakePicture = () => {
        setPhoto(null);
    };

    if (photo) {
        return (
            <SafeAreaView className="flex-1 bg-customGray">
                <View className="flex-1">
                    <Image source={{ uri: photo }} className="flex-1" resizeMode="contain" />
                </View>
                <View className="flex-row justify-around items-center py-6 bg-customGray">
                    <Pressable
                        className="bg-gray-600 py-3 px-6 rounded-lg"
                        onPress={retakePicture}
                    >
                        <Text className="text-white text-lg font-semibold">Tekrar Çek</Text>
                    </Pressable>
                    <Pressable
                        className="bg-primaryGreen py-3 px-6 rounded-lg"
                        onPress={() => {
                            Alert.alert('Başarılı', 'Fotoğraf kaydedildi!');
                            navigation.goBack();
                        }}
                    >
                        <Text className="text-white text-lg font-semibold">Kaydet</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-customGray">
            <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
                {/* Üst bar */}
                <View className="flex-row justify-between items-center p-4">
                    <Pressable
                        className="bg-black/50 p-3 rounded-full"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="close" size={28} color="white" />
                    </Pressable>
                    <Pressable
                        className="bg-black/50 p-3 rounded-full"
                        onPress={toggleCameraFacing}
                    >
                        <Ionicons name="camera-reverse-outline" size={28} color="white" />
                    </Pressable>
                </View>
                <View className="absolute bottom-0 left-0 right-0 items-center pb-10">
                    <Pressable
                        className="w-20 h-20 rounded-full bg-white border-4 border-primaryGreen items-center justify-center"
                        onPress={takePicture}
                    >
                        <View className="w-16 h-16 rounded-full bg-white" />
                    </Pressable>
                </View>
            </CameraView>
        </SafeAreaView>
    );
};

export default CameraScreen;
