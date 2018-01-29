import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem, Text } from 'react-native-elements';
import { SERVER_URI } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';


class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: '',
      messages: [],
    };

    this.socket = io(SERVER_URI, {
      autoConnect: false,
    });

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.socket.open();

    this.socket.on('connect', () => {
      this.setState({
        now: Date.now(),
      });
    });

    this.socket.on('new-message', (data) => {
      this.setState({ messages: [...this.state.messages, data.message] });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  onSelect(item) {
    const { messages } = this.state;
    const index = messages.indexOf(item);
    messages.splice(index, 1);
    this.setState({ messages });
  }


  render() {
    const className = this.props.state.selectSession.sessionName || this.props.state.selectSession.className;
    const { messages } = this.state;

    return (
      <ImageBackground
        source={blackboard}
        style={{
          backgroundColor: '#000000',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <View style={styles.sensor}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            scrollEnabled
          >
            <View style={{ alignItems: 'center' }}>
              <Text h1 style={{ color: '#f4d35e' }}>{className || 'Class'}</Text>
              <Text h4 style={{ color: '#f4d35e' }}>
                {this.state.messages.length > 0 ? 'Hands Raised' : 'No Hands Currently Raised' }
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              {(messages.length > 0) ?
                <View style={{ flex: 1 }}>
                  <List
                    containerStyle={{ flex: 1, backgroundColor: 'transparent' }}
                  >
                    {messages.map((item, id) => (
                      <ListItem
                        containerStyle={styles.list}
                        key={`bbbtn${id}`}
                        title={`${item.student}`}
                        subtitle={moment(this.state.now).from(moment(item.time))}
                        subtitleStyle={{ color: 'black' }}
                        leftIcon={{ name: 'star', color: 'white' }}
                        titleStyle={{ color: 'black' }}
                        onPress={() => this.onSelect(item)}
                      />
                  ))}
                  </List>
                </View> : null}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  sensor: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  contentContainer: {
    flexGrow: 1,
  },
  list: {
    borderRadius: 10,
    borderColor: '#f4d35e',
    backgroundColor: '#f4d35e',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Queue);


Queue.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
