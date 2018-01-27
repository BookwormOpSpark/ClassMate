/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import gifBackground from '../assets/reallySmall.gif'
import logo from '../assets/frontLogo.png'
import { blue, white, yellow, orange, red, green } from '../style/colors';

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'transparent',
        paddingVertical: 150,
        paddingLeft: 20,
        paddingRight: 20,
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
          <Image 
            style={{width:'100%', height:'50%'}}
            source={logo}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={() => navigation.navigate('StudentLogin')}
            backgroundColor={blue}
            title="Student Login"
            leftIcon={{ name: 'ion-person' }}
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
