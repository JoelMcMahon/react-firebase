import React from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const SaveScreen = (props) => {
  const {
    route: {
      params: { image },
    },
  } = props;

  const uploadImage = async () => {
    const uri = image;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(`/users/${firebase.auth().currentUser.uid}/${Date.now()}`)
      .put(blob);
    console.log(firebase.auth().currentUser);
  };

  console.log(image);
  return (
    <View style={{ flex: 1, height: 300, width: "100%" }}>
      <Image
        source={{ uri: image }}
        style={{ flex: 1, height: 300, width: "100%" }}
      />
      <Button title="Save" onPress={uploadImage}></Button>
    </View>
  );
};

export default SaveScreen;

const styles = StyleSheet.create({});
