import { firebase, db } from "../firebase/config.js";
require("firebase/firestore");
require("firebase/firebase-storage");

export const uploadImage = async (image, setLoading) => {
  const uri = image;
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = `/users/${
    firebase.auth().currentUser.uid
  }/images/${Date.now()}`;

  setLoading(true);

  await firebase.storage().ref().child(imageRef).put(blob);

  await db
    .collection("images")
    .doc(firebase.auth().currentUser.uid)
    .set({ imageRef })
    .then((res) => {
      console.log(res);
    });

  setLoading(false);
};

export const uploadVideo = async (video) => {
  await firebase
    .storage()
    .ref()
    .child(`/users/${firebase.auth().currentUser.uid}/videos/${Date.now()}`);
};

export const onLoginPress = (email, password, setUser) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            alert("User does not exist anymore.");
            return;
          }
          const user = firestoreDocument.data();
          setUser(user);
          navigation.navigate("Home", { user });
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });
};
