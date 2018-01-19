import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { List, ListItem } from 'react-native-elements';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
    });
    const { messages } = this.state;
    return (
      <View style={styles.container}>
        <Text h1>Hands Raised</Text>
      </View>
    );
  }
}
