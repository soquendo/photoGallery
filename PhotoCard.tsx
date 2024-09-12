import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { StackParamList } from './PhotoGalleryStack';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PhotoCardScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "PhotoCard"
>;
type PhotoCardScreenRouteProp = RouteProp<StackParamList, "PhotoCard">;

export function PhotoCard() {
  const navigation = useNavigation<PhotoCardScreenNavigationProp>();
  const { params } = useRoute<PhotoCardScreenRouteProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PhotoModal", { ID: params.ID, url: params.url });
        }}
      >
        <Image source={{ uri: params.url.toString() }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{params.url.toString()}</Text>
      <Text>
        RANDOMrandomRANDOMrandomRANDOMrandomRANDOMrandomRANDOMrandomRANDOMrandomRANDOMrandomRANDOM
      </Text>
    </View>
  );
}
//testing changes
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PhotoCard;
