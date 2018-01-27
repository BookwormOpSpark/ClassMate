import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { blue, white, yellow, orange, red, green } from '../../style/colors.js'
import { specificAssignment, selectAssignment } from '../../actions/actions';

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.state.selectSession.sessionID,
    };
  }

  onSelect = async (item) => {
    await this.props.dispatch(selectAssignment(item));
    const format = {
      sessionId: this.state.sessionId,
      assignmentId: item.id,
    };
    await this.props.dispatch(specificAssignment(format));
    this.props.navigation.navigate('SubmitHomework');
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 110,
      },
      list: {
        borderRadius: 5,
        borderColor: blue,
        backgroundColor: blue,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
    });

    // const lessons = this.props.state.dashboard.assignments;
    const lessons = this.props.state.classInfo.assignments;


    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>

        <Text h2 style={{ textAlign: 'center', alignItems: 'center' }}>Assignments</Text>
        <List style={{ backgroundColor: '#fff' }}>
          {lessons && lessons.length > 0 ? lessons.map(assignment => (
            <ListItem
              containerStyle={styles.list}
              key={`bbbtn${assignment.id}`}
              title={`${assignment.title}`}
              leftIcon={{ name: 'book' }}
              titleStyle={{ color: 'white' }}
              onPress={() => this.onSelect(assignment)}
            />
        )) : null}
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
