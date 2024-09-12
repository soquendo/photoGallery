import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import ForecastScreen from './screens/ForecastScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const WeatherApp: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="CurrentWeather"
      screenOptions={{
        headerShown: false,  // This hides the header for the entire WeatherApp stack
      }}
    >
      <Stack.Screen 
        name="CurrentWeather" 
        component={CurrentWeatherScreen} 
        options={{ headerTitle: "Current Weather" }} // Keep the title for this screen
      />
      <Stack.Screen 
        name="Forecast" 
        component={ForecastScreen} 
        options={{ headerTitle: "Forecast" }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default WeatherApp;