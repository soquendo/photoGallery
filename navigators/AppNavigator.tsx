import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScannerNavigator from './ScannerNavigator';
import PhotoGalleryStack from '../PhotoGalleryStack';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="ScannerApp">
      <Drawer.Screen
        name="ScannerApp"
        component={ScannerNavigator}
        options={{ drawerLabel: 'Scanner App' }}
      />
      <Drawer.Screen
        name="PhotoGallery"
        component={PhotoGalleryStack}
        options={{ drawerLabel: 'Photo Gallery' }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;