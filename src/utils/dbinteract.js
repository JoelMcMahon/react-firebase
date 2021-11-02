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
  const uri = video;
  const response = await fetch(uri);
  const blob = await response.blob();

  const videoRef = `/users/${
    firebase.auth().currentUser.uid
  }/videos/${Date.now()}`;

  await firebase.storage().ref().child(videoRef).put(blob);

  await db
    .collection("videos")
    .doc(firebase.auth().currentUser.uid)
    .set({ videoRef })
    .then((res) => {
      console.log(res);
    });
};
