
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Form, View, Item, Input, Content } from 'react-native';
import { DocumentPicker } from 'expo';
import { Button, Text, Header } from 'react-native-elements';
import { SERVER_URI, PostFunStuff } from '../../constant';

class FunPost extends React.Component {
  constructor(props) {
    super(props);
    console.log('state', this.props.state);
    this.state = {
      image: null,
      text: '',
    };
    this.postFunStuff = this.postFunStuff.bind(this);
    this.pickDocument = this.pickDocument.bind(this);
  }


  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    console.log('result', result);
    if (!result.cancelled) {
      this.setState({
        image: result,
        text: '',
      });
    }
    alert(`${this.state.image} selected!`);
  }

  postFunStuff() {
    const session = this.props.state.selectSession.sessionID || 2;

    const apiUrl = `${SERVER_URI}${PostFunStuff}/${session}`;// need to update here
    const { name, uri } = this.state.image;
    const uriParts = name.split('.');
    const fileType = uriParts[uriParts.length - 1];
    console.log(fileType);

    const formData = new FormData();
    formData.append('document', {
      uri,
      name,
      type: `application/${fileType}`,
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options);
  }

  render() {
    const styles = StyleSheet.create({
      bigcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    });

    const className = this.props.state.selectSession.sessionName;


    return (
      <View style={styles.bigcontainer}>
        <Text h3 style={{ color: 'blue', textAlign: 'center', marginBottom: 50 }}>
          Post Fun Stuffs for Class {className}
        </Text>

        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Pick Documents"
          iconRight={{ name: 'attach-file' }}
          backgroundColor="blue"
          rounded
          onPress={this.pickDocument}
        />
        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Post Documents!"
          iconRight={{ name: 'done' }}
          backgroundColor="green"
          rounded
          onPress={this.postFunStuff}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FunPost);
FunPost.propTypes = {
  state: PropTypes.object.isRequired,
};
