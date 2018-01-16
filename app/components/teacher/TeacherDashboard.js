import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TeacherDashboard extends React.Component {
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
    const teacher = this.props.state.user;
    console.log('teacher dashboard');
    console.log(this.props.state);
    return (
      <View style={styles.container}>
        <Text h4>{`${teacher.First_name} ${teacher.Last_name} Dashboard`}</Text>
        <Text h5>Your Class Schedule</Text>
        <Text h5>Upcoming Due Dates</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(TeacherDashboard);

TeacherDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};
