import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';

export default function FirstPage({ navigation }) {
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
      <Text>Are you a</Text>
      <Button
        buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
        onPress={() => navigation.navigate('StudentLogin')}
        title="Student?"
      />

      <Button
        buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
        onPress={() => navigation.navigate('TeacherLogin')}
        title="Teacher?"
      />
    </View>
  );
}


FirstPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};
