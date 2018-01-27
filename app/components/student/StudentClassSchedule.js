import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class StudentClassSchedule extends React.Component {
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
        <Text h1>Give A Quizz</Text>
      </View>
    );
  }
}
