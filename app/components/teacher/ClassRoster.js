import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, Button, List, ListItem } from 'react-native-elements';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
// import { SERVER_URI, classRoster } from '../../constant';

class ClassRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: this.props.state.classInfo.students,
    };
  }

  render() {
    console.log(this.state.roster, 'this is roster');
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
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      badges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text h1>{this.state.sessionName}</Text>
        <Text h2 style={styles.container}>Class Roster</Text>
        <ScrollView>
          <View style={styles.badges}>
            {this.state.roster.map(student => (
              <View style={styles.item}>
                <Icon name="logo-octocat" color="black" size={100} />
                <Button
                  small
                  key={`bbbtn${student.id}`}
                  backgroundColor={blue}
                  color="white"
                  buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                  title={`${student.nameFirst} ${student.nameLast}`}
                  onPress={() => this.props.navigation.navigate('SpecificStudent')}
                />
              </View>
              ))}
          </View>
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
