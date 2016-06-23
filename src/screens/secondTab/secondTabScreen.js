import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import {CustomSegmentedControl} from 'react-native-custom-segmented-control'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var {height, width} = Dimensions.get('window');
class SecondTabScreen extends Component {
  
  renderRow(rowData) {
    const {name, org} = rowData;
    return (
      <View style={styles.row}>
        <Text>{name}</Text>
        <Text>{org}</Text>
      </View>
    )
  }

  render() {
    const {details, attendees} = this.props;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <CustomSegmentedControl
            style={{
            height: 50,
            width: width,
        backgroundColor: 'white',
        marginVertical: 8
    }}
            textValues={['GUESTS','OVERVIEW' ]}
            selected={0}
            segmentedStyle={{
        selectedLineHeight: 2,
        fontSize:17,
        fontWeight: 'bold', // bold, italic, regular (default)
        segmentBackgroundColor: 'transparent',
        segmentTextColor: '#7a92a5',
        segmentHighlightTextColor: '#7a92a599',
        selectedLineColor: '#00adf5',
        selectedLineAlign: 'bottom', // top/bottom/text
        selectedLineMode: 'text', // full/text
        selectedTextColor: 'black',
        selectedLinePaddingWidth: 30,
        segmentFontFamily: 'system-font-bold'
    }}
            animation={{
        duration: 0.6,
        damping: 0.5,
        initialDampingVelocity: 0.4,

    }}
            onSelectedWillChange={(event)=> {
    }}
            onSelectedDidChange={(event)=> {
    }}
          />
        </View>
        <View style={styles.listView}>
          <ListView
            dataSource={ds.cloneWithRows(attendees.attendeesData)}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {},
  row: {
    backgroundColor: 'green',
    flexDirection: 'column',
    padding: 4,
    margin: 4

  }
});

export default connect(mapStateToProps)(SecondTabScreen);
