import { View, Text, Image, Pressable, StyleSheet } from "react-native";

const PlaceItem = ({ title, imageUri, address, location, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: imageUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({

})