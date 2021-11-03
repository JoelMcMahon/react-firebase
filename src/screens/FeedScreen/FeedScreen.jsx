import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase/config";

const FeedScreen = () => {
  const pullData = async () => {
    await db.collection();
  };

  return (
    <View>
      <Text onPress={pullData}>Hey Hey</Text>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
