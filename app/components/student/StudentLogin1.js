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
      axios.post(`${SERVER_URI}/${loginRoute}`, { idtoken: token })
        .then((res) => {
          const user = {
            // need the student id from the database
            id: res.data.user.id,
            name: res.data.user.name,
            First_name: res.data.user.givenName,
            Last_name: res.data.user.familyName,
            email: res.data.user.email,
            link: res.data.user.email,
            picture: { data: { url: res.data.user.photoUrl } },
          };
          this.props.dispatch(getUser(user));
        })
        .then((res) => {
          const verified = res.data.email;
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
        <Text>{this.state.user_id ? JSON.stringify(this.state) : ''}</Text>
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
