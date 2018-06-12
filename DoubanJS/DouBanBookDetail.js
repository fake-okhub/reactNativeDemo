import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
} from 'react-native';

let ITEM_DETAIL_HEIGHT = 100;

export default class DouBanBookDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataArray:[
               {key: 0, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 1, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 2, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 3, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 4, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 5, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 6, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 7, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 8, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 9, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 10, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 11, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 12, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 13, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 14, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }},{key: 15, title: {
                tt:'name',
                time:'2017-08-23',
                content:'你好啊啊啊啊啊啊啊啊啊'
            }}],
        };
    };

    _separator = () => {
        return <View style={{height: 0.5, backgroundColor: '#888888'}}/>;
    };

    _renderItem = (item) => {
        let data = this.state.dataArray[item.index].title;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{data.tt}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{data.time}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{data.content}</Text>
                </View>
            </View>
        )
    };

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
                        alert('下拉刷新中')
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        flexDirection:'row'
    },
    titleContainer:{
        flex:1,
        margin:10,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    titleText: {
        textAlign: 'left',
        color: 'black',
        fontSize: 25,
        fontWeight:'bold',
    },
    timeContainer:{
        flex:1,
        margin:10,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    timeText: {
        textAlign: 'left',
        color: 'red',
        fontSize: 17,
    },
    contentContainer:{
        flex:1,
        margin:10,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    contentText: {
        textAlign: 'left',
        color: 'green',
        fontSize: 15,
    },
});