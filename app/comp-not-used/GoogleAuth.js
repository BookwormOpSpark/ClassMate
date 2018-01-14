pimport { Google } from 'expo';
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
// import Config from 'react-native-config'
import { androidClientId } from '../constant';
import { SERVER_URI } from '../constant';

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  signInWithGoogleAsync= async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result);
        return result.accessToken;
      }
      return { cancelled: true };

    } catch (e) {
      return { error: true };
    }
  }

  getUserInfo = async (accessToken) => {
    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return userInfoResponse;
  }

  onLoginPress = async () => {
    const result = await this.signInWithGoogleAsync();
    const userInfoResponse = await this.getUserInfo(result);
    const userInfo = userInfoResponse._bodyText;
    console.log(userInfoResponse);
    const userParsed = JSON.parse(userInfo);
    const user = {
      id: userParsed.id,
      name: userParsed.name,
      givenName: userParsed.given_name,
      familyName: userParsed.family_name,
      photoUrl: userParsed.picture,
      email: userParsed.email,
    };
    console.log(user);
    this.setState({ user: userInfo });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text>Teacher Login</Text>
        <Button
          onPress={this.onLoginPress}
          large
          title="GoogleSignIn"
        />
        <Text>{this.state.user ? this.state.user : ''}</Text>

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




