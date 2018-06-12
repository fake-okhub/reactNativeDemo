import  React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import FocusImage from './FouseImage';
import Swiper from 'react-native-swiper';
const BANNER_IMGS = [
  require('../image/banner/1.jpg'),
  require('../image/banner/2.jpg'),
  require('../image/banner/3.jpg'),
  require('../image/banner/4.jpg')
];
let screenWidth=Dimensions.get('window').width;
export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  // Nav options can be defined as a function of the screen's props:
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    return (

      <Swiper
        style={styles.wrapper}          //样式
        width={screenWidth}
        height={130}                   //组件高度
        loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
        autoplay={true}                //自动轮播
        autoplayTimeout={4}                //每隔4秒切换
        horizontal={true}              //水平方向，为false可设置为竖直方向
        paginationStyle={{bottom: 10}} //小圆点的位置：距离底部10px
        showsButtons={false}           //为false时不显示控制按钮
        showsPagination={true}       //为false不显示下方圆点
        dot={<View style={{           //未选中的圆点样式
          backgroundColor: 'rgba(0,0,0,.2)',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 10,
          marginRight: 9,
          marginTop: 9,
          marginBottom: 9,
        }}/>}
        activeDot={<View style={{    //选中的圆点样式
          backgroundColor: '#007aff',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 10,
          marginRight: 9,
          marginTop: 9,
          marginBottom: 9,
        }}/>}

      >
        {this.renderImg()}
      </Swiper>
    );
  }

  renderImg(){
    var imageViews=[];
    for(var i=0;i<BANNER_IMGS.length;i++){
      imageViews.push(
        <Image
          key={i}
          style={styles.img}
          source={BANNER_IMGS[i]}
        />
      );
    }
    return imageViews;
  }

}

const styles = StyleSheet.create({
  wrapper:{
    flexWrap:'wrap'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop:5,
    paddingLeft:5,
    backgroundColor:'#999999',
    paddingRight:5,
    paddingBottom:5,
  },
  page: {
    flex: 1,
    height: 130,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img:{
    width:screenWidth,
    height:130,
  }

});