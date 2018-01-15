import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class StudentClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <Text h1>Class Mate</Text>
        <Text h4>Class Dashboard</Text>
        <Text h3>Biology</Text>
        <Button
          onPress={() => this.props.navigation.navigate('CheckIn')}
          large
          title="CheckIn"
        />
        <Button
          onPress={() => this.props.navigation.navigate('RaiseHand')}
          large
          title="Raise Hand"
        />
        <Button
          onPress={() => this.props.navigation.navigate('SubmitHomework')}
          large
          title="Submit Assignment"
        />
        <Button
          onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
          large
          title="Daily Schedule"
        />
      </View>
    );
  }
}
StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};