import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import ForecastScreen from '../screens/ForecastScreen';

const Stack = createStackNavigator();

const WeatherNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="CurrentWeather">
    <Stack.Screen 
      name="CurrentWeatherScreen" 
      component={CurrentWeatherScreen} 
      options={{ title: 'Current Weather' }} 
    />
    <Stack.Screen 
      name="ForecastScreen" 
      component={ForecastScreen} 
      options={{ title: 'Forecast for Your Location' }} 
    />
  </Stack.Navigator>
);

export default WeatherNavigator;