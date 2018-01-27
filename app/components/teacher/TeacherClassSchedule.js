import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';

class TeacherClassSchedule extends Component {
  render() {
    return (
      <Container>


        <Content padder style={{ padding: 20 }}>
          <View style={{ flexDirection: 'column' }}>
            
            <Button iconLeft danger>
              <Icon active name="close" />
              <Text>Trash</Text>
            </Button>

            <Button
              danger
              bordered
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
            <Text>Hello</Text>  
              <Icon active name="trash" />
            </Button>

            <Button
              danger
              transparent
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="trash" />
            </Button>

            <Button iconLeft success>
              <Icon active name="ios-add-circle-outline" />
              <Text>Add More Stuff</Text>
            </Button>

            <Button
              onPress={() => this.props.navigation.navigate('TeacherFunNavigation')}
              buttonStyle={[{ marginBottom: 40, marginTop: 10 }]}
              iconRight={{ name: 'done' }}
              backgroundColor="green"
              title="Add more stuff!"
              small
            />

          </View>
        </Content>
      </Container>
    );
  }
}

export default TeacherClassSchedule;

// <Button
//   onPress={() => this.onDelete(item)}
//   buttonStyle={[{ height: 20, width: 310 }]}
//   iconRight={{ name: 'remove-circle-outline' }}
//   backgroundColor="red"
//   title={`Uploaded ${}   DELETE`}
// />
