import React, { Component } from 'react';
import { Container, Header, Content, SwipeRow, View, Text, Icon, Button } from 'native-base';

export default class TeacherClassSchedule extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content scrollEnabled={false}>
          <SwipeRow
            leftOpenValue={200}
            rightOpenValue={-200}
            swipeToOpenPercent={0.70}
            left={
              <Button success onPress={() => alert('Add')}>
                <Icon active name="add" />
              </Button>
            }
            body={
              <View>
                <Text>SwipeRow Body Text</Text>
              </View>
            }
            right={
              <Button danger onPress={() => alert('Trash')}>
                <Icon active name="trash" />
              </Button>
            }
          />
        </Content>
      </Container>
    );
  }
}
