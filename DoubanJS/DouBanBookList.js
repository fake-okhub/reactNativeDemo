
import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import bookDetail from './DouBanBookDetail'

let ITEM_HEIGHT = 50;

export default class DouBanBookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray:[{key: 0, title: '安全设置'},{key: 1, title: '公告'},{key: 2, title: '设置'},{key: 3, title: '更新'}],
            imagesArray:[{key: 0, title: '004'},{key: 1, title: '001'},{key: 2, title: '003'},{key: 3, title: '002'}]
        };
    };

    _header = () => {
        return (
            <View style={styles.headContainer}>
                <TouchableOpacity style={styles.registerContainer} onPress={()=>{
                    alert('注册');
                }}>
                    <Text style={styles.registerText}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginContainer} onPress={()=>{
                    alert('登陆');
                }}>
                    <Text style={styles.loginText}>登陆</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _renderItem = (item) => {
        let txt = this.state.dataArray[item.index].title;
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                if (item.index!==1) {
                    alert(txt);
                    return;
                }
                this.props.navigator.push({
                    component:bookDetail,
                    title:'公告详情'}
                )
            }}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri:this.state.imagesArray[item.index].title}}/>
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
        fontSize: 20,
    },
    /*登陆注册*/
    headContainer:{
        flexDirection:'row',
        height:100,
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
