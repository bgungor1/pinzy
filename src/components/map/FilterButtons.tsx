import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type FilterMode = 'all' | 'my' | 'other';

interface FilterButtonsProps {
    filterMode: FilterMode;
    filteredById: number | null;
    onFilterAll: () => void;
    onFilterMy: () => void;
    onFilterOther: () => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
    filterMode,
    filteredById,
    onFilterAll,
    onFilterMy,
    onFilterOther,
}) => {
    return (
        <>
            <View className="flex-row mb-4 justify-around">
                <TouchableOpacity
                    className={`py-2 px-4 rounded ${filterMode === 'all' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onPress={onFilterAll}
                >
                    <Text className={`${filterMode === 'all' ? 'text-white' : 'text-black'}`}>Tüm Pinler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`py-2 px-4 rounded ${filterMode === 'my' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onPress={onFilterMy}
                >
                    <Text className={`${filterMode === 'my' ? 'text-white' : 'text-black'}`}>Benim Pinlerim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`py-2 px-4 rounded ${filterMode === 'other' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onPress={onFilterOther}
                >
                    <Text className={`${filterMode === 'other' ? 'text-white' : 'text-black'}`}>Başka kullanıcı...</Text>
                </TouchableOpacity>
            </View>

            {filterMode === 'other' && filteredById && (
                <Text className="text-center text-sm mb-2">Filtrelenen Kullanıcı ID: {filteredById}</Text>
            )}
        </>
    );
};
export default FilterButtons;