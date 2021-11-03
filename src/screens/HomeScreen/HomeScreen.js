import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { handleOnSignOut } from "../../utils/dbinteract";
import styles from "./styles";

export default function HomeScreen({ setUser, navigation }) {
  const navButton = (title) => {
    return (
      <TouchableOpacity
        title={title}
        onPress={() => {
          navigation.navigate(title);
        }}
        style={styles.navButton}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleOnSignOut(setUser);
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navCont}>
        {navButton("Pictures")}
        {navButton("FeedScreen")}
        {navButton("VideoScreen")}
      </View>
    </View>
  );
}
