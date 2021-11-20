import React from "react";

// import navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TripStack from "../navigation/TripStack";
import MessageStack from "../navigation/MessageStack";
import HostStack from "../navigation/HostStack";

// import screens
import Listings from "../screens/Listings";
import Accounts from "../screens/Accounts";

// import styles and assets
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../config/colors";

const Tab = createBottomTabNavigator();

const ListTab = () => (
  <Tab.Navigator
    tabBarOptions={{ activeTintColor: Colors.red }}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="search"
      component={Listings}
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
      component={Accounts}
      options={{
        tabBarIcon: ({ color, size }) => (
           <AntDesign name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default ListTab;
