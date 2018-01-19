import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Header } from 'react-native-elements';


export default class Dashboard1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'top',
    justifyContent: 'center',
  },

});
