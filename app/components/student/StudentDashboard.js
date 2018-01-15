import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class StudentDashboard extends React.Component {
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
        <Text h2>Student Dashboard</Text>
        <Text h3>Student Name Suzie</Text>
        <Text h4>Your Class Schedule</Text>
        <Text h4>Upcoming Due Dates</Text>
        <Text h4>Add a sidebar</Text>
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
          title="Go to Class Biology"
        />
      </View>
    );
  }
}

StudentDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};
