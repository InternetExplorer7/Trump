/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
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
      <View>
        <Text style={styles.welcome}>
          Trump's travel ban app.
        </Text>
        <Text style={styles.instructions}>
          Enter your information to get started.
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'blue', borderWidth: 1}}
          onChangeText = {(text) => {
            this.setState({text})
          }}
          value={this.state.text}
          >
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
