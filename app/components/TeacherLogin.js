import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';


export default class TeacherLogin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text>Teacher Login</Text>
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          raised
          large
          title='Forgot Password?' />
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
