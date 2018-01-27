/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
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
        paddingVertical: 130,
        paddingLeft: 20,
        paddingRight: 20,
      },
      image: {
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
            style={{width: '95%', height: '23%', marginTop: 150}}
            source={logo}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 200}]}
            onPress={() => navigation.navigate('StudentLogin')}
            backgroundColor={blue}
            title="Student Login"
            icon={{name: 'face'}}
          />

          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={() => navigation.navigate('TeacherLogin')}
            backgroundColor={blue}
            title="Teacher Login"
            icon={{ name: 'person' }}
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
