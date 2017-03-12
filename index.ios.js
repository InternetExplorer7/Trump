/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';

export default class Trump extends Component {
  constructor(){
    super();
    this.state = {
      text: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Trump's travel ban app.
        </Text>
        <Form/>
        <KeyboardSpacer/>
      </View>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['Yo', 'Okay'],
      text: 'placeholder.'
    }
  }

  render() {
    var _scrollView: ScrollView;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {this.state.messages.map((v, i) => {
            return <MessageInput key={i} value={v}/>
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({y: 0}); }}>
          <Text>Scroll to top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to bottom</Text>
        </TouchableOpacity>
        <TextInput
        style = {{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText = {text => {
          this.setState({text})
        }}
        value = {this.state.text}/>
        <Button
          onPress={this.sendText}
          title="Send."
          color="#841584"
        />
      </View>
    )
  }

  sendText(){

  }
}

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      index: props.index
    }
  }
  
  render() {
    return (
      <Text>{this.state.value}</Text>
    )
  }
}

setMessage = (v, i) => {<Text key={i}>{v}</Text>}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    width: '100%',
    height: '20%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});

AppRegistry.registerComponent('Trump', () => Trump);
