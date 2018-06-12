/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  Text,Image,Button,View,StyleSheet,ToastAndroid,NativeModules
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';

import DemoApp from './APageJs/DemoApp'
import SafetyScreen from './APageJs/SafetyScreen'
import NoticeScreen from './APageJs/NoticeList'
import WebPage from './APageJs/WebPage'
import BalanceScreen from './APageJs/BalanceScreen'
import BaiduMapPage from './APageJs/demo/BaiduMap'
import layoutDemo from './APageJs/demo/layoutDemo'
import GetNetDemo from './APageJs/demo/GetNetDemo'
import TradeScreen from './APageJs/trade/TradeScreen'
import TradeHome from "./APageJs/trade/TradeHome";
import CurrentEntrust from "./APageJs/trade/CurrentEntrust";
import HistoryEntrust from "./APageJs/trade/HistoryEntrust";
let constant = require('./APageJs/constant');

class Market extends React.Component {
  constructor(props) {
    super(props);
  };
  static navigationOptions={
    headerTitle:'bitGlobal'
  }
  render() {
    return <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
      <Text>我是行情</Text>
    </View>
  }

}




const MainScreenNavigator = TabNavigator({
  Market: { screen: Market,
    navigationOptions: {
      tabBarLabel: '行情',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./image/tabbarBottom/menu_ico_market.png')}
          style={[{tintColor: tintColor},styles.icon]}
        />
      ),
    }
  },
  Trade: { screen: TradeScreen ,
    navigationOptions: {
      tabBarLabel: '交易',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./image/tabbarBottom/menu_ico_trans.png')}
          style={[{tintColor: tintColor},styles.icon]}
        />
      ),
    }
  },
  Balances: { screen: BalanceScreen,
    navigationOptions: {
      tabBarLabel: '资产',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./image/tabbarBottom/menu_ico_asset.png')}
          style={[{tintColor: tintColor},styles.icon]}
        />
      ),
    }
  },
  User: { screen: SafetyScreen,
    navigationOptions: {
      tabBarLabel: '设置',
      tabBarIcon: ({tintColor}) => (
        <Image
          source={require('./image/tabbarBottom/menu_ico_user.png')}
          style={[{tintColor: tintColor},styles.icon]}
        />
      ),
    }
  },
},
  {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
      activeTintColor: '#4E84B2', // 文字和图片选中颜色
      inactiveTintColor: '#999', // 文字和图片默认颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
      style: {
        backgroundColor: '#fff', // TabBar 背景色
      },
      labelStyle: {
        fontSize: 12, // 文字大小
      },
    },
  }

);


const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator,
    navigationOptions: {
      headerStyle:{backgroundColor:'#607d8b'},//标题背景
      headerTintColor:'white',//标题颜色
      headerBackTitle:null,
    }
  } ,
  Chat: {screen: DemoApp},
  Notice:{screen:NoticeScreen},
  Web:{screen:WebPage},
  BaiduMap:{screen:BaiduMapPage},
  layoutDemo:{screen:layoutDemo},
  GetNetDemo:{screen:GetNetDemo},



});

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain'
  },
});

AppRegistry.registerComponent('ReactDemo', () => SimpleApp);