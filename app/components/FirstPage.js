import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

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
      <Text h1 style={{ color: 'black' }}>Class Mate</Text>
      <Icon color="blue" name="book-open-page-variant" size={120} />

      <Text h3 style={{ marginTop: 50, color: 'blue' }}>Are you a</Text>
      <Button
        buttonStyle={[{ marginBottom: 5, marginTop: 15 }]}
        onPress={() => navigation.navigate('StudentLogin')}
        rounded
        backgroundColor="blue"
        title="Student?"
      />

      <Button
        buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
        onPress={() => navigation.navigate('TeacherLogin')}
        rounded
        backgroundColor="blue"
        title="Teacher?"
      />
    </View>
  );
}


FirstPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};
