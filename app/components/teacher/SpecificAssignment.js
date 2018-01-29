import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Image, ImageBackground } from 'react-native';
import { Text, List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Spinner } from 'native-base';
import blackboard from '../../assets/blackboard.jpg';
import { blue, white, yellow, orange, red, green, fireRed } from '../../style/colors';
import DashHeader from '../shared/Header';

class SpecificAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentUrl: null,
    };
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      list: {
        borderRadius: 5,
        borderColor: green,
        backgroundColor: green,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      list2: {
        borderRadius: 5,
        borderColor: red,
        backgroundColor: red,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
      },
      innerContainer: {
        alignItems: 'center',
        marginBottom: -650,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
      },
    });

    const students = this.props.state.assignmentCheck;
    const current = this.state.currentUrl;
    const className = this.props.state.selectSession.sessionName;
    // console.log(current, 'this is current photoUrl');
    // console.log(this.props.state, 'this is props.state');
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
          <Modal
            visible={this.state.modalVisible}
            animationType="slide"
            onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <Image
                style={{ width: 350, height: 650, justifyContent: 'center', marginTop: -600 }}
                // need to simply replace URI with variable current to get chosen photoUrl from student
                source={{ uri: current }}
              />
              <View style={styles.innerContainer}>
                <Button
                  onPress={() => this.closeModal()}
                  title="Close"
                />
              </View>
            </View>
          </Modal>
          <Text h2 style={{ backgroundColor: 'transparent', color: yellow, textAlign: 'center' }}>{this.props.state.specificAssignment.title}</Text>
          <List containerStyle={styles.contentContainer}>
            {students.map(student => (
              student.photoUrl ?
                <ListItem
                  containerStyle={styles.list}
                  key={`bbbtn${student.id}`}
                  title={`${student.nameFirst} ${student.nameLast}`}
                  leftIcon={{ name: 'book', color: 'black' }}
                  titleStyle={{ color: 'white' }}
                  onPress={() => {
                    this.openModal();
                    this.state.currentUrl = student.photoUrl;
                  }}
                />
              :
                <ListItem
                  containerStyle={styles.list2}
                  key={`bbbtn${student.id}`}
                  title={`${student.nameFirst} ${student.nameLast}`}
                  leftIcon={{ name: 'book', color: 'black' }}
                  titleStyle={{ color: 'white' }}
                />
        ))}
          </List>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(SpecificAssignment);

SpecificAssignment.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
