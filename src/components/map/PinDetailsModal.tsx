import React from 'react';
import { View, Modal, TextInput, Button, Text } from 'react-native';

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

interface PinDetailsModalProps {
    visible: boolean;
    pin: Pin | null;
    canEdit: boolean;
    editedTitle: string;
    editedDescription: string;
    onTitleChange: (text: string) => void;
    onDescriptionChange: (text: string) => void;
    onSave: () => void;
    onDelete: () => void;
    onClose: () => void;
}

const PinDetailsModal: React.FC<PinDetailsModalProps> = ({
    visible,
    pin,
    canEdit,
    editedTitle,
    editedDescription,
    onTitleChange,
    onDescriptionChange,
    onSave,
    onDelete,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-5 rounded-lg w-4/5">
                    <Text className="text-lg font-bold mb-4">
                        {canEdit ? 'Pini Düzenle' : 'Pin Detayları'}
                    </Text>
                    {pin && (
                        <>
                            <Text className="font-bold mb-1">Başlık:</Text>
                            <TextInput
                                className={`border border-gray-300 p-2 mb-2 rounded ${canEdit ? '' : 'bg-gray-100'}`}
                                value={editedTitle}
                                onChangeText={onTitleChange}
                                editable={canEdit}
                            />
                            <Text className="font-bold mb-1">Açıklama:</Text>
                            <TextInput
                                className={`border border-gray-300 p-2 mb-4 rounded ${canEdit ? '' : 'bg-gray-100'}`}
                                value={editedDescription}
                                onChangeText={onDescriptionChange}
                                editable={canEdit}
                                multiline
                            />
                        </>
                    )}
                    <View className="flex-row justify-end mt-4">
                        {canEdit && (
                            <Button title="Sil" onPress={onDelete} color="red" />
                        )}
                        <View className="w-4" />
                        <Button title="İptal" onPress={onClose} color="gray" />
                        {canEdit && (
                            <>
                                <View className="w-4" />
                                <Button title="Kaydet" onPress={onSave} />
                            </>
                        )}
                        {!canEdit && (
                            <Button title="Kapat" onPress={onClose} />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default PinDetailsModal;