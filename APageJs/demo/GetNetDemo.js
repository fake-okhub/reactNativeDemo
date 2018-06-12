import  React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Boolean,
  ProgressBarAndroid,
} from 'react-native';
import NetUtil from '../utils/NetUtil';
import ModalDialog from '../utils/ModalDialog'
import Loading from '../utils/LoadingDialog'
import Toast, {DURATION} from 'react-native-easy-toast'
let screenWidth=Dimensions.get('window').width;
export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      isLoadingVisible : false,
      netText:'我是网络请求返回的文本',
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Button style={[styles.baseStyle,styles.button]}
                onPress={() => this._fetchGetData()}
                title="get请求"
        />
        <Button style={[styles.baseStyle,styles.button]}
                onPress={() => this.__fetchPostData()}
                title="post请求"
        />
        <Button style={[styles.baseStyle,styles.button]}
                onPress={() => this.showDialog(true)}
                title="自定义弹窗"
        />
        <Button style={[styles.baseStyle,styles.button]}
                onPress={() => this.setState({isLoadingVisible:true})}
                title="loading弹窗"
        />
        <Text>{this.state.netText + '\n'}</Text>
        <ModalDialog
          _dialogVisible={this.state.isDialogVisible}
          _dialogLeftBtnAction={()=> {this.showDialog(false)}}
          _dialogRightBtnAction={()=>{this.showDialog(false)}}
        />
        <Loading
          _dialogVisible={this.state.isLoadingVisible}
        />

      </ScrollView>
    );
  }

  showDialog(isDialogVisible){
    if (isDialogVisible){
      this.setState({isDialogVisible:true});
    }else {
      this.setState({isDialogVisible:false});
    }
  }

  showLoadingDialog(isLoadingVisible){
    if (isLoadingVisible){
      this.setState({isLoadingVisible:true});
    }else {
      this.setState({isLoadingVisible:false});
    }
  }



  _fetchGetData(){
    let that=this;
    // that.showLoadingDialog(true);
    //get请求,以百度为例,没有参数,没有header
    NetUtil.get('https://www.baidu.com/','',function (set) {
      //下面是请求下来的数据
      console.log(set)
      that.setState({netText:set.url});
      // this.state.netText=set.url;
      // alert(set.json.toString());
      // that.showLoadingDialog(false);
    })
  }

  __fetchPostData(){
    this.showLoadingDialog(true);
    let params = {'start':'0',limit:'20','isNeedCategory': true, 'lastRefreshTime': '2016-09-25 09:45:12'};
    NetUtil.post('http://www.pintasty.cn/home/homedynamic',params,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJVLTliZGJhNjBjMjZiMDQwZGJiMTMwYWRhYWVlN2FkYTg2IiwiZXhwaXJhdGlvblRpbWUiOjE0NzUxMTg4ODU4NTd9.ImbjXRFYDNYFPtK2_Q2jffb2rc5DhTZSZopHG_DAuNU',function (set) {
      //下面的就是请求来的数据
      console.log(set)
      alert(set.message+"status:"+set.status);
      this.showLoadingDialog(false);
    })
  }


  renderFirstItem(){
    // 数组
    var itemAry = [];
    // 颜色数组
    var colorAry = ['gray', 'green', 'blue', 'yellow'];

    for (var i=0;i<colorAry.length;i++){
      itemAry.push(
        <View key={i} style={[styles.itemStyle,{backgroundColor:colorAry[i]}]}/>
      );
    }
    return itemAry;
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    margin:5,
  },


});