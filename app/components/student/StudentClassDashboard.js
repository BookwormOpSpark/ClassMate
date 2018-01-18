import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

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
        <Text h1>Biology</Text>
        <Icon color="blue" name="rocket" size={30} />
        <Button
          onPress={() => this.props.navigation.navigate('CheckIn')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          title="CheckIn"
        />
        <Button
          onPress={() => this.props.navigation.navigate('RaiseHand')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'thumb-up' }}
          backgroundColor="blue"
          rounded
          title="Raise Hand"
        />
        <Button
          onPress={() => this.props.navigation.navigate('SubmitHomework')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'assignment' }}
          backgroundColor="blue"
          rounded
          title="Submit Homework"
        />
        <Button
          onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'schedule' }}
          backgroundColor="blue"
          rounded
          title="Daily Schedule"
        />
      </View>
    );
  }
}
StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};