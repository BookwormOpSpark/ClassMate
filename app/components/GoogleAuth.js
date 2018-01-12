import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements'

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  signInWithGoogleAsync= async() => {
  try {
    const result = await Expo.Google.logInAsync({
      behavior: 'web',
      androidClientId: '29245857360-gi2ilv6b04e6mpn9icn9ngiq0buq4elr.apps.googleusercontent.com',
      // androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,

      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.accessToken);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
  }

  getUserInfo = async (accessToken) => {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return userInfoResponse;
  }

  onLoginPress = async () => {
    console.log('hello')
    const result = await this.signInWithGoogleAsync()
    const result2 = await this.getUserInfo(result);
    console.log(result2)
    // if there is no result.error or result.cancelled, the user is logged in
    // do something with the result
  }  


  render() {
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text>Teacher Login</Text>
        <Button
          onPress={this.onLoginPress}
          large
          title='GoogleSignIn' />
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




