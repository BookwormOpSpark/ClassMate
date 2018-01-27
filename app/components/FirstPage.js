/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import gifBackground from '../assets/reallySmall.gif'
import logo from './/assets/logo-01.png'
import { blue, white, yellow, orange, red, green } from '../style/colors';

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 150,
      },
      image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    });

    return (
      <ImageBackground
        source={gifBackground}
        style={styles.image}
      >
      <View style={styles.container}>
          <Text h1 style={{ color: '#ffffff', marginTop: 100 }}>Class Mate</Text>
          <Image 
            width='10%'
            height='10%'
            source={logo}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={() => navigation.navigate('StudentLogin')}
            backgroundColor={blue}
            title="Student Login"
            leftIcon={{ name: 'md-happy' }}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={() => navigation.navigate('TeacherLogin')}
            backgroundColor={blue}
            title="Teacher Login"
            leftIcon={{ name: 'logo-google' }}
          />
      </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FirstPage);

FirstPage.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
