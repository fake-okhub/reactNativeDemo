import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

export default class DouBanMovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    render() {
        let data = [];
        for (let i = 0; i < 31; i++) {
            data.push({ key: i, title: i + '' });
        }
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    }
});
