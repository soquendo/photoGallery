import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhotoGalleryStack from './PhotoGalleryStack';
import WeatherNavigator from './navigators/WeatherNavigator';
import ScannerNavigator from './navigators/ScannerNavigator';

const Drawer = createDrawerNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="PhotoGallery"
      screenOptions={{
        drawerPosition: 'right', // Set the drawer to the right side
      }}
    >
      <Drawer.Screen
        name="PhotoGallery"
        component={PhotoGalleryStack}
        options={{
          drawerLabel: 'Photo Gallery',
          headerLeft: () => null, // This removes the button
          headerTitle: 'Photo Gallery', // Keeps the title
        }}
      />
      <Drawer.Screen
        name="Weather App"
        component={WeatherNavigator}
        options={{ drawerLabel: 'Weather App' }}
      />
      <Drawer.Screen
        name="ScannerApp"
        component={ScannerNavigator}
        options={{
          drawerLabel: 'Scanner App',
          headerLeft: () => null, // This removes the button for the hidden drawer
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;