import { firebase, db } from "../firebase/config.js";
require("firebase/firestore");
require("firebase/firebase-storage");

export const uploadItem = async (endpoint, item, setLoading, setItem) => {
  const uri = item;
  const response = await fetch(uri);
  const blob = await response.blob();

  const location = `/users/${
    firebase.auth().currentUser.uid
  }/${endpoint}/${Date.now()}`;

  setLoading(true);

  await firebase.storage().ref().child(location).put(blob);

  await db
    .collection(endpoint)
    .doc(firebase.auth().currentUser.uid)
    .set({ location })
    .then((res) => {
      console.log(res);
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
