import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, TouchableWithoutFeedback } from "react-native";
import { StackParamList } from "./PhotoGalleryStack";
import { RouteProp, useRoute, useNavigation, StackActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type PhotoModalScreenNavigationProp = StackNavigationProp<StackParamList, "PhotoModal">;
type PhotoModalScreenRouteProp = RouteProp<StackParamList, "PhotoModal">;

export function PhotoModal() {
  const navigation = useNavigation<PhotoModalScreenNavigationProp>();
  const { params } = useRoute<PhotoModalScreenRouteProp>();

  const closeAndNavigate = () => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      navigation.navigate("PhotoCard", {
        ID: params.ID,
        url: params.url,
      });
      unsubscribe();
    });
    navigation.dispatch(StackActions.pop(1));
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={closeAndNavigate}>
        <View style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✖</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: params.url }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 30,
  },
});

export default PhotoModal;