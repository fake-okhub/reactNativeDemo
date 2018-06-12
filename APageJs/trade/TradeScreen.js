import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import TabNavigator from 'react-native-tab-navigator';
import Toast, {DURATION} from 'react-native-easy-toast'
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";
import TradeHome from "./TradeHome";
import TabBottom from "../utils/TabBottom";
import CurrentEntrust from "./CurrentEntrust";
import HistoryEntrust from "./HistoryEntrust";
import WeixinTabBar from "../utils/WeixinTabBar";

let screenWidth = Dimensions.get('window').width;

const tabTitles = ['首页', '我的'];
export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNames: ['Tab1', 'Tab2', 'Tab3', 'Tab4'],
      tabIconNames: ['ios-paper', 'ios-albums', 'ios-paper-plane', 'ios-person-add'],
    };
  }

  static navigationOptions = {
    headerLeft:(<Text style={{color:'#ffffff',fontSize:16,marginLeft:10}}>LTC/BTC ∨</Text>),
    headerRight:(<Text style={{color:'#ffffff',fontSize:16,marginRight:10}}>∧ 0.00175834</Text>),
  };

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    return (
      /*tabBarInactiveTextColor  tab文字未选中的颜色*/
      /*tabBarActiveTextColor  tab文字选中的颜色*/
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar
          style={{backgroundColor:'#607d8b'}}/>}
        tabBarUnderlineStyle={styles.lineStyle}
        tabBarInactiveTextColor="#ffffff"
        tabBarActiveTextColor='#ffffff'>

        <View style={styles.textStyle} tabLabel='交易'><TradeHome/></View>
        <View style={styles.textStyle} tabLabel='交易委托'><CurrentEntrust/></View>
        <View style={styles.textStyle} tabLabel='历史委托'><HistoryEntrust/></View>
      </ScrollableTabView>
    )
      ;
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabView: {
    height: 70,
    backgroundColor: '#607d8b',
    alignItems: 'center'
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:'#607d8b'
  },
  titleText:{
    color:'#ffffff',
    fontSize:16,
  },
  lineStyle: {
    width: screenWidth / 3,
    height: 3,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    flex: 1,
    flexDirection:'column',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    flex: 1
  }


});