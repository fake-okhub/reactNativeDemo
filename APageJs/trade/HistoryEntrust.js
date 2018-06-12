import React from 'react';
import {
  AppRegistry,
  Text,Image,Button,View,StyleSheet,ToastAndroid,NativeModules,FlatList,TouchableHighlight,Dimensions,TouchableOpacity
} from 'react-native';
import TextInputG from "../utils/TextInputG";
let screenWidth = Dimensions.get('window').width;
export default  class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyArray:[{index:0,type: 'BUY', BTC: '+0.40175 BTC',avgPrice:'0.001756',codePrice:'0.00176',forLTC:'+32.36 LTC'},
        {index:1,type: 'BUY', BTC: '+0.40175 BTC',avgPrice:'0.001756',codePrice:'0.00176',forLTC:'+32.36 LTC'}],
    };
  };
  render() {
    return <View style={{flex:1}}>
      <FlatList
        renderItem={this._renderSellItem}
        numColumns={1}
        onEndReachedThreshold={0.1}
        onViewableItemsChanged={(info) => {
        }}
        ItemSeparatorComponent={this._separator}
        style={{width:screenWidth}}
        data={this.state.historyArray}/>
      <FlatList/>
    </View>
  }

  _separator = () => {
    return <View style={{height: 0.5, backgroundColor: '#888888'}}/>;
  };

  _renderSellItem = (item) => {
    let type = this.state.historyArray[item.index].type;
    let BTC = this.state.historyArray[item.index].BTC;
    let avgPrice = this.state.historyArray[item.index].avgPrice;
    let codePrice = this.state.historyArray[item.index].codePrice;
    let forLTC = this.state.historyArray[item.index].forLTC;
    return (
      <View style={{flex:1,flexDirection:'column',padding:2}}>
        <View style={styles.rowBetween}>
          <Text style={{color:'white',backgroundColor:'green'}}>{type}</Text>
          <Text style={{fontSize:18}}>{BTC}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={{color:'grey',fontSize:14}}>{avgPrice}</Text>
          <Text style={{color:'green',fontSize:14}}>{forLTC}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={{color:'grey',fontSize:14}}>{codePrice}</Text>
          <Text style={{color:'grey',fontSize:14}}>{this.getNowFormatDate()}</Text>
        </View>
      </View>
    )
  };

  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    return currentdate;
  }
}

const styles = StyleSheet.create({
  rowBetween:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:2,
  },
  imageContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },

});


