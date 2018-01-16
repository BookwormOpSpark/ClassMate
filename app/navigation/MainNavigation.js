import React from 'react';
import { Animated } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginNavigation from './LoginNavigation';
import StudentClassNavigation from './StudentClassNavigation';
import StudentDashboardNavigation from './StudentDashboardNavigation';


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
      screen: StudentDashboardNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'StudentDashb',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    ClassTab: {
      screen: StudentClassNavigation,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'StudClassDashb',
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