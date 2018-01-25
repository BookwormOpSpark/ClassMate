import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { SERVER_URI, classRoster } from '../../constant';

class ClassRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: this.props.state.classInfo.students,
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
    
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h1>{this.state.sessionName}</Text>
        <Text h2 style={styles.container}>Class Roster</Text>
        <ScrollView>
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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(ClassRoster);

ClassRoster.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
