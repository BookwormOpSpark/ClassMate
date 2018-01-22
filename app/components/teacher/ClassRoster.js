import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';
// import { SERVER_URI, classRoster } from '../../constant';

export default class ClassRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [
        { nameFirst: 'Susy', nameLast: 'Sunshine', studentId: 0 },
        { nameFirst: 'Abby', nameLast: 'Applebottom', studentId: 1 },
        { nameFirst: 'Peter', nameLast: 'Peppers', studentId: 2 },
        { nameFirst: 'Timmy', nameLast: 'Toochi', studentId: 3 },
        { nameFirst: 'Billy', nameLast: 'Bangers', studentId: 4 },
        { nameFirst: 'Laura', nameLast: 'Lizard', studentId: 5 },
        { nameFirst: 'Maggie', nameLast: 'Moonpie', studentId: 6 },
        { nameFirst: 'Jimmy', nameLast: 'Junktown', studentId: 7 },
        { nameFirst: 'Carli', nameLast: 'Cockwood', studentId: 8 },
        { nameFirst: 'Charlie', nameLast: 'Checkers', studentId: 9 },
      ],
    };
    // this.compileStudents.bind(this);
  }
  // compileStudents = studentArray => studentArray.map(student => (
  //   <ListItem
  //   containerStyle={styles.list}
  //   key={`bbbtn${id}`}
  //   leftIcon={{ name: 'torso' }}
  //   titleStyle={{ color: 'white' }}
  //   title={`${student.nameFirst} ${student.nameLast}`}
  //   onPress={() => this.props.navigation.navigate('SpecificStudent')}
  //   />
  // ));
  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 110,
      },
      list: {
        borderRadius: 5,
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
    });
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h1>{this.state.sessionName}</Text>

        <Text h2 style={styles.container}>Class Roster</Text>
        <List style={{ backgroundColor: '#fff' }}>
          {this.state.roster.map((student, id) => (
            <ListItem
              containerStyle={styles.list}
              key={`bbbtn${id}`}
              leftIcon={{ name: 'image' }}
              titleStyle={{ color: 'white' }}
              title={`${student.nameFirst} ${student.nameLast}`}
              onPress={() => this.props.navigation.navigate('SpecificStudent')}
              />
            ))}          
        </List>
      </View>
    );
  }
}
