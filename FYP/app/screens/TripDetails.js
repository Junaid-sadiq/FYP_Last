import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

//import components
import * as List from "../components/List";

//import styles and assets
import styled from "styled-components";
import * as Typography from "../config/Typography";
import colors from "../config/colors";

//import data

const TripDetails = ({ route }) => {
  const trip = route.params;

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: Number(trip.latitude),
          longitude: Number(trip.longitude),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(trip.latitude),
            longitude: Number(trip.longitude),
          }}
        ></Marker>
      </MapView>
      <Main>
        <View style={{ marginBottom: 20 }}>
          <Typography.H3>{trip.title}</Typography.H3>
        </View>

        <HLine />
        <Checkin>
          <View>
            <Typography.Cap color={colors.gray}>check-in</Typography.Cap>
            <Typography.Sub1>{trip.check_in_date}</Typography.Sub1>
          </View>
          <View>
            <Typography.Cap color={colors.gray}>check out</Typography.Cap>
            <Typography.Sub1>{trip.check_out_date}</Typography.Sub1>
          </View>
        </Checkin>
        <HLine />
        <Reservation>
          <View>
            <Typography.Cap color={colors.gray} style={{ marginBottom: 6 }}>
              Reservation number
            </Typography.Cap>
            <Typography.Sub1>{trip.reservation}</Typography.Sub1>
          </View>
        </Reservation>
        <HLine />
        <Host>
          <List.UserList
            title="Hosted by Jinah Lee"
            subtitle="Member since: December 2018"
            // image={require("../assets/profile.jpg")}
          ></List.UserList>
        </Host>
        <HLine />
        <Rules>
          <View>
            <Typography.Cap color={colors.gray}>rule</Typography.Cap>
            <Typography.P>-Smoke free</Typography.P>
            <Typography.P>-No pets allowed</Typography.P>
            <Typography.P>-Self check-in / out</Typography.P>
            <Typography.P>-Take off your shoes inside</Typography.P>
            <Typography.P>-Keep place clean</Typography.P>
          </View>
        </Rules>
      </Main>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  padding: 24px;
`;

const Checkin = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px 20px 0;
`;
const HLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightgray};
`;

const Host = styled.View`
  margin: 10px 0;
`;

const Reservation = styled.View`
  padding: 20px 0;
`;

const Rules = styled.View`
  padding: 20px 0;
`;

const styles = StyleSheet.create({
  map: {
    height: 184,
  },
});

export default TripDetails;
