
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { DocumentPicker } from 'expo';
import { Button, Text } from 'react-native-elements';
import { Container, Header, Content, Item, Input, Form, Icon } from 'native-base';
import { SERVER_URI, PostFunStuff } from '../../constant';

class FunPost extends React.Component {
  constructor(props) {
    super(props);
    console.log('state', this.props.state);
    this.state = {
      image: null,
      link: '',
    };
    this.postDocument = this.postDocument.bind(this);
    this.postLink = this.postLink.bind(this);
    this.pickDocument = this.pickDocument.bind(this);
  }


  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      this.setState({
        image: result,
      });
    }
    console.log('result', this.state.image);
    alert(`${this.state.image.name} selected!`);
  }

  postLink() {
    const session = this.props.state.selectSession.sessionID || 2;
    const { link } = this.state;
    console.log(link);
    axios.post(`${SERVER_URI}${PostFunStuff}/${session}`, { link })
      .then((res) => {
        console.log('res', res.data);
        this.props.navigation.navigate('Fun');
      })
      .catch(err => console.error(err));
  }

  postDocument() {
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

    return fetch(apiUrl, options).then((res) => {
      this.props.navigation.navigate('Fun');
    });
  }

  render() {
    const styles = StyleSheet.create({
      bigcontainer: {
        flex: 1,
        backgroundColor: '#fff',
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
          onPress={this.postDocument}
        />
        <Icon name="nutrition" color="red" />
        <Form>
          <Item rounded>
            <Input
              placeholder="Paste your link (youTube, gif, doc ...)"
              onChangeText={text => this.setState({ link: text })}
            />
          </Item>
        </Form>
        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Post Link!"
          iconRight={{ name: 'done' }}
          backgroundColor="green"
          rounded
          small
          onPress={this.postLink}
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
