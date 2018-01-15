import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
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
        <Text h2>Class Dashboard</Text>
        <Text h3>Biology</Text>
        <Button
          onPress={() => this.props.navigation.navigate('CheckIn')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="CheckIn"
        />
        <Button
          onPress={() => this.props.navigation.navigate('RaiseHand')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Raise Hand"
        />
        <Button
          onPress={() => this.props.navigation.navigate('SubmitHomework')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Submit Homework"
        />
        <Button
          onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Daily Schedule"
        />
      </View>
    );
  }
}
StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};