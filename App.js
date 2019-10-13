// import App from "./app/index";
// export default App;

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, AppRegistry} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import Home from './app/screens/Home';
import LoginScreen from './app/screens/LoginScreen';
import Profile from './app/screens/Profile';
import {createStackNavigator} from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {SignedOut, SignedIn} from './app/router';
import SignedInComponent from './app/router';
console.disableYellowBox = true


const firebaseConfig = {
    apiKey:"AIzaSyB7LRNCqhyGMrOFPwJHRSKJVFnrCI4jNh8",
    authDomain: "ecolution-84527.firebaseapp.com",
    databaseURL: "ecolution-84527.firebaseio.com",
    storageBucket: "ecolution-84527.appspot.com",
    messagingSenderId: "570895753766"
 };

 firebase.initializeApp(firebaseConfig);

 export const MainNavigator = createStackNavigator({
    LoginScreen: { screen: () => <LoginScreen/> },
    SignedInComponent: {screen: SignedInComponent},
    Home: {screen: Home},
  });
  
const App = createAppContainer(MainNavigator);

export default App;

// export default class App extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = ({
//       email: 'edon.aliko@gmail.com',
//       password: '123456'
//     })
//   }

//   signUpUser = (email, password) => {

//     try {

//       if (this.state.password.length < 6) {
//         alert("Please enter atleast 6 characters")
//         return;
//       }

//       firebase.auth().createUserWithEmailAndPassword(email, password)
//     }
//     catch (error) {
//       console.log(error.toString())
//     }
//   }

//   loginUser = (email, password) => {

//     try {

//       firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
//         console.log(user)
//         this.props.navigator.push({
//             component: Home
//         })
//       })
//     }
//     catch (error) {
//       console.log(error.toString())
//     }
//   }


//   render() {
//     return (
//       <Container style={styles.container}>
//         <Form>
//           <Item floatingLabel>
//             <Label>Email</Label>
//             <Input
//               autoCorrect={false}
//               autoCapitalize="none"
//               onChangeText={(email) => this.setState({ email })}
//             />

//           </Item>

//           <Item floatingLabel>
//             <Label>Password</Label>
//             <Input
//               secureTextEntry={true}
//               autoCorrect={false}
//               autoCapitalize="none"
//               onChangeText={(password) => this.setState({ password })}
//             />
//           </Item>

//           <Button style={{ marginTop: 10 }}
//             full
//             rounded
//             success
//             onPress={() => this.loginUser(this.state.email, this.state.password)}
//           >
//             <Text style={{ color: 'white' }}> Login</Text>
//           </Button>

//           <Button style={{ marginTop: 10 }}
//             full
//             rounded
//             primary
//             onPress={() => this.signUpUser(this.state.email, this.state.password)}
//           >
//             <Text style={{ color: 'white' }}> Sign Up</Text>
//           </Button>
//         </Form>
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 10
//   },
// });