import React from "react";
import PhotoList from "./PhotoList";
import { NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { PhotoCard } from "./PhotoCard";
import PhotoModal from "./PhotoModal";

export type StackParamList = {
  PhotoList: undefined;
  PhotoCard: { ID: number; url: String };
  PhotoModal: { ID: number; url: String };
};

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhotoList">
        <Stack.Screen
          name="PhotoList"
          component={PhotoList}
          options={{ headerTitle: "Photo Gallery" }}
        />
        <Stack.Screen
          name="PhotoCard"
          component={PhotoCard}
          options={({ route }) => ({
            title: route.params.url.toString(),
          })}
        />
        <Stack.Screen
          name="PhotoModal"
          component={PhotoModal}
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;