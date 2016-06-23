import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';

class FirstTabScreen extends Component {
  render() {
    const {details} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {details}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps)(FirstTabScreen);