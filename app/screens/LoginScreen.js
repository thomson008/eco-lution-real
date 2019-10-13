import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, ImageBackground, Image, KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import {createAppContainer, withNavigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { SignedIn } from '../router';
import SignedInComponent from '../router';
import bgimage from './forest.jpg'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
    },

    backgroundImage: {
      flex: 1,
      justifyContent: "center",

      //resizeMode: 'cover', // or 'stretch'
    }

  });

 class LoginScreen extends React.Component {

    static navigationOptions = {
      headerLeft:null,
      header: null
    }
    constructor(props) {
      super(props)
  
      this.state = ({
        email: 'edon.aliko@gmail.com',
        password: '123456'
      })
    }
  
    signUpUser = (email, password) => {
  
      try {
  
        if (this.state.password.length < 6) {
          alert("Please enter atleast 6 characters")
          return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
      }
      catch (error) {
        Alert.alert(
          'Incorrect Password',
          'Please Try Again',
          {cancelable: true},
        );
      }
    }
  
    loginUser = (email, password, navigation) => {
  
      try {
  
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {      
            console.log("Logged In")
            const { navigate } = navigation;
            navigate('SignedInComponent');
        })
      }
      catch (error) {
        return(Alert.alert(
          'Incorrect Password'
       ));
      }
    }
  
  
    render() {
      return (
        <Container style={styles.container}>
          <Form>
          <Text style={{color:'green', fontSize: 40, textAlign: 'center'}}>ecolution</Text>
            <Item floatingLabel>
              <Label fontFamily='roboto' fontWeight='200'>email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
  
            <Item floatingLabel>
              <Label  fontFamily='sans-serif' fontWeight='200' >password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
  
            <Button style={{ marginTop: 10 }}
              block
              rounded
              bordered success
              onPress={() => this.loginUser(this.state.email, this.state.password, this.props.navigation)}
            >
              <Text style={{ color: 'green', fontFamily: 'sans-serif', fontWeight: '900'  }}> Login</Text>
            </Button>
  
            <Button style={{ marginTop: 10 }}
              block
              rounded
              bordered primary
              onPress={() => this.signUpUser(this.state.email, this.state.password)}
            >
              <Text style={{ color: 'blue', fontFamily: 'sans-serif', fontWeight: '900' }}> Sign Up</Text>
            </Button>
          </Form>

          <Image source={{uri:"https://i.ibb.co/1LcBHjd/ecolution.png"}} style={styles.backgroundImage} />

        </Container>
        
      );
    }
  }
  
export default withNavigation(LoginScreen);