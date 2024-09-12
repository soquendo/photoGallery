import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../hooks/types';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';

const ScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ScannerScreen'>>();

  useEffect(() => {
    // Set header options to include the Favorites link on the right side
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
          <Text style={styles.favoritesLink}>Favorites</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setLoading(true);
    setError(null);

    console.log('Scanned data:', data);

    const matches = data.match(/products\/(\d+)/);
    const productId = matches ? matches[1] : data;

    if (!productId || !productId.match(/^\d+$/)) {
      setError('Invalid QR code scanned');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      navigation.navigate('ProductDetail', { product });
    } catch (err: any) {
      setError(`Failed to fetch product details: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && !loading && !error && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesLink: {
    color: 'blue',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
});

export default ScannerScreen;