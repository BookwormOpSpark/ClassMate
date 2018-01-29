import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class StudentBadges extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.3);
  }
  componentDidMount() {
    this.spring();
  }
  spring() {
    this.springValue.setValue(0.7);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1,
      },
    ).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{ transform: [{ scale: this.springValue }] }}

        >
          <Icon
            color="#FF9F1C"
            name="rocket"
            size={200}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
