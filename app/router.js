import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { FontAwesome } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LoginScreeen from "./screens/LoginScreen";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Map from "./screens/Map";
import { View } from "react-native";
import { BottomNavigation, Text } from 'react-native-paper';

export default class SignedInComponent extends React.Component {
  static navigationOptions = {
    headerLeft:null,
    header: null
  }
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' , color: '#43a61f'},
      { key: 'map', title: 'Map', icon: 'map', color: '#43a61f'},
      { key: 'profile', title: 'Profile', icon: 'account-box', color: '#43a61f'},
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: Home,
    map: Map,
    profile: Profile,
  });

  render() {
    return (
      <BottomNavigation
        shifting = {true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}








// const headerStyle = {
//   marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
// };


// export default class SignedInComponent extends Component {
//   render(){
//     return(


//     ):
//   }
// }

// export const SignedIn = createMaterialBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="home" size={30} color={tintColor} />
//         )
//       }
//     },
//     Map: {
//       screen: Map,
//       navigationOptions: {
//         tabBarLabel: "Map",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="map" size={30} color={tintColor} />
//         )
//       }
//     },
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         tabBarLabel: "Profile", 
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="user" size={30} color={tintColor} />
//         )
//       }
//     }
//   },
//   {
//     tabBarOptions: {
//       style: {
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//       }
//     }
//   }
// );



