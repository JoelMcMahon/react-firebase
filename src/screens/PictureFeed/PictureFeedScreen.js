import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function MediaPicker({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pictureTaken, setPictureTaken] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      // const galleryStatus =
      //   await Image.Picker.requestMediaLibraryPermissionsAsync();
      // setHasGalleryPermission(galleryStatus.status === "granted");
      // console.log(galleryStatus);
    })();
  }, []);

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

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleTakePicturePress = () => {
    if (camera) {
      camera
        .takePictureAsync(null)
        .then((response) => {
          setImage(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveImage = () => {
    navigation.navigate("SaveScreen", { image });
  };

  return (
    <View style={{ flex: 1 }}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.savedImage} />
          <Button title="Save" onPress={saveImage} />
        </>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
            ref={(ref) => setCamera(ref)}
          />
        </View>
      )}
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
    </View>
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
