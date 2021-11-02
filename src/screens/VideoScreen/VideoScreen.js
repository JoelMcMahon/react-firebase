import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { cameraPermissions } from "../../hooks/CameraPermissions";
import { Video } from "expo-av";
import { uploadVideo } from "../../utils/dbinteract";

const VideoScreen = () => {
  const video = React.useRef(null);
  const {
    type,
    setType,
    setCamera,
    camera,
    handleTakeVideoPress,
    isRecording,
    image,
  } = cameraPermissions();

  const takeVideo = () => {
    return (
      <>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.fixedRatio}
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
        <Button
          title={isRecording ? "Stop Recording" : "Take Video"}
          onPress={handleTakeVideoPress}
        ></Button>
      </>
    );
  };

  const showVideo = () => {
    return (
      <View style={styles.cameraContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: image }}
          useNativeControls
          isLooping
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Button
          title="upload image"
          onPress={() => {
            uploadVideo(image);
          }}
        ></Button>
      </View>
    );
  };

  return image ? showVideo() : takeVideo();
};

export default VideoScreen;

const styles = StyleSheet.create({
  video: {
    flex: 1,
    backgroundColor: "black",
  },

  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});
