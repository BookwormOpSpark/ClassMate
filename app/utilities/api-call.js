import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';
import axios from 'axios';
import { SERVER_URI } from '../constant';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
      axios.get(`${SERVER_URI}/hello`)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => {
          console.error(err);
      })
  }

  

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>Hello</Text>
      </View>
    );
  }
}
