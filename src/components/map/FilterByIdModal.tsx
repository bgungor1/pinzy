import React from 'react';
import { View, Modal, TextInput, Button, Text } from 'react-native';

interface FilterByIdModalProps {
    visible: boolean;
    userId: string;
    onUserIdChange: (text: string) => void;
    onApply: () => void;
    onCancel: () => void;
}

const FilterByIdModal: React.FC<FilterByIdModalProps> = ({
    visible,
    userId,
    onUserIdChange,
    onApply,
    onCancel,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-5 rounded-lg w-4/5">
                    <Text className="text-lg font-bold mb-4">Kullanıcı ID'si ile Filtrele</Text>
                    <TextInput
                        className="border border-gray-300 p-2 mb-2 rounded"
                        placeholder="Kullanıcı ID'si"
                        keyboardType="numeric"
                        value={userId}
                        onChangeText={onUserIdChange}
                    />
                    <View className="flex-row justify-end mt-4">
                        <Button title="İptal" onPress={onCancel} color="gray" />
                        <View className="w-4" />
                        <Button title="Uygula" onPress={onApply} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default FilterByIdModal;