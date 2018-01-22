/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default function FirstPage({ navigation }) {
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

    });
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: 'https://vignette.wikia.nocookie.net/docmcstuffins/images/1/10/Cranky_Susie_Sunshine.png/revision/latest?cb=20150101235424' }}
            />
            <Text h3 style={{ marginTop: 15 }}>Susy Sunshine</Text>
            <Text h4 style={{ marginTop: 10 }}>5th Grade</Text>
            <Text h5 style={{ marginTop: 30 }}>Emergency Contact</Text>
            <Text p style={{ marginTop: 10 }}>Sarah Sunshine</Text>
            <Text p style={{ marginTop: 2 }}>ssunshine@gmail.com</Text>
            <Text p style={{ marginTop: 2 }}>(123)-456-7890</Text>
        </View>
    );
}


// SpecificStudent.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };
