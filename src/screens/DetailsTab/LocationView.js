import React, { Component } from 'react';
import _ from 'lodash'
import {
  Platform,
  StyleSheet,
  MapView,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  AlertIOS,
  Linking
 } from 'react-native';

const {width} = Dimensions.get('window');

export default class LocationView extends Component {

  constructor(props) {
    super(props);
  }

  navigatePressed() {
    if (Platform.OS == 'ios') {
      const url = `http://maps.apple.com/?dirflag=d&daddr=${this.props.latitude}, ${this.props.longitude}`;
      Linking.openURL(url);
    }
    else if (Platform.OS == 'android') {
      Alert.alert('Error', 'This feature is not comptible with Android yet...');
    }
  }

  render() {
    console.log("My longitude: " + this.props.longitude)
    return (
      <MapView
        style={styles.mapContainer}
        region={{latitude: this.props.latitude, longitude: this.props.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}
        annotations={
          [
            {
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              animateDrop: true,
              draggable: false,
              title: this.props.title,
              subtitle: this.props.description,
              rightCalloutView:
              <View>
                <TouchableOpacity onPress={this.navigatePressed.bind(this)}>
                  <Image style={{height: 30, width: 30}} source={{uri: 'https://cdn4.iconfinder.com/data/icons/military-strategy/512/compass-512.png'}} />
                </TouchableOpacity>
              </View>
            }
          ]
        }

        scrollEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        showsCompass={false}
        zoomEnabled={false}
        showsUserLocation={false}
      />
    );
  }

  static propTypes = {
    longitude: React.PropTypes.number,
    latitude: React.PropTypes.number,
  }
}


const styles = StyleSheet.create(
  {
    mapContainer: {
      flex: 1,
      width: width - 40,
      borderRadius: 3,
      borderColor: '#ebebeb',
    },
  }
)
