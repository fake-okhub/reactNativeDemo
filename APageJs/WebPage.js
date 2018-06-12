
import  React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  WebView
} from 'react-native';
var DEFAULT_URL = 'http://www.baidu.com';
export default class WebPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `公告详情`,
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex:1}}>
        <WebView
                 source={{uri:params.url}}
                 startInLoadingState={true}
                 domStorageEnabled={true}
                 javaScriptEnabled={true}
                 scalesPageToFit={true}
        >
        </WebView>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  webview_style:{
    backgroundColor:'#00ff00',
  }
});