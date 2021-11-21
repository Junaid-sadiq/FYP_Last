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
import { auth, db, firebase } from "../../firebase";
import { useAuth } from "../navigation/AuthProvider";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});


const Signup = () => {
  const { Register } = useAuth();
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
            onSubmit={(values) => Register(values)}
            validationSchema={validationSchema}
          > {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur
          }) => (
            <>
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
            </>
          )}
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
