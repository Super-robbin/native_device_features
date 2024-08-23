import { Alert, Button, View, Image, StyleSheet, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

// launchCameraAsync will launch the device camera and wait for us to take an image,
// we will then use it inside takeImageHandler. launchCameraAsync returns a Promise, so takeImageHandler must be async.
// We then pass an options object to it so we can configure it.

// IMPORTANT: On Android it asks automatically for permission. On iOS we have to manage it ourselves.
// We import useCameraPermissions hook and use it as below [cameraPermissionInformation, requestPermission].
// We check if cameraPermissionInformation.status === PermissionStatus.UNDETERMINED (don't know if we have permission yet
// and if no permission, we call await requestPermission() which will open the dialog.
// We then return permissionResponse.granted (true if permission has been granted).

// If (cameraPermissionInformation.status === PermissionStatus.DENIED), we show an alert and return false,
// and if don't make it in neither if statements, it means that we have the permission and hence, we return true.
// Finally, we call verifyPermissions inside takeImageHandler and check if (!hasPermission) we return,
// otherwise we just continue with takeImageHandler

// ImagePicker package better than Camera in this case because it needs little configuration
// and allows us to open the on device photos or on the launch the camera both as possible with this package.
const ImagePicker = ({onTakeImage}) => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    const imageUri = image.assets[0].uri;
    setPickedImage(imageUri);
    onTakeImage(imageUri)
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
