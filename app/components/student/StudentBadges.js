import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import DashHeader from '../shared/Header';
import blackboard from '../../assets/blackboard.jpg';

export default class StudentBadges extends React.Component {
  constructor() {
    super();
    // this.springValue = new Animated.Value(0.3);
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
        <DashHeader
          navigation={this.props.navigation}
          className="badges"
          back
        />
        <View style={styles.container}>
          <Text h1>Student Badges</Text>
        </View>
      </ImageBackground>
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
