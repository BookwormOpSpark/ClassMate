import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class TeacherClassDashboard extends React.Component {
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
          onPress={() => this.props.navigation.navigate('AssignmentNavigation')}
          buttonStyle={[{ marginBottom: 5, marginTop: 30 }]}
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          title="Assignment"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Queue')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'thumb-up' }}
          backgroundColor="blue"
          rounded
          title="Queue"
        />
        <Button
          onPress={() => this.props.navigation.navigate('GiveAQuizz')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'assignment' }}
          backgroundColor="blue"
          rounded
          title="Give A Quizz"
        />
        <Button
          onPress={() => this.props.navigation.navigate('TeacherClassSchedule')}
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
TeacherClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};