import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Image, Linking, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';
import { white, red } from '../../style/colors';
import DashHeader from '../shared/Header';

class SpecificStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyContact: [],
    };
    this.callNumber = this.callNumber.bind(this);
  }

    callNumber = (url) => {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          // console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }

    render() {
      // this.props.state.specificStudent.emergencyContact ? this.setState({ emergencyContact: this.props.state.specificStudent.emergencyContact }) : null;
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        image: {
          width: 200,
          height: 200,
          borderRadius: 100,
        },
        text: {
          textAlign: 'center',
          marginTop: 10,
          color: white,
          fontSize: 20,
        },
        contentContainer: {
          flexGrow: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        },
      });
      const className = this.props.state.selectSession.sessionName;
      let formattedPhone = this.props.state.specificStudent.emergencyContact ? this.props.state.specificStudent.emergencyContact.phone : '';
      if (formattedPhone.length) {
        const digitz = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        formattedPhone = formattedPhone.split('').filter(char => digitz.includes(char)).join('');
        formattedPhone = `${formattedPhone.slice(0, 3)}-${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6)}`;
      }
      return (
        <ImageBackground
          source={blackboard}
          style={{
            backgroundColor: '#000000',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            }}
        >
          <DashHeader
            navigation={this.props.navigation}
            className={className}
            back
          />
          <View style={styles.contentContainer}>
            <Image
              style={styles.image}
              source={{ uri: this.props.state.specificStudent.photoUrl }}
            />
            <Text h2 style={{ marginTop: 15, color: white }}>{`${this.props.state.specificStudent.nameFirst} ${this.props.state.specificStudent.nameLast}`}</Text>
            <Text h3 style={{ color: white }}>5th Grade</Text>
            {this.props.state.specificStudent.emergencyContact ?
              <View>
                <Text h4 style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: red }}>Emergency Contact</Text>
                <Text p style={styles.text}>{`${this.props.state.specificStudent.emergencyContact.nameFirst} ${this.props.state.specificStudent.emergencyContact.nameLast}`}</Text>
                <Text p style={styles.text} leftIcon="ios-call-outline" >{`${this.props.state.specificStudent.emergencyContact.address}`}</Text>
                <Text
                  p
                  style={{ textAlign: 'center', marginTop: 30, fontWeight: 'bold', color: white, fontSize: 30, marginLeft: -25 }}
                  onPress={() => this.callNumber(`tel:1-${formattedPhone}`)}
                >
                  <Icon name="ios-call" color="green" size={35} />
                  {`    ${formattedPhone}`}
                </Text>
              </View>
                    :
              <Text h3 style={{ marginTop: 30, color: white, fontSize: 20, textAlign: 'center' }}>This student has yet to create an Emergency Contact</Text>
                }
          </View>
        </ImageBackground>
      );
    }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(SpecificStudent);

SpecificStudent.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
