import React from "react";
import { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { uploadImage } from "../../utils/dbinteract";

const SaveScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const {
    params: { image },
  } = route;

  return (
    <View style={{ flex: 1, height: 300, width: "100%" }}>
      <Image
        source={{ uri: image }}
        style={{ flex: 1, height: 300, width: "100%" }}
      />
      <Button
        title={loading ? "Uploading.." : "Save photo"}
        onPress={() => {
          uploadImage(image, setLoading);
        }}
      ></Button>
    </View>
  );
};

export default SaveScreen;
