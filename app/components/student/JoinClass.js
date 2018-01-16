import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';


class JoinClass extends React.Component {
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
    const student = this.props.state.user;
    return (
      <View style={styles.container}>
        <Text h2>{`Hello ${student.First_name} ${student.Last_name}`}</Text>
        <FormLabel>Enter the Join Code for the class</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ text })}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          raised
          large
          title="Join!"
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  state,
});

JoinClass.propTypes = {
  state: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(JoinClass);
