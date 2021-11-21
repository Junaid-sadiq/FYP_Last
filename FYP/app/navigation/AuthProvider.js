import React, { useState, createContext, useContext } from 'react';
import { auth, firebase, provider } from '../../firebase';
import * as Google from "expo-google-app-auth";
import { Alert } from 'react-native';


const Config = {
  androidClientId:
    "206929677529-9c2d7at4bu202ssgt53qkapfs4lvvpm6.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permussions: ["public_profile", "email", "gender", "location"],
};


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorState, setErrorState] = useState('');
  const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    // auth functions
     const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("Succesfully logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
    };
     const signOut = () => {
    auth
      .signOut()
      .catch((error) => alert(error.message));
    };
    const Register = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        
        
          firebase
          .firestore()
          .collection('users')
          .add({
            /* userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ['2'],
            followers: [],
            dateCreated: Date.now() */
            username: 'test User',
          });

        console.log(user.email);
        Alert.alert('Successfully Signed Up as ', user.email)
      })
      .catch((error) => alert(error.message));
  };
const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(Config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = provider.credential(
            idToken,
            accessToken
          );
          await auth.signInWithCredential(credential)
        }
        return Promise.reject();
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      signOut,
      signInWithGoogle,
      Register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
    return useContext(AuthContext)
}



/* 


  const handleLogin = values => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
  };
   const logout = () => {
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const handleSignup = async values => {
    const { email, password, username } = values;
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      () =>
        setErrorState(error.message)
    }
  }
     
  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(Config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential)
        }
        return Promise.reject();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
};
  */