
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, View } from 'react-native';
import { DocumentPicker, ImagePicker } from 'expo';
import { Button, Text, Header } from 'react-native-elements';
import { SERVER_URI, PostFunStuff } from '../../constant';

class FunPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
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
      });
    }
  }

  postFunStuff() {
    // const participant = this.props.state.participantid;
    // const assignment = this.props.state.assignmentid;
    const apiUrl = `${SERVER_URI}${PostFunStuff}`;// need to update here
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
          title="Pick Document"
          iconRight={{ name: 'attach-file' }}
          backgroundColor="blue"
          rounded
          onPress={this.pickDocument}
        />
        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Post to FunStuffs!"
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
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

FunPost.propTypes = {
  state: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(FunPost);
