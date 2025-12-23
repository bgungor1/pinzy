import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface Pin {
    id: number;
    userId: number;
    title: string;
    description?: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
}

interface PinListItemProps {
    pin: Pin;
    currentUserId: number | undefined;
    isAdmin: boolean;
    onPress: (pin: Pin) => void;
    onEdit: (pin: Pin) => void;
}

const PinListItem: React.FC<PinListItemProps> = ({
    pin,
    currentUserId,
    isAdmin,
    onPress,
    onEdit,
}) => {
    const canEdit = pin.userId === currentUserId || isAdmin;

    const renderRightActions = () => {
        const handleEditPress = () => {
            onEdit(pin);
        };

        return (
            <TouchableOpacity
                className={`justify-center items-center w-24 ${canEdit ? 'bg-blue-500' : 'bg-gray-400'}`}
                onPress={handleEditPress}
                disabled={!canEdit}
            >
                <Text className="text-white font-bold">Düzenle</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            friction={2}
            rightThreshold={40}
        >
            <TouchableOpacity
                className="p-3 border-b border-gray-200 flex-row justify-between items-center bg-white"
                onPress={() => onPress(pin)}
            >
                <View>
                    <Text className="font-bold text-base">{pin.title}</Text>
                    <Text className="text-sm text-gray-600">{pin.description || 'Açıklama yok'}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};
export default React.memo(PinListItem);