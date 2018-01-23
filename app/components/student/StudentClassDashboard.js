import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class StudentClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    // console.log('student class dashboard', this.props.state)
    this.state = { text: '' };
  }

  render() {
    const className = this.props.state.selectSession.sessionName;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      badges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
    });

    return (
      <View style={styles.container}>
        <Text h1>{`${className} Class` || 'Class'}</Text>
        <Icon color="blue" name="rocket" size={30} />

        { /*       <Button
          onPress={() => this.props.navigation.navigate('CheckIn')}
          buttonStyle={[{ marginBottom: 5, marginTop: 60 }]}
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          title="CheckIn"
/> */}

        <View style={styles.badges}>

          <View style={styles.item}>
            <Icon color="#FF9F1C" name="paw" size={100} />
            <Button
              onPress={() => this.props.navigation.navigate('RaiseHand')}
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              backgroundColor="#FF9F1C"
              rounded
              small
              color="black"
              title="Raise Hand"
            />
          </View>

          <View style={styles.item}>
            <Icon color="#2EC4B6" name="book-open-variant" size={100} />
            <Button
              onPress={() => this.props.navigation.navigate('SubmitHomework')}
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              backgroundColor="#2EC4B6"
              small
              rounded
              title="Submit Homework"
            />
          </View>

          <View style={styles.item}>
            <Icon color="#01BAEF" name="calendar" size={100} />
            <Button
              onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              backgroundColor="#01BAEF"
              small
              rounded
              title="Daily Schedule"
            />
          </View>

          <View style={styles.item}>
            <Icon color="gold" name="lightbulb-on" size={100} />
            <Button
              onPress={() => this.props.navigation.navigate('Fun')}
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              backgroundColor="gold"
              small
              color="black"
              rounded
              title="Fun Stuffs!"
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(StudentClassDashboard);


StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
