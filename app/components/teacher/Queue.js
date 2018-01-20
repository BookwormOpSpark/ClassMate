import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { SERVER_URI, QueueRoute } from '../../constant';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.socket = io('https://a4d36169.ngrok.io');
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('new-message', (data) => {
      console.log(data);
      this.setState({ messages: [...data.message] });
    });
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
      list: {
        borderRadius: 10,
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
    });
    const { messages } = this.state;
    const className = this.props.state.selectSession.description || this.props.state.selectSession.className;

    return (
      <View style={styles.container}>
        <Text h2>Hands Raised for {className}</Text>
        {(messages.length > 0) ?
          <View style={{ flex: 1 }}>
            <List containerStyle={{ flex: 1 }}>
              {messages.map((item, id) => (
                <ListItem
                  containerStyle={styles.list}
                  key={`bbbtn${id}`}
                  title={`${item.student}`}
                  leftIcon={{ name: 'star' }}
                  titleStyle={{ color: 'white' }}
                  onPress={() => this.onSelect(item)}
                />
              ))}
            </List>
          </View> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Queue);


Queue.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
