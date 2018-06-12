
import React, { Component, PropTypes } from 'react';
import {
  TouchableNativeFeedback,
  ScrollView,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
// 屏幕宽度
let screenWidth = Dimensions.get('window').width;

class FocusImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      images : ['#dfe24a','#68eaf9','#ef9af9'],// 使用颜色代替图片
      selectedImageIndex: 0,
      isNeedRun: true,
    };

    this._index = 0;// 当前正在显示的图片
    this._max = this.state.images.length;// 图片总数
  }

  render(){

    // 图片列表
    let images = this.state.images.map((value,i) => {
      return (
        <TouchableNativeFeedback onPress={()=>this._showToast(i)}>
          <View style={{width:screenWidth,height:130,backgroundColor:value}}/>
        </TouchableNativeFeedback>);
    });

    // 小圆点指示器
    let circles = this.state.images.map((value,i) => {
      return (<View key={i} style={ (i == this.state.selectedImageIndex) ? styles.circleSelected : styles.circle}/>);
    });

    // 小圆点位置居中显示
    let imageLength = this.state.images.length;
    let circleLength = 6 * imageLength + 5 * 2 * imageLength;
    let center = (screenWidth - circleLength) / 2;

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onTouchStart={()=>this._onTouchStart}
                    onTouchMove={()=>console.log('onTouchMove')}
                    onTouchEnd={()=>this._onTouchEnd}
                    onScroll={()=>this._onScroll}
                    ref={(scrollView) => { this._scrollView = scrollView;}}>

          <Animated.View style={{flexDirection:'row'}}>{images}</Animated.View>
        </ScrollView>
        <Toast
          ref="toast"
          style={{backgroundColor:'grey'}}
          position='top'
        />
        <View style={{flexDirection:'row',position:'absolute',top:115,left:center}}>{circles}</View>
      </View>
    );
  }

  _onTouchStart(){
    // 当手指按到scrollview时停止定时任务
    clearInterval(this._timer);
  }

  _onTouchEnd(){
    // 先滑动到指定index位置，再开启定时任务
    this._scrollView.scrollTo({x:this._index * screenWidth},true);
    // 重置小圆点指示器
    this._refreshFocusIndicator();
    this._runFocusImage();
  }

  _onScroll(){
    this._contentOffsetX = this._scrollView.contentOffset.x;
    this._index = Math.round(this._contentOffsetX / screenWidth);
  }

  _runFocusImage(){
    if(this._max <= 1){ // 只有一个则不启动定时任务
      return;
    }
    this._timer = setInterval(function () {
      this._index++;
      if(this._index >= this._max){
        this._index = 0;
      }
      this._scrollView.scrollTo({x:this._index * screenWidth},true);
      // 重置小圆点指示器
      this._refreshFocusIndicator();
    }.bind(this), 4000);
  }

  _stopFocusImage(){
    clearInterval(this._timer);
  }

  _refreshFocusIndicator(){
    this.setState({selectedImageIndex:this._index});
  }

  _showToast(i) {
    //显示的内容
    var message = '点击: ' + i;
    // console.log(message);
    // alert(message)
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  }

  // 组件装载完成
  componentDidMount(){
    this._runFocusImage();
  }

  // 组件即将卸载
  componentWillUnmount(){
    clearInterval(this._timer);
  }

  // 组件接收到新属性
  componentWillReceiveProps(nextProps) {
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  circleContainer: {
    position:'absolute',
    left:0,
    top:120,
  },
  circle: {
    width:6,
    height:6,
    borderRadius:6,
    backgroundColor:'#f4797e',
    marginHorizontal:5,
  },
  circleSelected: {
    width:6,
    height:6,
    borderRadius:6,
    backgroundColor:'#ffffff',
    marginHorizontal:5,
  }
});

FocusImage.defaultProps = {
  isNeedRun : true,
};

FocusImage.propTypes = {
  isNeedRun   : PropTypes.bool,
  onItemClick : PropTypes.func,
};

module.exports = FocusImage;
