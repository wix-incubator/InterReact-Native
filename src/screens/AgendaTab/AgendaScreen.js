import _ from 'lodash';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  PixelRatio,
  TouchableOpacity,
  Animated,
  AlertIOS,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import BarChart from '../GuestsTab/BarChart';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

import * as Constants from '../Constants'

class AgendaScreen extends Component {
  static navigatorButtons = {

  };

  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarTranslucent: true,
    drawUnderNavBar: true,
    navBarBlur: true,
  };

  constructor(props) {
    super(props);
    this.renderImage=this.renderImage.bind(this);
    this.renderTalk=this.renderTalk.bind(this);
    this.talkPressed=this.talkPressed.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {

    }
  }



  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == '') {

      }
    }
  }

  renderImage(talk) {
    console.log('talk.image: ', talk.image);
    if (_.startsWith(talk.image, 'http')) {
      return (<Image style={styles.presenterImage} source={{uri: talk.image}} />);
    }
    else {
      return (<View></View>);
    }
  }

  renderTalk(talk) {
    const image = this.renderImage(talk);
    return (
      <View style={{padding: 10}}>
        <View style={styles.talkContainer}>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{fontSize: 14, color: '#4fbee7'}}>{talk.time}</Text>
          </View>
          <View style={styles.talksContainer}>
              <View style={styles.titleContainer}>
                <View style={{justifyContent: 'center'}}>
                  {image}
                  <Text style={{padding: 5, color: '#cccccc', textAlign: 'center'}}>{talk.presenterName}</Text>
                </View>
                <View style={{flex: 1,}}>
                  <Text style={styles.titleText}>{talk.title}</Text>
                </View>

              </View>
          </View>
          <Text style={styles.contentText}>{talk.content}</Text>
          {talk.link.link != '' ? <TouchableOpacity onPress={() => this.talkPressed(talk)}><Text style={{color: 'white'}}>{talk.link.title}</Text></TouchableOpacity> : <View></View>}
        </View>
      </View>
    );
  }

  talkPressed(talk) {
    if (talk.link.link == 'some_link') {
      if (talk.link.enabled) {
        Navigation.showModal({
          screen: 'example.DemoScreen',
          title: 'Demo',
          navigatorStyle: {},
          navigatorButtons: {
            leftButtons: [{
              title: 'Cancel',
              id: 'navBarCancel'
            }]
          }
        });
      }
      else {
        Alert.alert("Link isn't enabled yet", "The link is not enabled. The host will enable it during the event.")
      }
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentInset={{top: 60}} contentOffset={{y: -60}}>
        {_.map(this.props.talks, this.renderTalk)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  talksContainer: {
    flex: 1,
    padding: 10,
  },
  talkContainer: {
    paddingTop: 20,
    borderRadius: 3,
    backgroundColor: '#165574',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  presenterImage: {
    borderRadius: 35,
    borderColor: '#cccccc',
    borderWidth: 1,
    width: 70,
    height: 70,
  },
  titleText: {
    padding: 13,
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
  },
  contentText: {
    paddingTop: 5,
    padding: 13,
    color: 'white'
  },
  contentBelowText: {
    color: 'white',
    paddingTop: 0,
    padding: 20,
  }

});

function mapStateToProps(state) {
  return state.agenda;
}

export default connect(mapStateToProps)(AgendaScreen);
