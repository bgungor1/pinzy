import { View, Button, Text } from 'react-native'; 
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext'; 

function CustomDrawerContent(props: any) {
  const { isAuthenticated, logout } = useAuth(); 

  const handleLogoutPress = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error("Çıkış yaparken bir hata oluştu:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticated && ( 
        <View className="p-5 border-t border-gray-300 mt-2">
          <Button
          title="Çıkış Yap"
          onPress={handleLogoutPress}
          color="#FF3B30" 
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;