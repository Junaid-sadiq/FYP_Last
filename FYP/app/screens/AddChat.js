import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Input, Button } from "react-native-elements";

import { db } from "../../firebase";
import colors from "../config/colors";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "MessageDetail",
    });
  }, [navigation]);

  const createChat = async () => {
      await db.collection('chats').add({
          chatName: input,
      }).then(() => {
          navigation.goBack();
      }).catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a name for the chat"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="md-chatbox-ellipses" type="ionicon" size={24} color="black" />
         
        }
      />
      <Button onPress={createChat} style={{color: '#3B71FE'}} title="Create chat"/>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
      padding: 30,
      height: "100%",
  }
});
