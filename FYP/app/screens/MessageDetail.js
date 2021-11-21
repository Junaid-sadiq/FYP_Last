import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { db, auth } from "../../firebase";
import * as firebase from "firebase";

const MessageDetail = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    Keyboard.dismiss();

    if (input && input !== "\n") {
      db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.default.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
    }

    setInput("");

    scrollDownFunc();
  };

  const scrollDownDelayed = () => {
    setTimeout(function(){
      scrollDownFunc();
    }, 35);
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    scrollDownDelayed();

    return unsubscribe;
  }, [route]);

  const scrollDown = useRef();

  const scrollDownFunc = () => {
    scrollDown.current.scrollToEnd();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data?.photoURL ||
                "https://censur.es/wp-content/uploads/2019/03/default-avatar.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
    scrollDownFunc();
  }, [navigation, messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={85}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView ref={scrollDown}
              contentContainerStyle={{
                paddingTop: 15,
                flexDirection: "column-reverse",
              }}
            >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={30}
                      right={-5}
                      size={24}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      rounded
                      position="absolute"
                      top={-10}
                      left={-5}
                      size={24}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverName}>{data.displayName}</Text>
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Enter message"
                onSubmitEditing={sendMessage}
                onFocus={scrollDownDelayed}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 10,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 10,
  },
  recieverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 12,
    color: "white",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 10,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "white",
    fontWeight: "500",
  },
  senderText: {
    color: "black",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    borderWidth: 1,
    color: "grey",
    borderRadius: 30,
  },
});





/* import React, { useEffect, useState, useRef } from "react";

import {
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TextInput,
} from "react-native";
import io from "socket.io-client";
import moment from "moment";

//import components
import { MessageItem } from "../components/MessageItem";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import { Feather } from "@expo/vector-icons";

const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : -150;

const MessageDetail = () => {
  const [message, setMessage] = useState({
    user_id: 1,
    createdAt: new Date(),
    msg: "",
  });
  const [messageList, setMessageList] = useState([]);
  const socket = useRef(null);
  const flat = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.1.39:3001");
    socket.current.on("message", (message) => {
      setMessageList((prevState) => [...prevState, message]);
    });
  }, []);

  const handleChange = (text) => {
    let newMessage = { ...message };
    let date = moment().format("MMMM D YYYY, h:mm a");
    newMessage = { user_id: 1, createdAt: date, msg: text };
    setMessage(newMessage);
  };

  const sendMessage = () => {
    socket.current.emit("message", message);
    setMessageList((prevState) => [...prevState, message]);
    console.log(messageList);
    setMessage("");
    Keyboard.dismiss();
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <MessageArea>
          <FlatList
            ref={flat}
            onContentSizeChange={() =>
              flat.current.scrollToEnd({ animated: true })
            }
            onLayout={() => flat.current.scrollToEnd({ animated: true })}
            data={messageList}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => (
              <MessageItem
                id={item.user_id}
                title={item.createdAt}
                subtitle={item.msg}
              />
            )}
          />
        </MessageArea>

        <InputArea>
          <TextInput
            placeholder="Write a message"
            value={message.msg}
            onChangeText={(text) => handleChange(text)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Feather name="arrow-up-circle" size={20} />
          </TouchableOpacity>
        </InputArea>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const MessageArea = styled.View`
  background-color: lightslategray; 
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`;

const InputArea = styled.View`/* 
 background-color: darkturquoise; 
  width: 80%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
  border: 1px solid ${colors.lightgray};
  border-radius: 50px;
  padding: 0 20px;
  margin: 10px;
`;

export default MessageDetail;
 */