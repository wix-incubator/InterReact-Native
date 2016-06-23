import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';

const atttendeesData = ['Arron Greenwald', 'Ethan Sharabi', 'Ran Greenbaerg', 'Dan Abramov'];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SecondTabScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(atttendeesData)
    }
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text>{rowData}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listView}>
          <ListView
            dataSource={this.state.dataSource}
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
    backgroundColor: '#F5FCFF'
  },
  listView: {

  },
  row: {
    backgroundColor: 'green'

  }
});

export default connect(mapStateToProps)(SecondTabScreen);
