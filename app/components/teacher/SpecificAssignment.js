import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Text, List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';

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
    });

    const students = this.props.state.assignmentCheck;
    const current = this.state.currentUrl;
    // console.log(current, 'this is current photoUrl');
    // console.log(this.props.state, 'this is props.state');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <Image
              style={{ width: 375, height: 700, justifyContent: 'center', marginTop: -625 }}
              // need to simply replace URI with variable current to get chosen photoUrl from student
              source={{ uri: 'http://res.cloudinary.com/fido/image/upload/v1516338431/osxdjtj2mpm9pmhrhbfr.jpg' }}
            />
            <View style={styles.innerContainer}>
              <Button
                onPress={() => this.closeModal()}
                title="Close"
              />
            </View>
          </View>
        </Modal>
        <Text h2 style={styles.container}>Assignment</Text>
        <List style={{ backgroundColor: '#fff' }}>
          {students.map(student => (
            student.photoUrl ?
              <ListItem
                containerStyle={styles.list}
                key={`bbbtn${student.id}`}
                title={`${student.nameFirst} ${student.nameLast}`}
                leftIcon={{ name: 'book' }}
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
                leftIcon={{ name: 'book' }}
                titleStyle={{ color: 'white' }}
              />
      ))}
        </List>
      </View>
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
