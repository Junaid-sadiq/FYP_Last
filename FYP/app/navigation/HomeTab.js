import React from "react";

//import navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TripStack from "./TripStack";
import HostStack from "./HostStack";
import AccountStack from "./AccountStack";

//import screens
import Home from "../screens/Home";
import MessageStack from "../navigation/MessageStack";

//import styles and assets
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeTab = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Explore"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="search1" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Travel"
      component={TripStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="navigate-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="host"
      component={HostStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-add-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="message"
      component={MessageStack}
      options={{
        tabBarIcon: ({ color, size }) => (
           <AntDesign name="message1" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="profile"
      component={AccountStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default HomeTab;
