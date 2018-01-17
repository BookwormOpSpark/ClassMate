import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { SERVER_URI, StudentLoginRoute } from '../../constant';
import { getUser } from '../../actions/actions';


class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      nameFirst: '',
      nameLast: '',
      email: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const student = this.state;
    console.log(student);
    axios.post(`${SERVER_URI}${StudentLoginRoute}`, student)
      .then((res) => {
        console.log('res', res.data);
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
        const verified = res.payload.id;
        if (verified) {
          this.props.navigation.navigate('StudentDashboard');
        }
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
        <Text h4>Student Login</Text>
        <FormLabel>First Name</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ nameFirst: text })}
        />
        <FormLabel>Last Name</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ nameLast: text })}
        />
        <FormLabel>Userame</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ username: text })}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ email: text })}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ password: text })}
        />
        <Button
          onPress={this.onLogin}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Login"
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
