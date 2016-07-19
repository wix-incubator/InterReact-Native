import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch
} from 'react-native';

import PanResponderExample from './a-pan-responder';
import PanResponderDirectExample from './b-pan-responder-direct';
import NativeExample from './c-native';
import AnimatedLibExample from './d-animated-lib';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

class IOSExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: undefined,
      simulateHeavyRender: true,
      simulateBusyBridge: true
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'navBarCancel') {
        Navigation.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  render() {
    if (this.state.example) {
      const Example = this.state.example;
      return (
        <Example
          simulateHeavyRender={this.state.simulateHeavyRender}
          simulateBusyBridge={this.state.simulateBusyBridge}
        />
      );
    }
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.setState({example: PanResponderExample})}>
          <Text style={{color: 'blue', fontSize: 17, marginBottom: 20}}>
            Pan Responder
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({example: PanResponderDirectExample})}>
          <Text style={{color: 'blue', fontSize: 17, marginBottom: 20}}>
            Pan Responder with Direct Manipulation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({example: NativeExample})}>
          <Text style={{color: 'blue', fontSize: 17, marginBottom: 20}}>
            Native Container
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({example: AnimatedLibExample})}>
          <Text style={{color: 'blue', fontSize: 17, marginBottom: 20}}>
            JS with Animated Library
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={{alignSelf: 'center', marginRight: 10}}>Simulate heavy render function</Text>
          <Switch value={this.state.simulateHeavyRender} onValueChange={(val) => this.setState({simulateHeavyRender: val})} />
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{alignSelf: 'center', marginRight: 10}}>Simulate busy bridge every 1 sec</Text>
          <Switch value={this.state.simulateBusyBridge} onValueChange={(val) => this.setState({simulateBusyBridge: val})} />
        </View>

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
});

function mapStateToProps(state) {
  return state.agenda
}

export default connect(mapStateToProps)(IOSExample);
