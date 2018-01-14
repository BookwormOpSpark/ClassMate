import React from 'react';
import { Animated } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClassDashboard from './app/components/ClassDashboard';
import StudentDashboard from './app/components/StudentDashboard';
import SubmitHomework from './app/components/SubmitHomework';
import RaiseHand from './app/components/RaiseHand';
import LoginNavigation from './app/navigation/LoginNavigation';


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
      screen: StudentDashboard,
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
      screen: ClassDashboard,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'ClassDashb',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    QueueTab: {
      screen: RaiseHand,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'RaiseHand',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={15}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    HomeworkTab: {
      screen: SubmitHomework,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Homework',
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
