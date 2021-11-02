import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

export const cameraPermissions = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      await Audio.requestPermissionsAsync();
    })();
  }, []);

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

  const handleTakeVideoPress = () => {
    if (!isRecording) {
      setIsRecording(true);
      camera.recordAsync().then((res) => {
        setImage(res.uri);
      });
    } else {
      setIsRecording(false);
      camera.stopRecording();
    }
  };

  return {
    hasCameraPermission,
    setCamera,
    image,
    setImage,
    type,
    setType,
    handleTakePicturePress,
    handleTakeVideoPress,
    isRecording,
  };
};
