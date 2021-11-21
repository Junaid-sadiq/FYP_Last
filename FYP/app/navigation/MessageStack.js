import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//import screens

import Messages from "../screens/Messages";
import MessageDetail from "../screens/MessageDetail";
import AddChat from '../screens/AddChat';

//import styles, icons
import styled from "styled-components";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#3B71FE" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

const MessageStack = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Message"
        component={Messages}
        /* options={{ headerShown: false }} */
      />
       <Stack.Screen
        name="AddChat"
        component={AddChat}
        /* options={{ headerShown: false }} */
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        /* options={({ route }) => ({ title: route.params.fromUser })} */
      />
    </Stack.Navigator>
  );
};

export default MessageStack;
