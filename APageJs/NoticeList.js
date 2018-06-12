import  React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

let ITEM_DETAIL_HEIGHT = 100;


export default class NoticeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `公告`,
  });

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataArray:[],
    };
  };

  _separator = () => {
    return <View style={{height: 0.5, backgroundColor: '#888888'}}/>;
  };

  _renderItem = (item) => {
    let data = this.state.dataArray[item.index].value;
    let time=formatDate(data.publishTime)
    return (
      <TouchableOpacity style={styles.container} onPress={()=>{
        this.props.navigation.navigate('Web',{url:data.link})
      }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{data.summary}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    fetch('http://localhost:8081/notice.json')
      .then((response) => response.json())
      .then((responseData) => {
        let code = responseData.resMsg.code;
        //网络成功
        if ("1000"==code){
          let articles = responseData.datas.articles;
          let dataBlob = [];
          let i = 0;
          articles.map(function (item) {
            dataBlob.push({
              key: i,
              value: item,
            })
            i++;
          });
          this.setState({
            //复制数据源
            dataArray: dataBlob,
            isLoading: false,
          });
          articles = null;
          dataBlob = null;


        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return(
      <View style={{flex:1}}>
        <FlatList

          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          numColumns={1}
          refreshing={this.state.refreshing}
          getItemLayout={(data, index) => (
            {length: ITEM_DETAIL_HEIGHT, offset: (ITEM_DETAIL_HEIGHT + 2) * index, index }
          )}
          onRefresh={()=>{
            // alert('下拉刷新中')
            this._fetchData
          }}
          onEndReached={() => {
            //上拉加载更多
          }}
          onEndReachedThreshold={0.1}
          onViewableItemsChanged={(info) => {

          }}
          data={this.state.dataArray}
        >
        </FlatList>
      </View>


    );
  }
}

/**
 * 时间戳--》时间
 * @param d
 * @returns {string}
 */
formatDate=(d)=>   {
  return new Date(parseInt(d)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
    flexDirection:'column',
    margin:10,
  },
  titleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start',
    marginTop:5,
    marginBottom:5
  },
  titleText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontWeight:'bold',
  },
  timeContainer:{
    flex:1,
    marginTop:5,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'flex-start',
  },
  timeText: {
    textAlign: 'left',
    color: 'red',
    fontSize: 12,
  },
  contentContainer:{
    flex:1,
    marginTop:5,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'flex-start',
  },
  contentText: {
    textAlign: 'left',
    color: 'green',
    fontSize: 14,
  },
});