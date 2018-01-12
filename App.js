import React from 'react';
import { Animated, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import TeacherDashboard from './app/components/TeacherDashboard.js';
import Dashboard1 from './app/components/Header.js';
import OpenCamera from './app/components/OpenCamera.js';
import ImagePickerComponent from './app/components/ImagePicker.js';
import GoogleAuth from './app/components/GoogleAuth.js';
import JoinClass from './app/components/JoinClass.js';
import AccelerometerSensor from './app/components/Accelerometer.js';
import LoginNavigation from './app/navigation/LoginNavigation.js';


const TabAnimations = TabNavigator(
  {
    MainTab: {
      screen: LoginNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'FirstPage',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SettingsTab: {
      screen: TeacherDashboard,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'TeacherD',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SensorTab: {
      screen: AccelerometerSensor,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Accelerometer',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    JoinClass: {
      screen: JoinClass,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'JoinClass',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    ImageTab: {
      screen: ImagePickerComponent,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Image',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },

    GoogleTab: {
      screen: GoogleAuth,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'GoogleAuth',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    configureTransition: (currentTransitionProps, nextTransitionProps) => ({
      timing: Animated.spring,
      tension: 1,
      friction: 35,
    }),
    swipeEnabled: false,
  }
);

export default TabAnimations;
