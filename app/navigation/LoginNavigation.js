import { StackNavigator } from 'react-navigation';
import React from 'react';
import { Container, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import StudentLogin from '../components/student/StudentLogin';
import NewStudent from '../components/student/NewStudent';
import TeacherLogin from '../components/teacher/TeacherLogin';
import FirstPage from '../components/FirstPage';
import StudentDrawerNavigation from './StudentDrawerNavigation';
import TeacherDrawerNavigation from './TeacherDrawerNavigation';
import blackboard from '../assets/blackboard.jpg';
import { yellow } from '../style/colors';


const LoginNavigation = StackNavigator({
  Home: {
    screen: FirstPage,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentLogin: {
    screen: StudentLogin,
    navigationOptions: () => ({
      header: null,
    }),
  },
  NewStudent: {
    screen: NewStudent,
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherLogin: {
    screen: TeacherLogin,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentDrawerNavigation: {
    screen: ({ navigation }) => (
      <StudentDrawerNavigation screenProps={{ rootNavigation: navigation }} />
    ),
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherDrawerNavigation: {
    screen: ({ navigation }) => (
      <TeacherDrawerNavigation screenProps={{ rootNavigation: navigation }} />
    ),
    navigationOptions: () => ({
      header: null,
    }),
  },
  Spinner: {
    screen: ({ navigation }) => (
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
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color={yellow} />
        </Container>
      </ImageBackground>
    ),
    navigationOptions: () => ({
      header: null,
    }),
  },
});

TeacherLogin.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginNavigation;
