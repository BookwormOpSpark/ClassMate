import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';

export default class SpecificAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: ['Algebra Worksheet', 'Book Report', 'History Worksheet'],
    };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

    const lessons = this.state.assignments;

    return (
      <View style={{ flex: 1 }}>
        <Text h1 style={styles.container}>Students</Text>
        <List>
          {lessons.map((assignment, id) => (
            <ListItem
              containerStyle={styles.list}
              key={`bbbtn${id}`}
              title={`${assignment}`}
              leftIcon={{ name: 'book' }}
              titleStyle={{ color: 'white' }}
              // onPress={() => this.onSelect(item)}
            />
        ))}
        </List>
      </View>
    );
  }
}