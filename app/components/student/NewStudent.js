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
import { blue, white, yellow, orange, red, green } from '../../style/colors';


class NewStudent extends React.Component {
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
          style={{ paddingTop: 50, paddingHorizontal: 10, paddingBottom: 20 }}
        >
          <Icon name="arrow-left-thick" size={50} color={yellow} />
        </Button>
        <View
          style={styles.contentContainer}
        >
          <Text h3 style={{ color: white, paddingTop: 0 }}>
            New Student!
          </Text>
          <FormLabel>First Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ nameFirst: text })}
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ nameLast: text })}
          />
          <FormLabel>User Name</FormLabel>
          <FormInput
            onChangeText={text => this.setState({ username: text })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
          <View style={{ paddingTop: 20, paddingHorizontal: 10 }} />
          <Button
            block
            success
            onPress={this.onLogin}
          >
            <Text>Let's go!</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(getUser, dispatch),
});
export default connect(mapDispatchToProps)(NewStudent);
NewStudent.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};