/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Google, Font, AppLoading } from 'expo';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import gifBackground from '../assets/reallySmall.gif'
import logo from '../assets/frontLogo.png'
import { blue, white, yellow, orange, red, green } from '../style/colors';
import { getUser } from '../actions/actions';
import { androidClientId, iosClientId, SERVER_URI, TeacherLoginRoute } from '../constant';


class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    Google.logInAsync({
      behavior: 'web',
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email'],
    }).then((info) => {
      this.props.navigation.navigate('Spinner');
      const token = info.idToken;
      axios.post(`${SERVER_URI}${TeacherLoginRoute}`, { idtoken: token })
        .then((res) => {
          // console.log(res.data, 'top res');
          let emergencyContactInfo = null;
          if (res.data.emergencyContact !== null) {
            emergencyContactInfo = res.data.emergencyContact;
          }
          const user = {
            id: res.data.user.id,
            First_name: res.data.user.nameFirst,
            Last_name: res.data.user.nameLast,
            email: res.data.user.email,
            picture: { data: { url: res.data.user.photoUrl } },
            emergencyContact: res.data.user.id_emergencyContact,
            emergencyContactInfo,
          };
          return this.props.dispatch(getUser(user));
        })
        .then((res) => {
          const verified = res.payload.id;
          if (verified) {
            const resetStack = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'TeacherDrawerNavigation' }),
              ],
            });
            this.props.navigation.dispatch(resetStack);
          }
        })
        .catch(err => console.error(err));
    })
      .catch(err => console.error(err));
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'transparent',
        paddingVertical: 130,
        paddingLeft: 20,
        paddingRight: 20,
      },
      image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    });

    return (
      <ImageBackground
        source={gifBackground}
        style={styles.image}
      >
      <View style={styles.container}>
          <Image 
            style={{width: '95%', height: '23%', marginTop: 150}}
            source={logo}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 200}]}
            onPress={() => this.props.navigation.navigate('StudentLogin')}
            backgroundColor={blue}
            title="Student Login"
            icon={{name: 'face'}}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.onLogin}
            backgroundColor={'#dd4b39'}
            title="Teacher Login"
            icon={{ name: 'person' }}
          />
      </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FirstPage);

FirstPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
