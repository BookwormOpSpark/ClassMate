import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, FormLabel, FormInput  } from 'react-native-elements';


export default class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text>Teacher Login</Text>
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ text })}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ text })}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          raised
          large
          title="Forgot Password?"
        />
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
