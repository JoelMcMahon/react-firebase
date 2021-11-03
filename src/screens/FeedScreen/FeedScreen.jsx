import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase/config";

const FeedScreen = () => {
  const pullData = async () => {
    // await db.collection("allPosts").onSnapshot((snapshot) => {
    //   console.log(snapshot);
    // });

    await db
      .collection("allPosts")

      .then((doc) => {
        console.log(doc.exists);
      });
    // console.log(Object.keys(doc));
    // const data = await doc.data();
    // console.log(data);
  };

  return (
    <View>
      <Text onPress={pullData}>Hey Hey</Text>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
