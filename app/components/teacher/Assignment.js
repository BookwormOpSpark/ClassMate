import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import axios from 'axios';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
import blackboard from '../../assets/blackboard.jpg';
import { specificAssignment, selectAssignment } from '../../actions/actions';
import { SERVER_URI, CheckAssignment } from '../../constant';
import DashHeader from '../shared/Header';

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
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 110,
      },
      list: {
        borderRadius: 5,
        borderColor: white,
        backgroundColor: white,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
      },
    });

    // const lessons = this.props.state.dashboard.assignments;
    const lessons = this.props.state.classInfo.assignments;
    const className = this.props.state.selectSession.sessionName;


    return (
      <ImageBackground
        source={blackboard}
        style={{
          backgroundColor: '#000000',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <DashHeader
          navigation={this.props.navigation}
          className={className}
          back
        />
        <View style={styles.contentContainer}>

          <Text h2 style={{ textAlign: 'center', alignItems: 'center', color: yellow }}>Assignments</Text>
          <List containerStyle={styles.contentContainer}>
            {lessons && lessons.length > 0 ? lessons.map(assignment => (
              <ListItem
                containerStyle={styles.list}
                key={`bbbtn${assignment.id}`}
                title={`${assignment.title}`}
                subtitle={assignment.dueDate}
                leftIcon={{ name: 'book', color: 'black' }}
                titleStyle={{ color: 'black' }}
                onPress={() => this.onSelect(assignment)}
              />
          )) : null}
          </List>
          <Button
            block
            success
            style={{ marginBottom: 45 }}
            onPress={() => this.props.navigation.navigate('CreateAssignment')}
          >
            <Text style={{ fontSize: 20 }}>Create a New Assignment</Text>
          </Button>
        </View>
      </ImageBackground>
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
