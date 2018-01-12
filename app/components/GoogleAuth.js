import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements'
//import cfg from '../../config';
// console.log(config);

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  signInWithGoogleAsync= async() => {
  try {
    const result = await Expo.Google.logInAsync({
      behavior: 'web',
      androidClientId: '29245857360-gi2ilv6b04e6mpn9icn9ngiq0buq4elr.apps.googleusercontent.com',
      //androidClientId: cfg.androidClientId,

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
    console.log('hello');
    const result = await this.signInWithGoogleAsync();
    const userInfoResponse = await this.getUserInfo(result);
    const userInfo = userInfoResponse._bodyText;
    console.log(userInfo)
    console.log(typeof userInfo)
    const user = {
    id: userInfo.id,
    name: userInfo.name,
    givenName: userInfo.given_name,
    familyName: userInfo.family_name,
    photoUrl: userInfo.picture,
    email: userInfo.email,
    }
    console.log(user);
    this.setState({user : userInfo})
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
        <Text>{this.state.user ?  this.state.user : ''}</Text>

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




