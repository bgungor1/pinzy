import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth } from '../../context/AuthContext';
import { mapPinsApi } from '../../services/api';

import {
  AddPinModal,
  PinDetailsModal,
  FilterByIdModal,
  FilterButtons,
  PinListItem,
  Pin,
  FilterMode,
} from '../../components/map';

const MapScreen = () => {
  const [showAddPinDialog, setShowAddPinDialog] = useState(false);
  const [newPinTitle, setNewPinTitle] = useState('');
  const [newPinDescription, setNewPinDescription] = useState('');
  const [newPinCoordinates, setNewPinCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [showPinDetailsDialog, setShowPinDetailsDialog] = useState(false);
  const [editedPinTitle, setEditedPinTitle] = useState('');
  const [editedPinDescription, setEditedPinDescription] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [filteredById, setFilteredById] = useState<number | null>(null);
  const [showFilterByIdDialog, setShowFilterByIdDialog] = useState(false);
  const [tempFilterUserId, setTempFilterUserId] = useState('');

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const { accessToken, user } = useAuth();
  const currentUserId = user?.id;
  const currentUserIsAdmin = user?.role === 'admin';

  const fetchPins = useCallback(async () => {
    if (!accessToken) return;
    try {
      const data = await mapPinsApi.getAllMapPins(accessToken);
      setPins(data);
    } catch (error) {
      console.error('API isteği sırasında hata oluştu:', error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) fetchPins();
  }, [accessToken, fetchPins]);

  const handleMapPress = (event: any) => {
    if (!accessToken) {
      Alert.alert("Giriş Yapmalısınız", "Pin eklemek için lütfen giriş yapın.");
      return;
    }
    setNewPinCoordinates(event.nativeEvent.coordinate);
    setShowAddPinDialog(true);
  };

  const handleMarkerPress = (pin: Pin) => {
    setSelectedPin(pin);
    setEditedPinTitle(pin.title);
    setEditedPinDescription(pin.description || '');
    setShowPinDetailsDialog(true);
  };

  const handleSavePin = async () => {
    if (!newPinCoordinates || !accessToken) return;
    try {
      await mapPinsApi.createMapPin(newPinTitle, newPinCoordinates.latitude, newPinCoordinates.longitude, newPinDescription, accessToken);
      fetchPins();
    } catch (error) {
      console.error('API isteği sırasında hata oluştu:', error);
    }
    setShowAddPinDialog(false);
    setNewPinTitle('');
    setNewPinDescription('');
    setNewPinCoordinates(null);
  };

  const handleUpdatePin = async () => {
    if (!selectedPin || !accessToken) return;
    try {
      await mapPinsApi.updateMapPin(selectedPin.id, { title: editedPinTitle, description: editedPinDescription }, accessToken);
      fetchPins();
      setShowPinDetailsDialog(false);
      setSelectedPin(null);
    } catch (error) {
      Alert.alert('Hata', 'Pin güncellenirken bir sorun oluştu.');
    }
  };

  const handleDeletePin = async () => {
    if (!selectedPin || !accessToken) return;
    Alert.alert('Pini Sil', 'Bu pini silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          try {
            await mapPinsApi.deleteMapPin(selectedPin.id, accessToken);
            fetchPins();
            setShowPinDetailsDialog(false);
            setSelectedPin(null);
          } catch (error) {
            Alert.alert('Hata', 'Pin silinirken bir sorun oluştu.');
          }
        },
      },
    ]);
  };

  const handlePinListPress = (pin: Pin) => {
    handleMarkerPress(pin);
    mapRef.current?.animateToRegion({
      latitude: pin.latitude,
      longitude: pin.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  const handleFilterByIdSave = () => {
    const id = parseInt(tempFilterUserId);
    if (!isNaN(id)) {
      setFilteredById(id);
      setFilterMode('other');
      setShowFilterByIdDialog(false);
      setTempFilterUserId('');
    } else {
      Alert.alert('Geçersiz ID', 'Lütfen geçerli bir kullanıcı ID\'si girin.');
    }
  };

  const filteredPins = useMemo(() => {
    switch (filterMode) {
      case 'my': return pins.filter(pin => pin.userId === currentUserId);
      case 'other': return filteredById ? pins.filter(pin => pin.userId === filteredById) : pins;
      default: return pins;
    }
  }, [pins, filterMode, filteredById, currentUserId]);

  const canEditOrDeletePin = selectedPin && (selectedPin.userId === currentUserId || currentUserIsAdmin);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        {/* Harita */}
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onPress={handleMapPress}
        >
          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
              title={pin.title}
              description={pin.description}
              pinColor={pin.userId === currentUserId ? 'blue' : 'red'}
              onPress={() => handleMarkerPress(pin)}
            />
          ))}
        </MapView>

        <AddPinModal
          visible={showAddPinDialog}
          title={newPinTitle}
          description={newPinDescription}
          onTitleChange={setNewPinTitle}
          onDescriptionChange={setNewPinDescription}
          onSave={handleSavePin}
          onCancel={() => { setShowAddPinDialog(false); setNewPinTitle(''); setNewPinDescription(''); }}
        />

        <PinDetailsModal
          visible={showPinDetailsDialog}
          pin={selectedPin}
          canEdit={!!canEditOrDeletePin}
          editedTitle={editedPinTitle}
          editedDescription={editedPinDescription}
          onTitleChange={setEditedPinTitle}
          onDescriptionChange={setEditedPinDescription}
          onSave={handleUpdatePin}
          onDelete={handleDeletePin}
          onClose={() => { setShowPinDetailsDialog(false); setSelectedPin(null); }}
        />

        <FilterByIdModal
          visible={showFilterByIdDialog}
          userId={tempFilterUserId}
          onUserIdChange={setTempFilterUserId}
          onApply={handleFilterByIdSave}
          onCancel={() => { setShowFilterByIdDialog(false); setTempFilterUserId(''); }}
        />
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enablePanDownToClose={false}>
          <View className="flex-1 p-4">
            <FilterButtons
              filterMode={filterMode}
              filteredById={filteredById}
              onFilterAll={() => { setFilterMode('all'); setFilteredById(null); }}
              onFilterMy={() => { setFilterMode('my'); setFilteredById(null); }}
              onFilterOther={() => setShowFilterByIdDialog(true)}
            />
            <Text className="text-xl font-bold mb-4">Pin Listesi</Text>
            <BottomSheetFlatList<Pin>
              data={filteredPins}
              keyExtractor={(item: Pin) => item.id.toString()}
              renderItem={({ item }: { item: Pin }) => (
                <PinListItem
                  pin={item}
                  currentUserId={currentUserId}
                  isAdmin={!!currentUserIsAdmin}
                  onPress={handlePinListPress}
                  onEdit={handlePinListPress}
                />
              )}
            />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  map: { width: '100%', height: '100%' },
});

export default MapScreen;
