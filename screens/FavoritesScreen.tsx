import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for the trash icon
import { useNavigation } from '@react-navigation/native';
import { Product } from '../hooks/types';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        const parsedFavorites = favoritesData ? JSON.parse(favoritesData) : [];
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveItem = async (id: number) => {
    // Confirm removal
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this item from your favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedFavorites = favorites.filter((item) => item.id !== id);
              setFavorites(updatedFavorites);
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            } catch (error) {
              console.error('Error removing item:', error);
            }
          },
        },
      ]
    );
  };

  const renderFavoriteItem = ({ item }: { item: Product }) => {
    const productImage = item.images && item.images.length > 0 ? item.images[0] : null;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })} style={styles.itemContent}>
          {productImage ? (
            <Image source={{ uri: productImage }} style={styles.productImage} />
          ) : (
            <Text>No image available</Text>
          )}
          <View style={styles.productDetails}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productTitle}>
              {item.title}
            </Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>

        {/* Trash Icon to remove the item */}
        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.trashIcon}>
          <Ionicons name="trash-outline" size={28} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
        />
      ) : (
        <Text>No favorites added</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  productDetails: {
    justifyContent: 'center',
    flex: 1, // This will allow the text to take up available space
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1, // Ensures the text doesn't overflow into the icon space
    marginRight: 10, // Adds space between text and trash icon
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  trashIcon: {
    marginLeft: 10,
  },
});

export default FavoritesScreen;