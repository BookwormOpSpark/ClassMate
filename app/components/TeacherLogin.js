import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Google } from 'expo';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { androidClientId, iosClientId, SERVER_URI } from '../constant';

export default class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      user_name: '',
      user_first_name: '',
      user_last_name: '',
      user_email: '',
    };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  onLoginPress() {
    Google.logInAsync({
      behavior: 'web',
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email'],
    }).then((info) => {
      const token = info.idToken;
      const user = {
        id: info.user.id,
        name: info.user.name,
        First_name: info.user.givenName,
        Last_name: info.user.familyName,
        verified: 'True',
        email: info.user.email,
        link: info.user.email,
        picture: { data: { url: info.user.photoUrl } },
      };
      this.setState({
        user_id: user.id,
        user_name: user.name,
        user_first_name: user.First_name,
        user_last_name: user.Last_name,
        user_email: user.email,
      });
      axios.post(`${SERVER_URI}/login`, { idtoken: token })
        .then((res) => {
          console.log(res.data);
          const { verified } = res.data;
          console.log(verified);
          if (verified) {
            this.props.navigation.navigate('TeacherDashboard');
          }
        })
        .catch(err => console.log(err));
    })
      .catch(err => console.log(err));
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
        <Text h3>Teacher Login</Text>
        <Text>Please sign in with Google Authentication</Text>
        <Button
          onPress={this.onLoginPress}
          large
          title="GoogleSignIn"
        />
        <Text>{this.state.user_id ? JSON.stringify(this.state) : ''}</Text>
      </View>
    );
  }
}

TeacherLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
};
