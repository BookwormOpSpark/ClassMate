import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ScrollView } from 'react-native';
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
      contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <Text h1>Class Mate</Text>
          <Text h4>Student Login</Text>
          <Icon color="grey" name="pets" size={30} />
          <FormLabel>First Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ nameFirst: text })}
            placeholder="optional if already registered"
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ nameLast: text })}
            placeholder="optional if already registered"
          />
          <FormLabel>User Name</FormLabel>
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
            icon={{ name: 'done' }}
            title="Login"
          />
        </ScrollView>
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
