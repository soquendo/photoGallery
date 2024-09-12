import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoList from './PhotoList';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';

export type StackParamList = {
  PhotoList: undefined;
  PhotoCard: { ID: number; url: string };
  PhotoModal: { ID: number; url: string };
};

const Stack = createStackNavigator<StackParamList>();

const PhotoGalleryStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="PhotoList"
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },       // Custom style for the header
      headerTitleStyle: { fontSize: 24, fontWeight: 'bold' }, // Header text styling
    }}
  >
    {/* PhotoList Screen */}
    <Stack.Screen
      name="PhotoList"
      component={PhotoList}
      options={{
        headerShown: false,   // Ensure the header is shown
        headerTitle: 'Photo Gallery', // Title for the PhotoList screen
      }}
    />

    {/* PhotoCard Screen */}
    <Stack.Screen
      name="PhotoCard"
      component={PhotoCard}
      options={({ route }) => ({
        title: route.params.url.toString(),  // Use the photo URL as the title
      })}
    />

    {/* PhotoModal Screen */}
    <Stack.Screen
      name="PhotoModal"
      component={PhotoModal}
      options={{
        presentation: 'modal',  // Modal presentation
        headerShown: false,     // Hide the header for modal
      }}
    />
  </Stack.Navigator>
);

export default PhotoGalleryStack;