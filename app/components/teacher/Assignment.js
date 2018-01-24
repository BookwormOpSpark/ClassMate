import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { specificAssignment, selectAssignment } from '../../actions/actions';
import { SERVER_URI, CheckAssignment } from '../../constant';

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.state.selectSession.sessionID,
    };
  }

  onSelect = async (item) => {
    // console.log('item', item);
    await this.props.dispatch(selectAssignment(item));
    await axios.get(`${SERVER_URI}${CheckAssignment}`, {
      params: {
        sessionId: this.state.sessionId,
        assignmentId: item.id,
      },
    }).then((res) => {
      // console.log('classInfo', res.data);
      this.props.dispatch(specificAssignment(res.data));
    })
      .catch(err => console.error(err));
    this.props.navigation.navigate('SpecificAssignment');
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
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
    });

    // const lessons = this.props.state.dashboard.assignments;
    const lessons = this.props.state.classInfo.assignments;
    const className = this.props.state.selectSession.sessionName;


    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h1>{className}</Text>

        <Text h2 style={styles.container}>Assignments</Text>
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
