import React, { useEffect, useState, useLayoutEffect } from "react";

import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Text } from "react-native";

const Messages = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  /* const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
 */
  useEffect(() => {
    setLoading(true);
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    setLoading(true);
    navigation.setOptions({
      title: "Messages",
      headerStyle: { backgroundColor: "#2C6EBD" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity  activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: "row",
            width: 70,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
    setLoading(false);
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("MessageDetail", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    loading ? <ActivityIndicator size="large" color="gray" style={{ flex: 0.7 }}/> :
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
/* import React, { useState } from "react";
import { FlatList } from "react-native";

//import components
import * as List from "../components/List";
import DeleteItem from "../components/DeleteItem";

//import styles and assets
import styled from "styled-components";
import Colors from "../config/colors";
import { H } from "../config/Typography";

const initialMessages = [
  {
    id: 1,
    fromUser: "Yuni",
    description:
      "Hi Jinah, thank you for your interest in my house.  My house is available ",
    image:
      "https://a0.muscache.com/im/pictures/user/e326de82-07e9-4abc-aaed-80724957ab8e.jpg",
    dates: "May 10, 2020",
  },
  {
    id: 2,
    fromUser: "Yoonjin",
    description:
      "Hi Jinah, thank you for your interest in my house.  My house is available ",
    image:
      "https://a0.muscache.com/im/pictures/user/d7aabb16-b2d5-45a0-8d91-a7626f566d59.jpg",
    dates: "March 8, 2020",
  },
  {
    id: 3,
    fromUser: "Hami",
    description:
      "Hi Jinah, thank you for your interest in my house.  My house is available ",
    image:
      "https://a0.muscache.com/im/pictures/user/4771a2d4-9498-4891-96f5-af3b5473d2a4.jpg",
    dates: "January 20, 2020",
  },
];

const MessageScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefresing] = useState(false);

  const handleDelete = (message) => {
    const newMesages = messages.filter((m) => m.id !== message.id);
    setMessages(newMesages);
  };

  const handleNavigation = (item) => {
    console.log(item.fromUser);
    navigation.navigate("MessageDetail", item);
  };

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <Header>
            <H>message</H>
          </Header>
        }
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <List.UserList
            title={item.fromUser}
            secondary={item.description}
            image={item.image}
            meta={item.dates}
            onPress={() => handleNavigation(item)}
            RightActions={() => (
              <DeleteItem onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={() => <HLine />}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 45px 20px 0;
`;

const Header = styled.View`
  padding: 24px 0;
`;

const HLine = styled.View`
  width: 90%;
  margin: 0 auto;
  height: 1px;
  background-color: ${Colors.lightgray};
`;

export default MessageScreen;
 */