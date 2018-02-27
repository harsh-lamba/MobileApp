/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo,
  WebView,
  Animated,
  Easing,
  Button,
  Alert
} from 'react-native';

class DemoComponent extends React.Component{
  state = {
    alpha: ''
  }
  componentWillMount(){
    Alert.alert('Mounted')
    this.setState({alpha: 'Mounted'})
  }

  render(){
    return (
      <View><Text>{this.state.alpha}</Text></View>
    )
  }
}

export default class App extends Component<{}> {
  constructor(){
    super();
    this.state = {
      error: {},
      offline: false
    }
  }
  componentDidMount(){
    NetInfo.addEventListener(
      'connectionChange', 
      this.handleFirstConnectivityChange
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <Button
            style={{backgroundColor: '#eee', position: 'absolute', height: 30, top:30,left:0}}
            onPress={this.onButtonClick}
            title='offline'
            color='#841584'
          />
        <WebView
          ref={view => this.webViewRef=view}
          style={{flex:10}} 
          source={{uri: 'https://www.ayco.com/login'}}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          renderError={this.onRenderError}
        />
        {
          this.state.error.code &&
          <ErrorComponent
            style={{flex:1}}
            errorCode={this.state.error.code}
            errorName={this.state.error.url}
            />
        }
      </View>
    );
  }

  onLoadStart = () => {
    console.log('start');
  }

  onButtonClick = () => {
    this.setState({offline: !this.state.offline})
  }

  onError = (res) => {
    if (res.nativeEvent){
      this.setState({error: res.nativeEvent})
    }
  }

  handleFirstConnectivityChange = (connectionInfo) => {
    console.log(connectionInfo);
    console.log(this.webViewRef);
    if (connectionInfo.type !== 'none'){
      this.webViewRef.reload();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'relative',
    flexDirection: 'column'
  },
  animatedView: {
    position: 'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  slowConnectionPrompt: {
    flex: 1,
    position:'absolute',
    alignItems: 'stretch',
    bottom: 50, left:10, right:10,
    backgroundColor: '#000000', opacity:0.7,
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center'
  },
  warningText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center'
  },
  offline: {
    flex: 1,
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
