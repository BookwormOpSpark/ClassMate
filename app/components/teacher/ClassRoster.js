import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { SERVER_URI, classRoster } from '../../constant';

export default class ClassRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [
        { nameFirst: 'Susy', nameLast: 'Sunshine' },
        { nameFirst: 'Abby', nameLast: 'Applebottom' },
        { nameFirst: 'Peter', nameLast: 'Peppers' },
        { nameFirst: 'Timmy', nameLast: 'Toochi' },
        { nameFirst: 'Billy', nameLast: 'Bangers' },
        { nameFirst: 'Laura', nameLast: 'Lizard' },
        { nameFirst: 'Maggie', nameLast: 'Moonpie' },
        { nameFirst: 'Jimmy', nameLast: 'Junktown' },
        { nameFirst: 'Carli', nameLast: 'Cockwood' },
        { nameFirst: 'Charlie', nameLast: 'Checkers' },
      ],
    };
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
    axios.get(`${SERVER_URI}${classRoster}`)
      .then((res) => {
        console.error('res from classRoster post: ', res);
      })
      .catch(err => console.error(err));
    return (
      <View style={styles.container}>
        <Text h5>Your Class Roster</Text>

        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          // onPress={this.LogOut}
          iconRight={{ name: 'enhanced-encryption' }}
          backgroundColor="blue"
          rounded
          title="Button"
        />
      </View>
    );
  }
}
