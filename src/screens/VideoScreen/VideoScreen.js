import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { cameraPermissions } from "../../hooks/CameraPermissions";
import { Video } from "expo-av";

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

  const showVideo = () => {
    return (
      <View style={styles.cameraContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: image }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    );
  };

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

  return image ? showVideo() : takeVideo();
};

export default VideoScreen;

const styles = StyleSheet.create({
  video: {
    flex: 1,
    height: 300,
    width: 300,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
