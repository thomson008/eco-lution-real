import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';
export var USER_KEY;

const firebaseConfig = {
    apiKey:"AIzaSyB7LRNCqhyGMrOFPwJHRSKJVFnrCI4jNh8",
    authDomain: "ecolution-84527.firebaseapp.com",
    databaseURL: "ecolution-84527.firebaseio.com",
    storageBucket: "ecolution-84527.appspot.com",
    messagingSenderId: "570895753766"
 };

export const onSignIn = (email, password) => {
    console.log(email)
    let USER_KEY = email
    AsyncStorage.setItem(USER_KEY, "true")
    try {

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)

      })
    }
    catch (error) {
      console.log(error.toString())
    }
  }


export const onSignUp = (email, password) => {
    try {

        if (this.state.password.length < 6) {
          alert("Please enter atleast 6 characters")
          return;
        }
  
        firebase.auth().createUserWithEmailAndPassword(email, password)
        AsyncStorage.setItem(email, "true")

      }
      catch (error) {
        console.log(error.toString())
      }
    }

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};