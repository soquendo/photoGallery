import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TextInput, Modal, TouchableOpacity, Animated } from 'react-native';
import PhotoCard from './PhotoCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from './PhotoGalleryStack';


interface ImageData {
  id: number;
  url: string;
}
//testing git
type PhotoListScreenNavigationProp = StackNavigationProp<StackParamList, "PhotoList">;

const imageData: ImageData[] = [];
for (let i = 1; i < 99; i++) {
  imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

const PhotoList: React.FC = () => {
  const navigation = useNavigation<PhotoListScreenNavigationProp>();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const filteredImages = searchTerm
    ? imageData.filter((image) => image.id.toString() === searchTerm.trim())
    : imageData;

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <FlatList
        contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}
        numColumns={3}
        data={filteredImages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(item.url);
              setModalVisible(true);
            }}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.url }} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={({ id }) => id.toString()}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 32,
  },
  searchInput: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

export default PhotoList;