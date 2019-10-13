import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { SignedOut } from "../router";
import LoginScreen from './LoginScreen';
import { createSwitchNavigator, createAppContainer, withNavigation} from 'react-navigation';
import * as firebase from 'firebase';

class Profile extends React.Component{
  constructor(props) {
    super(props)
    this.state = ({
      currentUser: ''
    })
  }
  onSignOut(navigation) {
    console.log("Signed Out")
    const { navigate } = navigation;
    navigate('LoginScreen');
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    console.log(currentUser)
    this.setState({ currentUser })
}

  render(){
    return(
      <View style={{ paddingVertical: 20 }}>
    <Card title = {this.state.currentUser.email}>
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>EA</Text>
        
      </View>
      
      <View style={{justifyContent: "center",
                    alignItems: "center"}}>
        <Text style={{ color: "black", fontSize: 28 }}>Edon Aliko</Text>
        <Text style={{ color: "black", fontSize: 20 }}>Edinburgh, United Kingdom</Text>
      </View>
      <Button
        backgroundColor="#43a61f"
        title="SIGN OUT"
        onPress={() => this.onSignOut(this.props.navigation)}
      />
    </Card>

    <Card title = "Badges">

    </Card>
  </View>

    );
  }
}
export default withNavigation(Profile);
