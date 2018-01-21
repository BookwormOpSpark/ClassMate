import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';

export default class SpecificAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        { name: 'Dorothy Messanger', photoUrl: null },
        { name: 'Bryan Putz', photoUrl: 'heres a photoUrl' },
      ],
    };
  }
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
      list2: {
        borderRadius: 5,
        borderColor: 'red',
        backgroundColor: 'red',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
    });

    const students = this.state.students;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h2 style={styles.container}>Assignment</Text>
        <List style={{ backgroundColor: '#fff' }}>
          {students.map((student, id) => (
            student.photoUrl ?
              <ListItem
                containerStyle={styles.list}
                key={`bbbtn${id}`}
                title={`${student.name}`}
                leftIcon={{ name: 'book' }}
                titleStyle={{ color: 'white' }}
              />
            :
              <ListItem
                containerStyle={styles.list2}
                key={`bbbtn${id}`}
                title={`${student.name}`}
                leftIcon={{ name: 'book' }}
                titleStyle={{ color: 'white' }}
              />
      ))}
        </List>
      </View>
    );
  }
}
