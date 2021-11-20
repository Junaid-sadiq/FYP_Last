import React, { useContext, useEffect, useState } from "react";
import { Text, Alert } from "react-native";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//import components
import AppForm from "../components/forms/AppForm";
import * as TextInput from "../components/forms/AppInput";
import SubmitBtn from "../components/forms/SubmitBtn";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import { Formik, validateYupSchema } from "formik";
import { useFormik } from "formik";
import { auth, db } from "../../firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});


const Signup = ({ navigation }) => {
  /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeStack");
      }
    });
    return unsubscribe;
  }, []); */
  const Register = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        
          db
          .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    firstName: '',
                    lastname: '',
                    email: auth().currentUser.email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })

        console.log(user.email);
        Alert.alert('Successfully Signed Up as ', user.email)
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
            <Typography.H>Signup</Typography.H>
          </Header>
          <AppForm
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={(values) => Register(values.email, values.password)}
            validationSchema={validationSchema}
          >
            <Input>
              <Text>Name</Text>
              <TextInput.Default
                name="name"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                clearButtonMode="always"
                textContentType="name"
              />
            </Input>
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
            <SubmitBtn title="Signup" />
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

const Main = styled.ScrollView`
  padding: 26px;
`;

const Header = styled.Text`
  margin-bottom: 60px;
`;

const Input = styled.View`
  padding-bottom: 26px;
`;

export default Signup;
