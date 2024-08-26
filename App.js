import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";

import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

// IMPORTANT: To be able to use navigation inside the AllPlaces screen from here (App),
// we need to create options below as a function that receives an object.
// This way we are able to pass navigation inside options and have it available for the onPress

// init() - We initialise the database as soon as the App componenent is rendered
export default function App() {
  const [dbInitialised, setDbInitialised] = useState(dalse);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialised(true);
        // Hide the splash screen after the database is initialized
        SplashScreen.hideAsync();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialised) {
    return null; // Keep the splash screen visible while loading
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
