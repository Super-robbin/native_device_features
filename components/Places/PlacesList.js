import { FlatList, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";

import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
const navigation = useNavigation()

const selectPlaceHandler = (id) => {
  navigation.navigate('PlaceDetails', {
    placeId: id
  })
}

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
