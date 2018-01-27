/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

class SpecificStudent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emergencyContact: [],
        }
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

    render(){
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
        },
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: this.props.state.specificStudent.photoUrl }}
            />
            <Text h3 style={{ marginTop: 15 }}>{`${this.props.state.specificStudent.nameFirst} ${this.props.state.specificStudent.nameLast}`}</Text>
            <Text h4>5th Grade</Text>
            {this.props.state.specificStudent.emergencyContact ? 
                <View>
                <Text h5 style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Emergency Contact</Text>
                <Text p style={styles.text}>{`${this.props.state.specificStudent.emergencyContact.nameFirst} ${this.props.state.specificStudent.emergencyContact.nameLast}`}</Text>
                <Text p style={styles.text}>{`${this.props.state.specificStudent.emergencyContact.address}`}</Text>
                <Text p style={styles.text}
                onPress={() => this.callNumber(`tel:1-${this.props.state.specificStudent.emergencyContact.phone}`)}
                >{`${this.props.state.specificStudent.emergencyContact.phone}`}</Text>
                </View>
                : 
                <Text h5 style={{ marginTop: 30 }}>This student has yet to create an Emergency Contact</Text> 
            }
        </View>
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
