import React, { useState } from "react";
import { Dimensions, FlatList, Modal, View } from "react-native";

//import components
import { NavBar } from "../components/NavBar";
import * as Button from "../components/Button";
import SliderView from "../patterns/SliderView";

//import screens
import ListMap from "../screens/ListMap";

//import styles and assets
import styled from "styled-components";
import * as Typography from "../config/Typography";

import { rooms } from "../data/testdata";

//import redux
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const filteroptions = [
  { label: "heating", value: "heating" },
  { label: "Wireless Internet", value: "Wireless Internet" },
  { label: "air conditioner", value: "air conditioner" },
  { label: "hair dryer", value: "hair dryer" },
  { label: "shampoo", value: "shampoo" },
];

const { width, height } = Dimensions.get("window");

const Listings = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <Body>
      <NavBar nav="chevron-left" />
      <Main>
        <FlatList
          ListHeaderComponent={
            <Header>
              <View>
                <Typography.SP>300+ properties</Typography.SP>
                <Typography.H1>
                Accommodations in {props.state.city}
                </Typography.H1>
              </View>
              <TouchableOpacity>
                <BtnContainer>
                  <Filter source={require("../assets/filter.png")}></Filter>
                </BtnContainer>
              </TouchableOpacity>
            </Header>
          }
          data={rooms}
          keyExtractor={(room) => room.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SliderView
              images={item.images}
              title={item.title}
              subtitle={item.price}
              rating={item.rating}
              reviews={item.reviews}
              onPress={() => props.navigation.navigate("Details", item)}
              // onPress={console.log("detail")}
            />
          )}
        ></FlatList>
        <MapBtnWrapper>
          <Button.FloatingButton
            iconName="map-o"
            label="map"
            onPress={() => props.navigation.navigate("ListMap", rooms)}
          />
        </MapBtnWrapper>
        <Modal visible={showMap} animationType="slide">
          <ListMap
            rooms={rooms}
            closeBtn={() => setShowMap(false)}
            // showListing={() => props.navigation.navigate("Details", item)}
          />
        </Modal>
      </Main>
    </Body>
  );
};

const Body = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 30px 0;
`;

const Filter = styled.Image`
  width: 20px;
  height: 100%;
  resize-mode: contain;
  /* margin: 10px 0; */
`;

const BtnContainer = styled.View`
  width: 20px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const MapBtnWrapper = styled.View`
  width: 20%;
  align-self: center;
  position: absolute;
  bottom: 20px;
`;

const CloseBtn = styled.View`
  width: 50px;
  height: 50px;
  background-color: black;
  position: absolute;
  top: 20px;
  align-self: center;
`;

const mapStateToProps = (state) => {
  return {
    state: state.search,
  };
};

export default connect(mapStateToProps)(Listings);
