import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Google, Font, AppLoading } from 'expo';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { androidClientId, iosClientId, SERVER_URI, TeacherLoginRoute } from '../../constant';
import { getUser } from '../../actions/actions';

class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Teacher Login');
    // console.log(props);
    this.state = { loading: true };
    this.onLogin = this.onLogin.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ loading: false });
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

    });
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Icon color="blue" name="lock" size={30} />
        <Text h4 style={{ marginTop: 15 }}>Teacher Login</Text>
        <Icon color="blue" name="google" size={30} />
        <Text>Please sign in with Google Authentication</Text>
        <Button
          onPress={this.onLogin}
          buttonStyle={[{ marginBottom: 5, marginTop: 30 }]}
          rounded
          backgroundColor="blue"
          title="Google SignIn"
        />
      </View>
    );
  }
}

export default connect()(TeacherLogin);

TeacherLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// BIND ACTION CREATORS
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getUser }, dispatch);
// }
// export default connect(mapDispatchToProps)(TeacherLogin);
