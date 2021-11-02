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
  const metadata = { contentType: "video/mp4", contentDisposition: "" };

  setLoading(true);

  await firebase.storage().ref().child(location).put(blob, metadata);

  await db
    .collection(endpoint)
    .doc(firebase.auth().currentUser.uid)
    .set({ location: [location] }, { merge: true })
    .then((res) => {
      console.log(res, "<<<<");
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
