import React from "react";
import { View } from "react-native";

//import styles and assets
import styled from "styled-components";
import { EvilIcons } from "@expo/vector-icons";
import Colors from "../config/colors";
import * as Typography from "../config/Typography";

export const SuperClean = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="spinner" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>Cleanliness Enhancement</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            This host has been developed in collaboration with leading experts
            in the public health and hospitality industry. Comply with strict
            cleanliness enhancement standards.
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

export const SelfCheckin = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="unlock" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>self check-in</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            Check in using the keypad
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

export const Clean = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="like" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>clean and tidy accommodation</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            13 recent guests reviewed this property as spotlessly clean
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

export const SuperHost = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="trophy" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>you are a superhost</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            Superhosts boast a wealth of experience and high ratings, allowing
            guests to stay at their property. Hosts who do their best to make
            your stay comfortable.
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

export const Location = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="location" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>great accommodation location</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            94% of recent guests rated the location 5-star.
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

export const FreeCancellation = () => {
  return (
    <View>
      <Highlight>
        <EvilIcons name="calendar" size={34} color={Colors.black} />
        <HglText>
          <Typography.Sub1>Free cancellation until July 29th</Typography.Sub1>
          <Typography.P colors={Colors.gray}>
            After that, if the reservation is canceled before 3:00 PM on August
            7th, the service fee is excluded. All fees will be refunded.
          </Typography.P>
        </HglText>
      </Highlight>
    </View>
  );
};

const Highlight = styled.View`
  flex-direction: row;
  margin: 10px 0;
`;

const HglText = styled.View`
  flex-shrink: 1;
  margin-left: 10px;
`;
