import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Platform,
  View,
  PixelRatio,
  TouchableOpacity,
  Animated,
  AlertIOS,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';

import * as Constants from '../Constants'

class EventMaterialsScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarTranslucent: true,
    drawUnderNavBar: true,
    navBarBlur: true,
  };

  constructor(props) {
    super(props);

  }


  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == '') {

      }
    }
  }

  linkClicked(link) {
    if (Linking.canOpenURL(link.url)) {
      Linking.openURL(link.url);
    }
    else {
      Alert.alert("Couldn't open URL...")
    }
  }

  renderImage(material) {
    if (_.startsWith(material.presenter.image, 'http')) {
      return (<Image style={styles.presenterImage} source={{uri: material.presenter.image}} />);
    }
    else {
      return (<View></View>);
    }
  }

  renderMaterial(material) {
    const image = this.renderImage(material);
    return (
      <View key={material.title} style={styles.talkContainer}>
        <View style={styles.titleContainer}>
          <View style={{justifyContent: 'center'}}>
            {image}
            <Text style={{padding: 5, color: '#cccccc', textAlign: 'center'}}>{material.presenter.name}</Text>
          </View>
          <View style={{flex: 1,}}>
            <Text style={styles.titleText}>{material.title}</Text>
          </View>
        </View>
        <View style={styles.linksContainer}>
          {_.map(material.links, (link) => this.renderLink.bind(this)(link))}
        </View>
      </View>
    );
  }

  renderLink(link) {
    return (

      <TouchableOpacity onPress={() => this.linkClicked.bind(this)(link)}>
        <Text style={{color: '#4fbee7'}}>{link.title}</Text>
      </TouchableOpacity>

    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentInset={{top: 60}} contentOffset={{y: -60}}>
        <View style={styles.talksContainer}>
          {_.map(this.props.event.materials, (material) => this.renderMaterial.bind(this)(material))}
        </View>
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
  linksContainer: {
    margin: 20,
  },
  presenterImage: {
    borderRadius: 35,
    borderColor: '#cccccc',
    borderWidth: 1,
    width: 70,
    height: 70,
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  contentText: {
    paddingTop: 5,
    color: 'white'
  },
  contentBelowText: {
    color: 'white',
    paddingTop: 0,
    padding: 20,
  },

  dateContainer: {
    justifyContent: 'flex-end',
  },
  dateText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 10,
  }

});

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(EventMaterialsScreen);
