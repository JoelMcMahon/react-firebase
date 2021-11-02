import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { cameraPermissions } from "../../hooks/CameraPermissions";
import { uploadItem } from "../../utils/dbinteract";

export default function MediaPicker() {
  const {
    hasCameraPermission,
    setCamera,
    image,
    setImage,
    type,
    setType,
    handleTakePicturePress,
  } = cameraPermissions();

  const [loading, setLoading] = useState(false);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    return (
      <>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.savedImage}
            type={type}
            ratio={"1:1"}
            ref={(ref) => setCamera(ref)}
          />
        </View>
        <Button
          title={"Flip"}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        ></Button>
        <Button title="Take Picture" onPress={handleTakePicturePress}></Button>
        <Button title="Add Photo From Gallery" onPress={pickMedia}></Button>
      </>
    );
  };

  const savePicture = () => {
    return (
      <>
        <Image source={{ uri: image }} style={styles.savedImage} />
        <Button
          title={loading ? "Uploading image.." : "Upload image"}
          onPress={() => {
            uploadItem("images", image, setLoading, setImage);
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>{image ? savePicture() : takePicture()}</View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  savedImage: {
    flex: 1,
    width: "100%",
  },
});
