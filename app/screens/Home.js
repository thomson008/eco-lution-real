import React, { Component } from "react";
import { ScrollView, Text, Linking, View, WebView } from "react-native";
import { Card, Button } from "react-native-elements";
import * as firebase from 'firebase';

const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    image: require("../images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("../images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("../images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("../images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
];

const firebaseConfig = {
  apiKey: 'AIzaSyB7LRNCqhyGMrOFPwJHRSKJVFnrCI4jNh8',
  authDomain: 'ecolution-84527.firebaseapp.com',
  databaseURL: 'https://ecolution-84527.firebaseio.com',
  projectId: 'ecolution-84527',
  storageBucket: 'ecolution-84527.appspot.com',
  messagingSenderId: '570895753766',
  appId: '1:570895753766:web:326ef9364433081adcfce7',
  measurementId: 'G-V75DK1H8BT',
};

export default class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
 
  }

  render(){
    return (
      <WebView
        source={{uri: 'https://www.facebook.com/groups/ecolution2019/'}}
        style={{marginTop: 20}}
      />
      // <View style={{ flex: 1 }}>
      //     <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      //       {images.map(({ name, image, url, key }) => (
      //         <Card title={`EVENT ${key}`} image={image} key={key}>
      //           <Text style={{ marginBottom: 10 }}>
      //             Photo by {name}.
      //           </Text>
      //           <Button
      //             backgroundColor="#03A9F4"
      //             title="VIEW NOW"
      //             onPress={() => Linking.openURL(url)}
      //           />
      //         </Card>
      //       ))}
      //     </ScrollView>
      // </View>
    );
  }
}