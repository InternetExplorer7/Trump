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
            return <MessageInput key={i} isAi={v.isAi} value={v.message}/>
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
        // alert('response: ' + response.output.text[0]);
        // nationalities_array: [String] <response.context>
        // visa: String <response.context>
        const nationalities_array = response.context.nationalities_array;
        const visa = response.context.visa;
        const message = response.output.text[0];
        messages.push({isAi: false, message: this.state.text.trim()})
        messages.push({isAi: true, message: message})
        if (message.indexOf('tabulate') > -1) {
          // Reached the end.
          alert('visa: ' + visa + '; na: ' + nationalities_array.length);
          if (visa && nationalities_array.length > 0) {
            if(visa === 'H1-B' && (nationalities_array.includes('Syria') || nationalities_array.includes('Iran'))) {
              messages.push({isAi: true, message: "You're on a H1-B Visa and with citizenship from a banned country -- your H1-B is going to be banned soon. Your warning level is high for re-entering the U.S. if you leave."})
              messages.push({isAi: true, message: 'Relevant case one: The new US President imposed a controversial 90-day ban on travellers from seven countries - Iran, Iraq, Libya, Somalia, Sudan, Syria and Yemen - in January. '})
              messages.push({isAi: true, message: 'Relevant case two: But after the ban was lifted by the courts, Mr Trump issued a new ban that removed Iraq from the list of countries affected by the travel ban.'})
              messages.push({isAi: true, message: 'Relevant case three: Donald Trump has said that the affected countries were identified by Barack Obama’s administration as “sources of terror”.'})
            } else if ((visa === 'B-1' || visa === 'B-2') && (nationalities_array.includes('Iran') || nationalities_array.includes('Syria'))) {
              messages.push({isAi: true, message: "You're on a recreational business purposes visa from a banned country -- which is risky for you to leave. Your warning level is medium for re-entering the U.S. if you leave."})
            } else {
              messages.push({isAi: true, message: "You're fine! You're able to travel without having to worry about being able to come back!"})
            }
          } else if (visa) {
            // Just Visa
            if (visa === 'H1-B') {
              messages.push({isAi: true, message: "You're on a H1-B Visa -- your H1-B is going to be banned soon. Your warning level is medium-high for re-entering the U.S. if you leave."});
            } else if ((visa === 'B-1' || visa === 'B-2')) {
              messages.push({isAi: true, message: "You're on a recreational business purposes visa -- which is currently OKAY to have. Your warning level is low for re-entering hte U.S. if you leave."})
              messages.push({isAi: true, message: "The new ban only applies to people from the six countries without current visas, like temporary, non-immigrant visas for students and workers. Students with valid F, M or J visas will be allowed. The original ban also affected current visa holders who would normally be allowed to travel and re-enter the country."});
              messages.push({isAi: true, message: "During the rollout of the first ban, many visa holders were stuck abroad or detained in American airports. Later, a State Department official said that “fewer than 60,000” visas had been provisionally revoked. Several judges who issued injunctions against the original order raised concerns that due process rights were being violated."});
            }
          } else if (nationalities_array.length > 0) {
            nationalities_array.forEach((v, i) => {
              if (BANNED_COUNTRIES.has(v)) {
                messages.push({isAi: true, message: "You're a citizen of one of the banned countries, " + v + ". This is very high risk and you should not consider leaving the United States right now."})
                messages.push({isAi: true, message: 'Relevant case one: The new US President imposed a controversial 90-day ban on travellers from seven countries - Iran, Iraq, Libya, Somalia, Sudan, Syria and Yemen - in January. '})
                messages.push({isAi: true, message: 'Relevant case two: Donald Trump has said that the affected countries were identified by Barack Obama’s administration as “sources of terror”.'})
                messages.push({isAi: true, message: 'Please contact a volunteer from the ACLU as soon as possible at 206.624.2180'})
              }
            })
          }
        }
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

var BANNED_COUNTRIES = new Set();
BANNED_COUNTRIES.add('Libya');
BANNED_COUNTRIES.add('Sudan');
BANNED_COUNTRIES.add('Syria');
BANNED_COUNTRIES.add('Iran');
BANNED_COUNTRIES.add('Yemen');
BANNED_COUNTRIES.add('Somalia');

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      index: props.index,
      isAi: props.isAi
    }
  }
  render() {
    if(this.state.isAi) {
      return <Text style={styles.ai}>{this.state.value}</Text>
    } else {
      return <Text style={styles.human}>{this.state.value}</Text>
    }
  }
}


setMessage = (v, i) => {<Text key={i}>{v}</Text>}

const styles = StyleSheet.create({
  scrollView: {
    borderBottomColor: 'black',
    borderBottomWidth: .4,
    backgroundColor: 'whitesmoke',
    width: '100%',
    height: '20%'
  },
  ai: {
    backgroundColor: 'darkseagreen',
    color: 'white',
    width: '100%',
    fontSize: 32,
    textAlign: 'right'
  }, human: {
    backgroundColor: 'lavender',
    color: 'black',
    width: '100%',
    fontSize: 32,
    textAlign: 'left'
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
