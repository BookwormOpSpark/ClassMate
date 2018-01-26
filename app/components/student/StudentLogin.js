import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { SERVER_URI, StudentLoginRoute } from '../../constant';
import { getUser } from '../../actions/actions';
import {blue, white, yellow, orange, red, green } from '../../style/colors';


class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      nameFirst: '',
      nameLast: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const student = this.state;
    // console.log(student);
    axios.post(`${SERVER_URI}${StudentLoginRoute}`, student)
      .then((res) => {
        let emergencyContactInfo = null;
        if (res.data.emergencyContact !== null) {
          emergencyContactInfo = res.data.emergencyContact;
        }
        // console.log('res', res.data);
        const user = {
          id: res.data.user.id,
          First_name: res.data.user.nameFirst,
          Last_name: res.data.user.nameLast,
          email: res.data.user.email,
          picture: { data: { url: res.data.user.photoUrl } },
          emergencyContact: res.data.user.id_emergencyContact,
          emergencyContactInfo,
        };
        // console.log(this.props.dispatch(getUser(user)));
        return this.props.dispatch(getUser(user));
      })
      .then((res) => {
        // console.log(res, 'bottom res');
        const verified = res.payload.id;
        if (verified) {
          this.props.navigation.navigate('StudentDashboardNavigation');
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const styles = StyleSheet.create({
      contentContainer: {
        flexGrow: 1,
        backgroundColor: white,
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
          <Icon color={blue} name="lock" size={30} />
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
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            onPress={this.onLogin}
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            icon={{ name: 'done' }}
            rounded
            backgroundColor={green}
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
