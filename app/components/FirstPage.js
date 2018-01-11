import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import StudentLogin from './StudentLogin.js';
import TeacherLogin from './TeacherLogin.js';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text>Are you a</Text>
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          raised
          large
          onPress={() => this.props.navigation.navigate('StudentLogin')}
          title='Student?' />

        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          raised
          large
          onPress={() => this.props.navigation.navigate('TeacherLogin')}
          title='Teacher?' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
