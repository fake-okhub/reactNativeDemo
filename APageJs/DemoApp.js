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
import SwiperScreen from './Swiper'
import Toast, {DURATION} from 'react-native-easy-toast'
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
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current
    // route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text>return before page msg : {params.msg}</Text>
        <Text>第三方效果轮播效果：</Text>
        <SwiperScreen />
        <Text>原生效果轮播效果：</Text>
        <FocusImage/>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'flex-start',
    margin:5,
  },
  page: {
    flex: 1,
    height: 130,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img:{
    width:screenWidth,
    height:130,
    backgroundColor:'red'
  }

});