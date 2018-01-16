import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

const CheckIn = ({ state }) => {
  console.log(state);
  console.log(state.user);
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
      <Text h1>CheckIn</Text>
      <Text>{state.user.email}</Text>
    </View>
  );
};


const mapStateToProps = state => ({
  state,
});

CheckIn.propTypes = {
  state: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(CheckIn);
