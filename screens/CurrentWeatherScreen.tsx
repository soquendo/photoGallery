import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useFetch from '../hooks/useFetch';
import { ForecastWeatherData } from '../hooks/types';
import { RootStackParamList } from '../hooks/types';

// Ensure correct navigation type for CurrentWeatherScreen
type CurrentWeatherScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CurrentWeatherScreen'
>;

const API_KEY = '0f786ea5d6f0488586091107242808';
const BASE_URL = 'http://api.weatherapi.com/v1';

const CurrentWeatherScreen: React.FC = () => {
  const navigation = useNavigation<CurrentWeatherScreenNavigationProp>();
  const { data, loading, error } = useFetch<ForecastWeatherData>(
    `${BASE_URL}/current.json?key=${API_KEY}&q=Providence`
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Current Weather</Text>
      <Text style={styles.locationText}>
        {`${data?.location.name}, ${data?.location.region}`}
      </Text>
      <Image
        source={{ uri: `https:${data?.current.condition.icon}` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.tempText}>{`${data?.current.temp_f}°F`}</Text>
      <Text style={styles.conditionText}>{data?.current.condition.text}</Text>
      <Text style={styles.feelsLikeText}>
        {`Feels like: ${data?.current.feelslike_f}°F`}
      </Text>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('ForecastScreen')}
      >
        <Text style={styles.navButtonText}>View Forecast</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 18,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  tempText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  conditionText: {
    fontSize: 18,
  },
  feelsLikeText: {
    fontSize: 16,
    marginTop: 10,
  },
  navButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0000ff',
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CurrentWeatherScreen;