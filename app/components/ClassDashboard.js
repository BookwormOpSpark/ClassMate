import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class ClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text h4>Class Dashboard</Text>
        <Text h3>Biology</Text>
        <Text h2>CheckIn</Text>
        <Text h2>RaiseHand</Text>
        <Text h2>Submit Assignment</Text>
        <Text h2>Daily Schedule</Text>
      </View>
    );
  }
}
