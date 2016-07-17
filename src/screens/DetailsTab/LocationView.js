import React, { Component } from 'react';
import {
  StyleSheet,
  MapView,
  Text,
  View,
  Dimensions
 } from 'react-native';

const {width} = Dimensions.get('window');

export default class LocationView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("My longitude: " + this.props.longitude)
    return (
      <MapView
        style={styles.mapContainer}
        region={{latitude: this.props.latitude, longitude: this.props.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}
        annotations={[
          {latitude: this.props.latitude, longitude: this.props.longitude, animateDrop: true, draggable: false, title: this.props.title, subtitle: this.props.description}
        ]}

        showsUserLocation={true}
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
      position: 'absolute',
      top: -80,
      left: 20,
      height: 180,
      width: width - 40,
      borderWidth: 3,
      borderColor: '#ebebeb'
    },
  }
)
