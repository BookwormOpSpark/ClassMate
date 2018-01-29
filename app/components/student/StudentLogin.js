import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, ScrollView, ImageBackground, Image } from 'react-native';
import { Text, FormLabel, FormInput, Card, ListItem } from 'react-native-elements';
import { Header, Title, Left, Right, Body, Button } from 'native-base';
import blackboard from '../../assets/blackboard.jpg';
import logo from '../../assets/logo.png';
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
    this.newStudent = this.newStudent.bind(this);
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
          // this.props.navigation.navigate('StudentDashboardNavigation');
          const resetStack = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'StudentDrawerNavigation' }),
            ],
          });
          this.props.navigation.dispatch(resetStack);
        }
      })
      .catch(err => console.error(err));
  }

  newStudent() {
    this.props.navigation.navigate('NewStudent');
  }

  render() {
    const styles = StyleSheet.create({
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
      },
    });
    return (
      <ImageBackground
        source={blackboard}
        style={{
          backgroundColor: '#000000',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
          style={{ paddingTop: 50, paddingHorizontal: 10 }}
        >
          <Icon name="arrow-left-thick" size={50} color={yellow} />
        </Button>
        <View
          style={styles.contentContainer}
        >
          <Text h3 style={{ color: white, paddingTop: 15 }}>
            Student Login
          </Text>
          <FormLabel>User Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ username: text })}
            style={{ paddingHorizontal: 10 }}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ password: text })}
            style={{ paddingHorizontal: 10 }}
          />
          <View style={{ paddingTop: 20, paddingHorizontal: 10 }} />
          <Button
            block
            success
            onPress={this.onLogin}
          >
            <Text>LOGIN</Text>
          </Button>
          <Text style={{ padding: 20, color: yellow }} >
            OR
          </Text>
          <Button
            block
            transparent
            style={{ backgroundColor: white }}
            onPress={this.newStudent}
          >
            <Text>create new account</Text>
          </Button>
        </View>
      </ImageBackground>
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
