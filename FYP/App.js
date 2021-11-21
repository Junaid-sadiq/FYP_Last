import React from "react";
import { StatusBar, Platform, LogBox } from "react-native";

import { Provider } from "react-redux";
import store from "./app/store/store";
import styled from "styled-components";
import PRoviders from "./app/navigation/PRoviders";
LogBox.ignoreAllLogs()


export default function App() {
  return (
    <Common>
      <Provider store={store}>
        <PRoviders/>
      </Provider>
    </Common>
  );
}

const Common = styled.SafeAreaView`
  ${Platform.select({
    ios: {
      fontFamily: "Avenir",
    },
    android: {
      fontFamily: "Roboto",
     /*  paddingTop: StatusBar.currentHeight, */
    },
  })}

  flex: 1;
`;
