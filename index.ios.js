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
      <View style={styles.title}>
        <Text style={styles.welcome}>
          Can I return to America?
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
      messages: [],
      text: ''
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
            if (v.isAi) {
              return <MessageInput key={i} value={v.message}/>
            }
            return <MessageInput key={i} value={v.message}/>
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
        placeholder="Type to talk to Watson"
        style = {{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText = {text => {
          this.setState({text})
        }}
        value = {this.state.text}/>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={this.sendText.bind(this)}
            title="Send"
            color="olivedrab"
          />
          <Button
              onPress={this.reset.bind(this)}
            title="Restart"
            color="olivedrab"
          />
          </View>
        </View>
    )
  }

  reset(){
    var messagesCopy = this.state.messages;
    fetch("https://hackuvic-kavehkhorram.c9users.io/eraseContext", {method : "post"});
    messagesCopy.length = 0;
    this.setState({
      messages: messagesCopy,
      text: ''
    })
  }

  sendText(){
      var messages = this.state.messages;
      fetch('https://hackuvic-kavehkhorram.c9users.io/fetch/watson', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: this.state.text.trim()
      })
    })
      .then(response => { return response.json() })
      .then(response => {
        const message = response.text[0];
        messages.push({isAi: false, message: this.state.text.trim()})
        messages.push({isAi: true, message: message})
        this.setState({
          messages: messages,
          text: ''
        })
      })
      .catch(e => {
        console.log('e: ' + e);
      })
  } // sendText
} // class

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
    borderBottomColor: 'black',
    borderBottomWidth: .4,
    backgroundColor: 'whitesmoke',
    width: '100%',
    height: '20%',
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
    color: 'white',
    fontFamily: "Trebuchet MS",
    fontWeight: "100",
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'

  },
  title: {
    flex: 1,
    height:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'olivedrab',
    shadowColor: 'black',
    shadowOffset: {width: 50, height: 50},
    shadowOpacity:50,
    shadowRadius: 50
  },
  buttonBottom: {
    flex:1,
    flexDirection:'column',
    backgroundColor: 'olivedrab'
  }
});

AppRegistry.registerComponent('Trump', () => Trump);
