import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const student = this.props.state.user;
    console.log('student dashboard');
    console.log(this.props.state);
    return (
      <View style={styles.container}>
        <Text h4>{`${student.First_name} ${student.Last_name} Dashboard`}</Text>
        <Text h5>Your Class Schedule</Text>
        <Text h5>Upcoming Due Dates</Text>
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
          title="Go to Class Biology"
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={() => this.props.navigation.navigate('JoinClass')}
          title="Join a Class"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(StudentDashboard);

StudentDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};
