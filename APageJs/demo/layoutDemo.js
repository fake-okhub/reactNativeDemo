import  React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
let screenWidth=Dimensions.get('window').width;
export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>flexDirection:'row',justifyContent属性:</Text>
        <Text>justifyContent:'flex-start'</Text>
        <View style={[styles.flexStyle,{justifyContent:'flex-start'}]}>{this.renderFirstItem()}</View>
        <Text>justifyContent:'center'</Text>
        <View style={[styles.flexStyle,{justifyContent:'center'}]}>{this.renderFirstItem()}</View>
        <Text>justifyContent:'flex-end'</Text>
        <View style={[styles.flexStyle,{justifyContent:'flex-end'}]}>{this.renderFirstItem()}</View>
        <Text>justifyContent:'space-between'</Text>
        <View style={[styles.flexStyle,{justifyContent:'space-between'}]}>{this.renderFirstItem()}</View>
        <Text>justifyContent:'space-around'</Text>
        <View style={[styles.flexStyle,{justifyContent:'space-around'}]}>{this.renderFirstItem()}</View>
        <Text>flexDirection:'row',alignItems属性:</Text>
        <Text>justifyContent:'flex-start'</Text>
        <View style={styles.wrapContent}>
          <View style={[styles.flexStyle,{alignItems:'flex-start'}]}>{this.renderFirstItem()}</View>
        </View>
        <Text>justifyContent:'center'</Text>
        <View style={styles.wrapContent}>
          <View style={[styles.flexStyle,{alignItems:'center'}]}>{this.renderFirstItem()}</View>
        </View>
        <Text>图片加载方式：</Text>
        <Text>cover：</Text>
        <Image style={[styles.imageStyle,{resizeMode:'cover'}]} source={{uri:'http://paper.people.com.cn/rmrbhwb/res/2015-03/23/08/rmrbhwb2015032308p46_b.jpg'}}/>
        <Text>contain：</Text>
        <Image style={[styles.imageStyle,{resizeMode:'contain'}]} source={{uri:'http://paper.people.com.cn/rmrbhwb/res/2015-03/23/08/rmrbhwb2015032308p46_b.jpg'}}/>
        <Text>stretch：</Text>
        <Image style={[styles.imageStyle,{resizeMode:'stretch'}]} source={{uri:'http://paper.people.com.cn/rmrbhwb/res/2015-03/23/08/rmrbhwb2015032308p46_b.jpg'}}/>
      </ScrollView>
    );
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
  itemStyle:{
    width:50,
    height:50,
    margin:2
  },
  flexStyle:{
    flex:1,
    flexDirection:'row',
    margin:2,

  },
  centerStyle:{
    flex:1,
    flexDirection:'row',
    margin:2,
    justifyContent:'center'
  },
  wrapContent:{
    width:100,
    height:100
  },
  imageStyle:{
    width:200,
    height:200,
  }
});