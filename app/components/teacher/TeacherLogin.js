import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Google } from 'expo';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native-elements';
import { androidClientId, iosClientId, SERVER_URI, TeacherLoginRoute } from '../../constant';
import { getUser } from '../../actions/actions';

class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    console.log('Teacher Login');
    console.log(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    Google.logInAsync({
      behavior: 'web',
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email'],
    }).then((info) => {
      const token = info.idToken;
      axios.post(`${SERVER_URI}${TeacherLoginRoute}`, { idtoken: token })
        .then((res) => {
          const user = {
            id: res.data.id,
            First_name: res.data.nameFirst,
            Last_name: res.data.nameLast,
            email: res.data.email,
            picture: { data: { url: res.data.photoUrl } },
            emergencyContact: res.data.id_emergencyContact,
          };
          return this.props.dispatch(getUser(user));
        })
        .then((res) => {
          console.log('res');
          console.log(res);
          const verified = res.payload.id;
          if (verified) {
            this.props.navigation.navigate('TeacherDashboardNavigation');
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