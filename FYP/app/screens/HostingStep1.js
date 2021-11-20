import React from "react";
import { View } from "react-native";

//import components
import * as Button from "../components/Button";

//import styles and assets
import styled from "styled-components";
import * as Typography from "../config/Typography";
import colors from "../config/colors";

//import data
import { hostdata } from "../data/hostdata";

const HostingStep1 = ({ navigation }) => {
  return (
    <Container>
      <Main>
        <Top>
          <Header>
            <Typography.H color={colors.red}>
              Register your accommodation
            </Typography.H>
            <View style={{ marginTop: 14, marginBottom: 20 }}>
              <Typography.P colors={colors.gray}>
                From one spare room to a villa, you can register various types
                of space for free, Share it.
              </Typography.P>
            </View>
            <BtnContainer>
              <Button.BtnContain
                label="registration"
                color={colors.red}
                onPress={() => navigation.navigate("Hosting")}
              />
            </BtnContainer>
          </Header>
        </Top>
        <HostStory>
          <Card elevation={5}>
            <ImageContainer>
              <MainImage
                source={{
                  uri: "https://a0.muscache.com/pictures/9d977b2b-f66f-4028-a9c6-b997cb331892.jpg",
                }}
              />
            </ImageContainer>
            <TextContainer>
              <View style={{ marginBottom: 8 }}>
                <Typography.H3>Hear from your host</Typography.H3>
              </View>

              <Typography.P colors={colors.gray}>
                Sara is a Karachi city host who wants to share her home with
                others.
              </Typography.P>
            </TextContainer>
          </Card>
        </HostStory>
      </Main>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 45px;
`;

const Main = styled.ScrollView``;

const Top = styled.View`
  flex: 1;
  padding: 24px;
`;

const HostStory = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: white;
`;

const Card = styled.View`
  background-color: #ffffff;
  height: 260px;
  border-radius: 12px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.08);
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 140px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  padding: 20px;
`;

const Header = styled.View`
  margin-bottom: 40px;
`;

const BtnContainer = styled.View`
  width: 50%;
`;

export default HostingStep1;
