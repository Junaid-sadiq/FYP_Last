import React, { useEffect } from "react";

//import components
import * as Button from "../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import * as Google from "expo-google-app-auth";

import { auth } from "../../firebase";
import firebase from "firebase";
const WelcomeScreen = ({ navigation }) => {
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  function onSignIn(googleUser) {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function () {
            console.log("user signed in");
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  }
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const checkIfLoggedIn = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("user added");
      } else {
        console.log("user not added");
      }
    });
  };

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "206929677529-e8d5pnnrusledmej69j8uu1r1n2scpm4.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
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
              onPress={() => signInWithGoogleAsync()}
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
