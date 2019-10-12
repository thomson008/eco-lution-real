import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';

import Button from 'apsl-react-native-button';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

// Initialize Firebase
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

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class App extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      isModalVisible: false,
      markers: [],
      region: {
        latitude: 41.388,
        longitude: 2.113,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
      latitude: 42.3,
      longitude: 2.11,
    };
  }

  componentDidMount(props) {
    this.setupLocationListener();
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('wokeeey');
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          },
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }

  setupLocationListener() {
    firebase
      .database()
      .ref()
      .child('locations')
      .on('value', snapshot => {
        var locationsArray = [];
        for (const [key, value] of Object.entries(snapshot.val())) {
          locationsArray.push(value);
        }
        this.setState({ markers: locationsArray });
      });
  }

  storeLocation = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      var key = firebase
        .database()
        .ref()
        .child('locations')
        .push().key;
      console.log('got here');

      firebase
        .database()
        .ref()
        .child('locations')
        .child(key)
        .set({
          location: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          },
          title: 'Dirty',
          description: 'Dirty place',
          image: result.uri,
        });

      this.uploadImage(result.uri, 'test')
        .then(() => console.log('OK'))
        .catch(error => {
          console.log(error);
        });

      Alert.alert(
        'Location added!',
        'You have succesfully reported a dirty place.'
      );
    }
  };

  uploadImage = async (uri, name) => {
    console.log('GOT HERE');
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('images/' + name);
    return ref.put(blob);
  };

  markerClick() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  share(imageURL) {
    console.log(imageURL);
    var link =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      imageURL +
      '%2F&amp;src=sdkpreparse';
    console.log(link);
    Linking.openURL(link);
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  renderMarkers() {
    return this.state.markers.map((marker, index) => {
      return (
        <MapView.Marker
          key={index}
          coordinate={marker.location}
          onPress={() => this.markerClick()}>
          <View style={[styles.markerWrap]}>
            <View style={[styles.ring]} />
            <View style={styles.marker} />
          </View>
          <Modal style={styles.modal} isVisible={this.state.isModalVisible}>
            <View>
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                source={{
                  uri:
                    'https://cdn.abcotvs.com/dip/images/5006222_010219-kgo-trash-overflowing-park-img.jpg',
                }}
              />
              <Button
                style={{
                  backgroundColor: '#43a61f',
                  borderColor: '#FFFFFF',
                  marginTop: 30,
                  marginHorizontal: 20,
                  height: 70,
                  borderRadius: 50,
                }}
                textStyle={{ fontSize: 18, color: '#FFFFFF' }}
                onPress={() => this.share('https://cdn.abcotvs.com/dip/images/5006222_010219-kgo-trash-overflowing-park-img.jpg')}>
                SHARE
              </Button>
              <Button
                style={{
                  backgroundColor: '#991d29',
                  borderColor: '#FFFFFF',
                  marginTop: 5,
                  marginHorizontal: 20,
                  height: 70,
                  borderRadius: 50,
                }}
                textStyle={{ fontSize: 18, color: '#FFFFFF' }}
                onPress={() => this.setState({ isModalVisible: false })}>
                CLOSE
              </Button>
            </View>
          </Modal>
        </MapView.Marker>
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.map}
          showsUserLocation>
          {this.renderMarkers()}
        </MapView>
        <Button
          style={{
            backgroundColor: '#43a61f',
            borderColor: '#FFFFFF',
            marginTop: 30,
            marginHorizontal: 20,
            height: 70,
            borderRadius: 50,
          }}
          onPress={() => this.storeLocation()}
          textStyle={{ fontSize: 18, color: '#FFFFFF' }}>
          ADD LOCATION
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginTop: 80,
    marginBottom: 100,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 0.2,
    alignContent: 'center',
  },

  container: {
    flex: 1,
  },
  map: {
    height: '80%',
  },

  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(200,0,0,0.5)',
  },
  ring: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(200,0,0,0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(200,0,0,0.5)',
  },
});
