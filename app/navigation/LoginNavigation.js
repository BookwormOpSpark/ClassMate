import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import StudentLogin from '../components/StudentLogin.js';
import TeacherLogin from '../components/TeacherLogin.js';
import FirstPage from '../components/FirstPage.js';

const LoginNavigation = StackNavigator({
  Home: {
    screen: FirstPage
  },
  StudentLogin: {
    screen: StudentLogin,
  },
  TeacherLogin: {
    screen: TeacherLogin,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default LoginNavigation;
