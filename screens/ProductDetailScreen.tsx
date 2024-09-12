import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../hooks/types';

const ProductDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params as { product: Product };

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Remove the heart from the header completely
    navigation.setOptions({
      headerRight: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        const favoritesList = favorites ? JSON.parse(favorites) : [];
        const isFavorited = favoritesList.some((item: Product) => item.id === product.id);
        setIsFavorite(isFavorited);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavoriteStatus();
  }, [product]);

  const handleFavoriteToggle = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        const updatedFavorites = favoritesList.filter((item: Product) => item.id !== product.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
        Alert.alert('Removed from Favorites');
      } else {
        favoritesList.push(product);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
        setIsFavorite(true);
        Alert.alert('Added to Favorites');
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.productImage} />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}

      {/* Product Details */}
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.productRating}>Rating: {product.rating?.rate}</Text>
        <Text style={styles.productStock}>Stock: {product.stock || 'N/A'}</Text>
      </View>

      {/* Favorite Icon (inside screen) */}
      <TouchableOpacity onPress={handleFavoriteToggle}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? 'red' : 'black'}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>

      {/* Cosmetic Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  productRating: {
    fontSize: 16,
    fontWeight: '500',
  },
  productStock: {
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteIcon: {
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;