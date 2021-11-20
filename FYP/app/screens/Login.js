import React, { useEffect } from "react";
import { Alert, Text } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import components
import AppForm from "../components/forms/AppForm";
import * as TextInput from "../components/forms/AppInput";
import SubmitBtn from "../components/forms/SubmitBtn";

//import styles and assets
import styled from "styled-components";
import * as Typography from "../config/Typography";
//auth
import { auth } from "../../firebase";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const Login = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeStack");
      }
    });
    return unsubscribe;
  }, []);
  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("Succesfully logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Container>
       <KeyboardAwareScrollView enableOnAndroid={true}
        style={{ flex: 1 }}
      >
      <Main>
        <Header>
          <Typography.H>Login</Typography.H>
        </Header>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => login(values.email, values.password)}
          validationSchema={validationSchema}
        >
          <Input>
            <Text>Email</Text>
            <TextInput.Default
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              clearButtonMode="always"
              textContentType="emailAddress"
            />
          </Input>
          <Input>
            <Text>Password</Text>
            <TextInput.Pw
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
          </Input>
          <SubmitBtn title="Login" />
        </AppForm>
      </Main>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  padding: 26px;
`;

const Header = styled.View`
  margin-bottom: 60px;
`;

const Input = styled.View`
  padding-bottom: 26px;
`;

export default Login;
