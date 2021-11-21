import React, { useEffect } from "react";

//import components
import * as Button from "../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

import { useAuth } from "../navigation/AuthProvider";
const WelcomeScreen = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();
  return (
    <Container>
      <Main>
        <Header>
          <Logo source={require("../assets/splash.png")}></Logo>
          <Typography.H1 color={colors.red}>Welcome to Realtor</Typography.H1>
        </Header>
        <Options>
          <Btn>
            <Button.BtnContain
              label="Continue with Google"
              color={colors.red}
              labelcolor="white"
              onPress={() => signInWithGoogle()}
            />
          </Btn>
          <Btn>
            <Button.BtnOutline
              label="Create Account"
              color={colors.red}
              labelcolor={colors.red}
              fontSize={13}
              onPress={() => navigation.navigate("Signup")}
            />
          </Btn>
          <Btn>
            <Center>
              <Button.BtnText
                label="Login"
                color={colors.red}
                onPress={() => navigation.navigate("Login")}
              />
            </Center>
          </Btn>
        </Options>
        <Terms>
          <Typography.P color={colors.gray}>
            By tapping Continue, Create Account or More options, I agree to
            Realtor's Terms of Service and Privacy Policy
          </Typography.P>
        </Terms>
      </Main>
    </Container>
  );
};

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

const Main = styled.View`
  padding: 30px;
`;

const Header = styled.View`
  padding-top: 60px;
`;

const Logo = styled.Image`
  width: 180px;
  height: 180px;
  resize-mode: contain;
  margin: 10px 0;
`;

const Options = styled.View`
  margin: 30px 0;
`;

const Btn = styled.View`
  margin: 10px 0;
  display: flex;
`;

const Center = styled.View`
  margin: 0 auto;
`;

const Terms = styled.View`
  margin-top: 20px;
`;

export default WelcomeScreen;
