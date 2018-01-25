import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';

class CreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <Text h1>Create an Assignment Here!</Text>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(CreateAssignment);

CreateAssignment.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
