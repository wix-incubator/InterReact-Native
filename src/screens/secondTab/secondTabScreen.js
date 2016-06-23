import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import {CustomSegmentedControl} from 'react-native-custom-segmented-control'
import Attendees from './attendees';
import Overview from './overview';

const {height, width} = Dimensions.get('window');
class SecondTabScreen extends Component {

  static navigatorStyle = {
  navBarNoBorder: true
}
  constructor(props) {
    super(props);
    this.state = {displayedSegmentIndex: 0};
  }

  render() {
    const {attendees} = this.props;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <CustomSegmentedControl
            style={styles.segmented}
            textValues={['GUESTS','OVERVIEW' ]}
            selected={this.state.displayedSegmentIndex}
            segmentedStyle={{
              selectedLineHeight: 2,
              fontSize:17,
              fontWeight: 'bold', // bold, italic, regular (default)
              segmentBackgroundColor: '#52489C',
              segmentTextColor: '#000000',
              segmentHighlightTextColor: '#7a92a599',
              selectedLineColor: '#ebebeb',
              selectedLineAlign: 'text', // top/bottom/text
              selectedLineMode: 'full', // full/text
              selectedTextColor: '#ebebeb',
              selectedLinePaddingWidth: 12,
              segmentFontFamily: 'system-font-bold'
            }}
            animation={{
              duration: 0.6,
              damping: 0.5,
              initialDampingVelocity: 0.4,
            }}
            onSelectedWillChange={(event) => {
              if (typeof(event.nativeEvent.selected) !== 'undefined') {
                this.setState({displayedSegmentIndex: event.nativeEvent.selected})
              }
            }}
          />
        </View>
       { this.state.displayedSegmentIndex === 0 ?
          <Attendees attendees={attendees} />
        : <Overview attendees={attendees} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59C3C3',
  },
  segmented: {
    height: 50,
    width: width,
    backgroundColor: '#cad2c5'
    //marginVertical: 8
  }
});

export default connect(mapStateToProps)(SecondTabScreen);
