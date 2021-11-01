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

  return (
    <>
      {image ? (
      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: image }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      )
      : (
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
      )
      </>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
