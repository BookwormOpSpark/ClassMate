import React from 'react';
import { Animated } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginNavigation from './LoginNavigation';
import StudentDrawerNavigation from './StudentDrawerNavigation';
import TeacherDrawerNavigation from './TeacherDrawerNavigation';


const TabAnimations = TabNavigator(
  {
    MainTab: {
      screen: LoginNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'LogIn',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    StudentTab: {
      screen: StudentDrawerNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Student',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    TeacherTab: {
      screen: TeacherDrawerNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Teacher',
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
  },
);

export default TabAnimations;
