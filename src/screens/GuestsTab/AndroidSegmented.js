import React, {Component} from 'react';
import {AppRegistry, View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import _ from 'lodash';

export default class AndroidSegmented extends Component {

  static propTypes = {
    buttonChildren: React.PropTypes.array,
    onSelectedWillChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.renderSelectedButton = this.renderSelectedButton.bind(this);
    this.renderUnselectedButton = this.renderUnselectedButton.bind(this);
    this.renderButton = this.renderButton.bind(this);

    this.state = {
      selectedIndex: 0,
    }
  }

  changeButton(index) {
    this.setState({selectedIndex: index});
    event = {
      selectedIndex: index
    }
    this.props.onSelectedWillChange(event);
  }

  getInitialState() {
    return {selectedIndex: 0}
  }

  componentDidMount() {

  }

  renderSelectedButton(child, index) {
    return (<TouchableOpacity style={styles.selectedButton} key={index} onPress={() => this.changeButton(index)}><Text>{child}</Text></TouchableOpacity>);
  }

  renderUnselectedButton(child, index) {
    return (
      <TouchableOpacity style={styles.button} key={index} onPress={() => this.changeButton(index)}><Text>{child}</Text></TouchableOpacity>
    );
  }

  renderButton(child, index) {
    if (this.state.selectedIndex == index) {
      return this.renderSelectedButton(child, index);
    }
    return this.renderUnselectedButton(child, index);
  }

  render() {
    return (
      <View style={styles.container}>
        {_.map(this.props.buttonChildren, (child, index) => {
          return (
            this.renderButton(child, index)
          );
        })}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
  },
  selectedButton: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    backgroundColor: '#59c6cb',
  }
});
