import { StackNavigator } from 'react-navigation';
import React from 'react';
import { Container, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import StudentLogin from '../components/student/StudentLogin';
import NewStudent from '../components/student/NewStudent';
import TeacherLogin from '../components/teacher/TeacherLogin';
import FirstPage from '../components/FirstPage';
import StudentDrawerNavigation from './StudentDrawerNavigation';
import TeacherDrawerNavigation from './TeacherDrawerNavigation';


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
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner color="blue" />
      </Container>
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
