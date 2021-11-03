import { firebase, db } from "../firebase/config.js";
require("firebase/firestore");
require("firebase/firebase-storage");

export const uploadItem = async (endpoint, item, setLoading, setItem) => {
  const uri = item;
  const response = await fetch(uri);
  const blob = await response.blob();
  console.log(uri);
  const location = `/users/${
    firebase.auth().currentUser.uid
  }/${endpoint}/${Date.now()}`;

  setLoading(true);

  await firebase.storage().ref().child(location).put(blob);

  const storageRef = firebase.storage().ref(location);

  const downloadURL = await storageRef.getDownloadURL();

  await db
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("posts")
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      caption: "it's a caption!",
      download: downloadURL,
    });

  console.log(firebase.auth().currentUser);

  await db.collection("allPosts").add({
    user: firebase.auth().currentUser.email,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    caption: "it's a caption!",
    download: downloadURL,
  });

  setLoading(false);
  setItem(null);
};

export const handleOnSignOut = (setUser) => {
  firebase
    .auth()
    .signOut()
    .then((response) => {
      setUser(null);
    })
    .catch((err) => {
      console.log(err);
    });
};
