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

class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
      this.props.dispatch(getUser(user));
      console.log(this.props.dispatch(getUser(user)));

      axios.post(`${SERVER_URI}${loginRoute}`, { idtoken: token })
        .then((res) => {
          console.log(res.data);
          const verified = res.data.id;
          console.log(verified);
          if (verified) {
            this.props.navigation.navigate('StudentDashboard');
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
        <Text h3>Student Login</Text>
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

export default connect(mapDispatchToProps)(StudentLogin);


StudentLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
