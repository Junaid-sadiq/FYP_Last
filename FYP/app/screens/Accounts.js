import React from "react";
import {
  View,
  FlatList,
  Text,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import * as List from "../components/List";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import { Cap } from "../config/Typography";
//auth
import { auth } from "../../firebase";
import { useAuth } from "../navigation/AuthProvider";
const AccountItems = [
   {
    title: "hosting",
    data: [
      { title: "Switch to hosted mode", icon: "refresh", screen: "Hosting" },
      { title: "Register your accommodation", icon: "plus", screen: "Hosting" },
    ],
  },
  {
    title: "Account management",
    data: [
      { title: "Edit Profile", icon: "user", screen: "EditProfile" },
      { title: "notice", icon: "bell", screen: "Hosting" },
      {
        title: "Payment and payment receipt",
        icon: "credit-card",
        screen: "Hosting",
      },
    ],
  },
 
  {
    title: "Help",
    data: [{ title: "How to use Realtor", icon: "question", screen: "Hosting" }],
  },
];

const Accounts = ({navigation}) => {
 const {signOut} = useAuth()
 let uri =  auth.currentUser?.photoURL
  return (
    <Container>
      <SectionList
        contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 20 }}
        ListHeaderComponent={
          <List.UserList
            title={auth.currentUser?.email}
            subtitle="View Profile"
            image={ uri }

          />
        }
        sections={AccountItems}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Cap color={colors.gray}>{title}</Cap>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <List.Default
            title={item.title}
            icon={item.icon}
            iconcolor={colors.darkgray}
            onPress={() => console.log("selected", item)}
             onPress={() => navigation.navigate(`${item.screen}`)}
          />
        )}
        ItemSeparatorComponent={() => <HLine />}
        ListFooterComponent={() => (
          <TouchableOpacity onPress={signOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 20px;
`;

const HLine = styled.View`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: ${colors.lightgray};
`;

export default Accounts;
