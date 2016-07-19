import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';

import Attendees from './attendees';
import Overview from './overview';
import * as Constants from '../Constants'

import {CustomSegmentedControl} from 'react-native-custom-segmented-control'
import AndroidSegmented from './AndroidSegmented'

const {height, width} = Dimensions.get('window');
class SecondTabScreen extends Component {

  static navigatorStyle = {
    navBarNoBorder: true,
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {displayedSegmentIndex: 0};
    this.renderSegmented = this.renderSegmented.bind(this);
  }

  renderSegmentedIOS() {
    return (
      <CustomSegmentedControl
        style={styles.segmented}
        textValues={['GUESTS','OVERVIEW' ]}
        selected={this.state.displayedSegmentIndex}
        segmentedStyle={{
          selectedLineHeight: 2,
          fontSize:17,
          fontWeight: 'bold', // bold, italic, regular (default)
          segmentBackgroundColor: '#e6e6e6',
          segmentTextColor: '#000000',
          segmentHighlightTextColor: '#7a92a599',
          selectedLineColor: '#165574',
          selectedLineAlign: 'text', // top/bottom/text
          selectedLineMode: 'text', // full/text
          selectedTextColor: '#165574',
          selectedLinePaddingWidth: 12,
          segmentFontFamily: 'system-font-bold'
        }}
        animation={{
          duration: 0.6,
          damping: 0.5,
          initialDampingVelocity: 0.6,
        }}
        onSelectedWillChange={(event) => {
          if (typeof(event.nativeEvent.selected) !== 'undefined') {
            this.setState({displayedSegmentIndex: event.nativeEvent.selected});
          }
        }}
      />
    );
  }

  renderSegmentedAndroid() {
    return (
      <View style={{alignItems: 'center', marginTop: 30,}}>
        <AndroidSegmented

              buttonChildren={['One','Two']}
              onSelectedWillChange={(event) => {
                if (typeof(event.selectedIndex) !== 'undefined') {
                  this.setState({displayedSegmentIndex: event.selectedIndex});
                }
              }}
              >
        </AndroidSegmented>
      </View>
    );
  }

  renderSegmented() {
    if (Platform.OS == 'ios') {
      return this.renderSegmentedIOS();
    }
    else {
      return this.renderSegmentedAndroid()
    }

  }

  render() {
    const {attendees} = this.props;
    return (
      <View style={styles.container}>
        <View>
          {this.renderSegmented()}
        </View>
        { this.state.displayedSegmentIndex === 0 ?
          <Attendees attendees={attendees}/>
          : <Overview attendees={attendees}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  segmented: {
    height: 50,
    width: width,
    marginTop: 20,
    //marginVertical: 8
  }
});

export default connect(mapStateToProps)(SecondTabScreen);
