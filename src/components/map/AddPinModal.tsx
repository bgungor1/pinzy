import React from 'react';
import { View, Modal, TextInput, Button, Text } from 'react-native';

interface AddPinModalProps {
    visible: boolean;
    title: string;
    description: string;
    onTitleChange: (text: string) => void;
    onDescriptionChange: (text: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const AddPinModal: React.FC<AddPinModalProps> = ({
    visible,
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSave,
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
                    <Text className="text-lg font-bold mb-4">Yeni Pin Ekle</Text>
                    <TextInput
                        className="border border-gray-300 p-2 mb-2 rounded"
                        placeholder="Başlık"
                        value={title}
                        onChangeText={onTitleChange}
                    />
                    <TextInput
                        className="border border-gray-300 p-2 mb-4 rounded"
                        placeholder="Açıklama"
                        value={description}
                        onChangeText={onDescriptionChange}
                        multiline
                    />
                    <View className="flex-row justify-end">
                        <Button title="İptal" onPress={onCancel} color="gray" />
                        <View className="w-4" />
                        <Button title="Kaydet" onPress={onSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default AddPinModal;