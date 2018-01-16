import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Google } from 'expo';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { androidClientId, iosClientId, SERVER_URI, loginRoute } from '../../constant';
import { getUser } from '../../actions/actions';

class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
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
      axios.post(`${SERVER_URI}${loginRoute}`, { idtoken: token })
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
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(getUser, dispatch),
});

export default connect(mapDispatchToProps)(TeacherLogin);


TeacherLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
