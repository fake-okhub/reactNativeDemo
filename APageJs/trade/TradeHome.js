import React from 'react';
import {
  AppRegistry,
  Text,Image,Button,View,StyleSheet,ToastAndroid,NativeModules,FlatList,TouchableHighlight,Dimensions,TouchableOpacity
} from 'react-native';
import TextInputG from '../utils/TextInputG'
let screenWidth = Dimensions.get('window').width;
export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyArray:[{key: 0, title: '0.925678',count:'2'},{key: 1,title: '0.925678',count:'2'},{key: 2, title: '0.925678',count:'2'},{key: 3, title: '0.925678',count:'2'},{key: 4, title: '0.925678',count:'2'},{key: 5, title: '0.925678',count:'2'}],
      sellArray:[{key: 0, title: '0.925678',count:'2'},{key: 1,title: '0.925678',count:'2'},{key: 2, title: '0.925678',count:'2'},{key: 3, title: '0.925678',count:'2'},{key: 4, title: '0.925678',count:'2'},{key: 5, title: '0.925678',count:'2'}],
    };
  };
  render() {
    return <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start'}}>
      <View style={{flex:1}}>
      <TextInputG/>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity style={styles.buyContainer} onPress={()=>{
          alert('BUY');
        }}>
          <Text style={styles.textStyle}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellContainer} onPress={()=>{
          alert('SELL');
        }}>
          <Text style={styles.textStyle}>SELL</Text>
        </TouchableOpacity>
        {/*<Button onPress={() => alert('BUY')} title="BUY" color='green' style={styles.buyButton}/>*/}
        {/*<Button onPress={() => alert('SELL')} title="SELL" color='red' style={styles.sellButton}/>*/}
      </View>
      <View style={styles.lineStyle}/>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Text>Sell Orders</Text>
        <Text>Buy Orders</Text>
      </View>
      <View style={styles.lineStyle}/>
      </View>
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
        <FlatList
          renderItem={this._renderSellItem}
          numColumns={1}
          onEndReachedThreshold={0.1}
          onViewableItemsChanged={(info) => {
          }}
          style={{width:screenWidth/2-0.5, padding:5}}
          data={this.state.sellArray}/>
        <FlatList/>
        <View style={{width:1,backgroundColor:'black'}}/>
        <FlatList
          renderItem={this._renderBuyItem}
          numColumns={1}
          onEndReachedThreshold={0.1}
          style={{width:screenWidth/2-0.5, padding:5}}
          onViewableItemsChanged={(info) => {
          }}
          data={this.state.buyArray}/>
        <FlatList/>
      </View>
    </View>
  }

  _renderSellItem = (item) => {
    let txt = this.state.sellArray[item.index].title;
    let count = this.state.sellArray[item.index].count;
    return (
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',margin:2}}>
        <Text style={{color:'red'}}>{txt}</Text>
        <Text>{count}</Text>
      </View>
    )
  };

  _renderBuyItem = (item) => {
    let txt = this.state.buyArray[item.index].title;
    let count = this.state.buyArray[item.index].count;
    return (
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',margin:2,alignContent:'space-between'}}>
        <Text style={{color:'green'}}>{txt}</Text>
        <Text>{count}</Text>
      </View>
    )
  };



}

const styles = StyleSheet.create({
  lineStyle: {
    //设置占满屏幕
    height:1,
    backgroundColor: 'black',
  },
  textStyle:{
    color:'white',
    fontWeight:'bold',
  },
  buyContainer:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green',
    margin:5,
  },
  sellContainer:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red',
    margin:5,
  },

});
