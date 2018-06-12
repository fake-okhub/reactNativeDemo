/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

//获取屏幕信息
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
const textInputArray = [{
  key:0,
  placeholder:'BTC',
  text:'Prive'
},{
  key:1,
  placeholder:'BTC',
  text:'Amount'
},{
  key:2,
  placeholder:'BTC',
  text:'Total'
}];
export default class TextInputG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceText: '',
      amountText: '',
      totalText: '',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {textInputArray.map((item,index)=>(
          <View key={item.key} tabLabel={item.title} style={styles.textInputViewStyle}>
            <TextInput underlineColorAndroid={'transparent'} style={styles.textInputStyle} autoFocus={false}
                       multiline={false} value={this.state.LongSize}  keyboardType='numeric'
                       placeholder={item.placeholder}
                       onChangeText={(text) => {
                         if (item.key==0){
                           this.setState({ priceText: this.chkPrice(text) })
                         }else if (item.key==1){
                           this.setState({ amountText: this.chkPrice(text) })
                         }else if (item.key==2){
                           this.setState({ totalText: this.chkPrice(text) })
                         }

            }}
            />
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>
        ))}
      </View>
    );
  }

  chkPrice(obj) { //方法1
    obj = obj.replace(/[^\d.]/g, "");
    //必须保证第一位为数字而不是.
    obj = obj.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    obj = obj.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    return obj;
  }
  chkLast(obj) {
    // 如果出现非法字符就截取掉
    if (obj.substr((obj.length - 1), 1) == '.')
      obj = obj.substr(0, (obj.length - 1));
  }
}

const styles = StyleSheet.create({
  container: {
    //设置占满屏幕
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-around'
    // backgroundColor: 'black',

  },
  //包裹输入框View样式
  textInputViewStyle: {
    //设置宽度减去30将其居中左右便有15的距离
    width: width/3 - 10,
    height: 45,
    //设置圆角程度
    borderRadius: 1,
    //设置边框的颜色
    borderColor: 'grey',
    //设置边框的宽度
    borderWidth: 1,
    //内边距
    paddingLeft: 5,
    paddingRight: 5,
    //外边距
    //设置相对父控件居中
    alignSelf: 'center',


  },
  //输入框样式
  textInputStyle: {
    width: width/3 - 10,
    backgroundColor: '#00000000',
    // alignSelf: 'center',
    //根据不同平台进行适配
    marginTop: Platform.OS === 'ios' ? 4 : 8,
    position:'absolute',
    left:0,
    bottom:0,
    paddingLeft:3,
    paddingBottom:3,
    alignItems:'stretch'
  },
  textStyle:{
    position:'absolute',
    right:0,
    top:0,
    fontSize:10,
    paddingRight:2,
    paddingTop:2


  }


});
