


import React, { Component } from 'react';
import {
    AppRegistry,
    TabBarIOS,
    NavigatorIOS,
    View
} from 'react-native';

import bookListView from './DoubanJS/DouBanBookList'
import movieListView from './DoubanJS/DouBanMovieList'


//TabBarIOS 管理图书和电影
export default class Douban extends Component {
    // 构造
    constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           selectedBarItem: '图书'
       };
    }
    render() {
        return(
            <TabBarIOS
                barTintColor = 'white'>
                <TabBarIOS.Item
                    title = '图书'
                    icon = {{uri: 'book', scale: 2}}
                    selectedIcon = {{uri: "book_selected", scale: 2}}
                    selected = {this.state.selectedBarItem === '图书'}
                    renderAsOriginal
                    onPress = {
                        ()=> {this.setState({selectedBarItem:'图书'})
                    }}>
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute = {{
                            component: bookListView,
                            title: '图书'
                        }}
                        configureScene = {
                            () => {return NavigatorIOS.SceneConfigs.FloatFromBottom;}
                        }
                        renderScene = { (route, navigator) => {
                            let view = route.component;
                            return <view navigator={navigator}/>
                        }}
                    >
                    </NavigatorIOS>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title = '电影'
                    icon = {{uri: 'movie', scale: 2}}
                    selectedIcon = {{uri: 'movie_selected', scale: 2}}
                    renderAsOriginal
                    selected = {this.state.selectedBarItem === '电影'}
                    onPress = {
                        ()=> {this.setState({selectedBarItem:'电影'})}
                    }>
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute = {{
                            component: movieListView,
                            title: '电影'
                        }}
                        configureScene = {
                            () => {return NavigatorIOS.SceneConfigs.FloatFromBottom;}
                        }
                        renderScene = { (route, navigator) => {
                            let view = route.component;
                            return <view navigator={navigator}/>
                        }}
                    >
                        <View/>
                    </NavigatorIOS>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('Douban', () => Douban);