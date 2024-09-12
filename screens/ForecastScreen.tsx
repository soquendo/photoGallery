import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import useFetch from '../hooks/useFetch';
import { useNavigation } from '@react-navigation/native';
import { ForecastWeatherData } from '../hooks/types';

const API_KEY = '0f786ea5d6f0488586091107242808';
const BASE_URL = 'http://api.weatherapi.com/v1';

const ForecastScreen: React.FC = () => {
  const { data, loading, error } = useFetch<ForecastWeatherData>(`${BASE_URL}/forecast.json?key=${API_KEY}&q=Providence&days=7`);
  const navigation = useNavigation();

  // Log full data to check what is being returned by the API
  useEffect(() => {
    if (data) {
      console.log('Full API Data:', data);
    }
  }, [data]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  // Remove the slice and render all forecast days returned by the API
  const forecastData = data?.forecast?.forecastday || [];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forecast for Your Location</Text>
      {forecastData.map((day) => (
        <View key={day.date} style={styles.forecastItem}>
          <Text>{day.date}</Text>
          <Image source={{ uri: `https:${day.day.condition.icon}` }} style={styles.forecastIcon} />
          <Text>{`High: ${day.day.maxtemp_f}°F | Low: ${day.day.mintemp_f}°F`}</Text>
          <Text>{day.day.condition.text}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Back to Current Weather</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  navButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForecastScreen;