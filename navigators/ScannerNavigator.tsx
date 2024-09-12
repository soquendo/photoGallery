import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScannerScreen from '../screens/ScannerScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { RootStackParamList } from '../hooks/types';

const Stack = createStackNavigator<RootStackParamList>();

const ScannerNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ScannerScreen">
      <Stack.Screen 
        name="ScannerScreen" 
        component={ScannerScreen} 
        options={{ headerTitle: 'Scan QR Code' }} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ headerTitle: 'Product Detail' }} 
      />
      <Stack.Screen 
        name="FavoritesScreen" 
        component={FavoritesScreen} 
        options={{ headerTitle: 'Favorites' }} 
      />
    </Stack.Navigator>
  );
};

export default ScannerNavigator;