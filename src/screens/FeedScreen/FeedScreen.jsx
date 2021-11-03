import React from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { db } from "../../firebase/config";

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const getPosts = async () => { await db.collection("allPosts").onSnapshot((snapshot) => {
        let allPosts = [];
        snapshot.forEach((doc) => {
          allPosts.unshift(doc.data());
        });
        setPosts(allPosts);}
       
    
    , []);
  });

  

  return (
    <View>
      {/* <Text onPress={pullData}>Hey Hey</Text> */}
      <SectionList
        sections={posts}
        renderItem={(post) => <Text>{post.caption}</Text>}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
