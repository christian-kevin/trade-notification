import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect, Provider } from 'react-redux';
import { populateList, getPrice } from './HomeAction';
import { store } from "../../index"

const mapStateToProps = ({ priceList }) => ({
    priceList,
});

const mapDispatchToProps = dispatch => ({
    getPrice: (url) => dispatch(getPrice(url)),
});

const Home = connect(mapStateToProps, mapDispatchToProps)(
    class Home extends Component {

        componentDidMount() {
            this.props.getPrice('btc_idr');
        }
        render() {
            console.log(this.props.priceList.data);
            return (
                <View>
                {/*{*/}
                    {/*this.props.priceList.data.map(data => <Text> data </Text>)*/}
                {/*}*/}
                </View>
            )
        }
    })
export { Home }
