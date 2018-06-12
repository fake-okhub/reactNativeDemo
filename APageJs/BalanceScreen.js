import React from 'react';
import {
  Text,
  mage,
  Button,
  View,
  StyleSheet,
  NativeModules,
  DeviceEventEmitter,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
let width=Dimensions.get('window').width;
let constant = require('./constant');
export  default  class BalanceScreen extends React.Component {
  static navigationOptions = {
    title: '资金-demo演示',
    headerRight:<Button title="touch me" onPress={()=>{
    }}/>
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      TEXT:'我是小王子',
      columnID:'heh'
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.buttonStyle}>
        <TextInput
          style={[styles.baseStyle,styles.textInputStyle]}
          //站位符
          placeholder='RN界面传递的参数'
          onChangeText={(TEXT) => this.setState({TEXT})}/>
        <Button style={[styles.baseStyle,styles.button]}
          onPress={() => navigate('Chat',{msg:this.state.TEXT})}
          title="跳转Rn界面"
        />
        <Toast
          ref="toast"
          style={{backgroundColor:'grey'}}
          position='center'
        />
        <Text style={styles.baseStyle}
              selectable={true}
        >{this.state.TEXT + '\n'}</Text>
        <Button style={[styles.baseStyle,styles.buttonStyle]}
          onPress={() => this.clickToNative()}
          title="跳转到原生界面"
        />
        <Button style={[styles.baseStyle,styles.buttonStyle]}
                onPress={() => navigate('BaiduMap')}
                title="跳转到百度地图"
        />
        <Button style={[styles.baseStyle,styles.buttonStyle]}
                onPress={() => navigate('layoutDemo')}
                title="跳转到布局界面"
        />
        <Button style={[styles.baseStyle,styles.buttonStyle]}
                onPress={() => navigate('GetNetDemo')}
                title="跳转到获取网络界面"
        />
        {/*<TextInput*/}
          {/*style={[styles.baseStyle,styles.textInputStyle]}*/}
          {/*//站位符*/}
          {/*placeholder='输入传递的参数'*/}
          {/*onChangeText={(TEXT) => this.setState({TEXT})}/>*/}
        {/*<Button style={styles.buttonStyle}*/}
                {/*onPress={() => this.clickToNativeParams()}*/}
                {/*title="跳转到原生界面,并进行参数传递"*/}
        {/*/>*/}
      </ScrollView>
    );
  }


  clickToNative(){
    NativeModules.MyIntentModule.startActivityByClassname('com.douban.TestActiity')

    // NativeModules.MyIntentModule.startActivityForResult(
    //   "com.douban.TestActiity",100,
    //   (successMsg) => {
    //     this.setState({TEXT: successMsg, });
    //   },
    //   (erroMsg) => {alert(erroMsg)}
    // );

      // NativeModules.MyIntentModule.getDataFromIntent(
      //   (successMsg) =>{
      //     this.setState({TEXT: successMsg,}); //状态改变的话重新绘制界面
      //   },
      //   (erroMsg) => {alert(erroMsg)}
      // );
    // DeviceEventEmitter.addListener('EventName', function  (msg) {
    //   console.log(msg);
    //   ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + msg.key, ToastAndroid.SHORT)
    //
    // });
  }


  clickToNativeParams(){
    // alert("您输入的内容为："+this.state.TEXT);
    NativeModules.MyIntentModule.startActivityForResult(
      "com.douban.TestActiity",100,
      (successMsg) => {
        this.setState({TEXT: successMsg, });
      },
      (erroMsg) => {alert(erroMsg)}
    );
  }

  componentDidMount(){
    //native将数据传递到js
    NativeModules.MyIntentModule.dataToJS((msg) => {
        console.log(msg);

        constant.columnID = msg;
      if(constant.columnID!='没有数据'){
        this.props.navigation.navigate('Balances')
        this.refs.toast.show('JS界面:从Activity中传输过来的数据为:' + constant.columnID, DURATION.LENGTH_SHORT);
        this.state.TEXT=constant.columnID;
      }

      },
      (result) => {
        this.refs.toast.show('JS界面:错误信息为:' + result, DURATION.LENGTH_SHORT);
      })
  }

}

const styles = StyleSheet.create({
  baseStyle:{
    width:width,
    marginTop:2,
    marginBottom:2,
},
  textStyle:{
    justifyContent: 'center',
    textAlign:'center'
  },
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
  },
  buttonStyle:{
    margin:20,
  },
  textInputStyle:{
    borderRadius: 20,
  }

});