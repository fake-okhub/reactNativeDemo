
import  React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ProgressBarAndroid,
  NativeModules,
} from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import noticeList from './NoticeList'

let ITEM_HEIGHT = 40;

export default class SafetyScreen extends Component {

  static navigationOptions = {
    title: '我的信息',    //设置navigator的title
  };

  constructor(props) {
    super(props);
    this.state = {
      dataArray:[{key: 0, title: '安全设置'},{key: 1, title: '公告'},{key: 2, title: '设置'},{key: 3, title: '更新'}],
      imagesArray:[{key: 0, title: require('../image/user/safetySetting.png')},
        {key: 1, title: require('../image/user/announcement.png')},
        {key: 2, title: require('../image/user/setting.png')},
        {key: 3, title: require('../image/user/update.png')}]
    };
  };

  _header = () => {
    return (
      <View style={styles.headContainer}>
        <View style={styles.headTextContainer}>
          <Text style={{color:'#000'}}>手机号：13333333333</Text>
          <Text style={styles.headVipText}>VIP 0</Text>
        </View>
        <View style={styles.headTextContainer}>
          <Text style={styles.headGreyText}>VIP 0</Text>
          <Text style={styles.headGreyText}>VIP 1</Text>
        </View>
        <ProgressBarAndroid  color="blue" styleAttr='Horizontal' progress={0.2}
                             indeterminate={false} style={{marginTop:6}}/>
        <View style={styles.headTextContainer}>
          <Text style={styles.headGreyText}>0</Text>
          <Text style={styles.headGreyText}>我的积分：xxxx</Text>
          <Text style={styles.headGreyText}>10000</Text>
        </View>
        {/*<TouchableOpacity style={styles.registerContainer} onPress={()=>{*/}
        {/*alert('注册');*/}
      {/*}}>*/}
        {/*<Text style={styles.registerText}>注册</Text>*/}
      {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={styles.loginContainer} onPress={()=>{*/}
          {/*alert('登陆');*/}
        {/*}}>*/}
          {/*<Text style={styles.loginText}>登陆</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    )
  };

  _renderItem = (item) => {
    let txt = this.state.dataArray[item.index].title;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => {
        if (item.index==1) {
          this.props.navigation.navigate('Notice')
        }else if (item.index==0){
          NativeModules.MyIntentModule.startActivityByClassname('com.douban.TestActiity')
        }else {
          alert(txt);
          return;
        }
        // this.props.navigation.dispatch({
        //   component:noticeList,
        //   title:'公告详情'}
        // )

      }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.state.imagesArray[item.index].title}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{txt}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  _separator = () => {
    return <View style={{height: 0.5, backgroundColor: '#888888'}}/>;
  };

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
          ListHeaderComponent={this._header}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          numColumns={1}
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 2) * index, index }
          )}
          onEndReachedThreshold={0.1}
          onViewableItemsChanged={(info) => {

          }}
          data={this.state.dataArray}
        >
        </FlatList>
      </View>
    );
  }

  componentDidMount(){   //这是React的生命周期函数，会在界面加载完成后执行一次
    // React.NativeModules.MyIntentModule.getDataFromIntent(
    //   (successMsg) =>{
    //     this.setState({TEXT: successMsg,}); //状态改变的话重新绘制界面
    //   },
    //   (erroMsg) => {alert(erroMsg)}
    // );
  }

}




const styles = StyleSheet.create({
  itemContainer:{
    flexDirection:'row',
    height:ITEM_HEIGHT,
    margin:10,
  },
  imageContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  image:{
    width:20,
    height:20,
  },
  textContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
    margin:10,
  },
  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
  },
  /*登陆注册*/
  headContainer:{
    flexDirection:'column',
    height:100,
    marginLeft:10,
    marginRight:10,
  },
  headTextContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:6
  },
  headVipText:{
    backgroundColor:'blue',
    color:'white',
    fontWeight:('bold', '700'),
    padding:3
  },
  headGreyText:{
    color:'grey',
    fontSize:12,
  },
  headProgress:{
  },
  loginContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'blue',
    margin:10,
  },
  registerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green',
    margin:10,
  },
  loginText:{
    color:'white',
    fontWeight:'bold',
    fontSize:25,
  },
  registerText:{
    color:'white',
    fontWeight:'bold',
    fontSize:25,
  }
});
