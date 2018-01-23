import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionName: "Mr. Ledet's Fifth Grade",
      assignments: ['Algebra Worksheet', 'Book Report', 'Math Worksheet'],
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
    });

    // const lessons = this.props.state.dashboard.assignments;
    const lessons = this.props.state.dashboard.sessionInfo.assignments;
    const className = this.props.state.selectSession.sessionName;
    console.log(this.props.state, 'Assignment Props')


    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h1>{className || 'Class'}</Text>

        <Text h2 style={styles.container}>Assignments</Text>
        <List style={{ backgroundColor: '#fff' }}>
          {lessons && lessons.length > 0 ? lessons.map((assignment, id) => (
            <ListItem
              containerStyle={styles.list}
              key={`bbbtn${id.id}`}
              title={`${assignment.title}`}
              leftIcon={{ name: 'book' }}
              titleStyle={{ color: 'white' }}
              onPress={() => this.props.navigation.navigate('SpecificAssignment')}
            />
        )) : ''}
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Assignment);

Assignment.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};