import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Linking } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { forEach, isEqual } from 'lodash';
import { connect } from 'react-redux';
import { getPrice } from './HomeAction';
import { priceArray, SCREEN_WIDTH } from "../../core/constant";
import { numberWithDot, dpToRem } from "../../core/util/index";
import { Qicon } from "../../component";

const styles = EStyleSheet.create({
    container: {
        backgroundColor: '$lightGrey',
        flex: 1,
    },
    linkColor: {
        color: '$primaryColor',
    },
    headerTopContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        paddingTop: '1.5rem',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingBottom: '1.5rem',
        elevation: 5,
    },
    headerTopStyle: {
        fontFamily: '$primaryFont',
        fontWeight: '200',
        fontSize: '1rem',
        color: '#666',
        alignSelf: 'center',
    },
    loginContainer: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '$alto',
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topStyle: {
        fontFamily: '$secondaryFont',
        fontWeight: '200',
        fontSize: '1.2rem',
        color: '$black',
        marginRight: 10,
    },
    btnStyle: {
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        paddingLeft: '1.875rem',
        paddingRight: '1.875rem',
        borderRadius: '2rem',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnTextStyle: {
        fontFamily: '$primaryFont',
        fontSize: '0.75rem',
    },
    contentStyle: {
        fontFamily: '$secondaryLightFont',
        fontWeight: '100',
        fontSize: '0.85rem',
        color: '$brownishGrey',
        marginRight: 10,
    },
    linkStyle: {
        fontFamily: '$secondaryFont',
        fontSize: '0.85rem',
        color: '$black',
    },
    stickyOuterStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 0,
        height: dpToRem(100),
        width: SCREEN_WIDTH,
    },
});

const mapStateToProps = ({ priceList }) => ({
    priceList,
});

const mapDispatchToProps = dispatch => ({
    getPrice: (url) => dispatch(getPrice(url)),
});

const Home = connect(mapStateToProps, mapDispatchToProps)(
    class Home extends Component {
        constructor(props) {
            super(props);
            this.state = {
                trends: {
                    btc_idr: 'flat',
                    bch_idr: 'flat',
                    btg_idr: 'flat',
                    eth_idr: 'flat',
                    etc_idr: 'flat',
                    ltc_idr: 'flat',
                    nxt_idr: 'flat',
                    waves_idr: 'flat',
                    str_idr: 'flat',
                    xrp_idr: 'flat',
                }
            }
        }
        static navigationOptions = ({ navigation }) => {
            const navigate = navigation || null;
            return {
                header: (
                    <View style={styles.headerTopContainer}>
                        <Text style={styles.headerTopStyle}>MARKET</Text>
                    </View>
                ),
            };
        };

        componentDidMount() {
            forEach(priceArray, unit => {
                if (!this.props.priceList.loading[unit.url]) {
                    this.props.getPrice(unit.url);
                }
            });
            this.populateList();
        }

        componentWillReceiveProps(nextProps) {
            forEach(Object.entries(nextProps.priceList.data), (value) => {
                if (!isEqual(this.props.priceList.data[value[0]], {}) &&
                    typeof this.props.priceList.data[value[0]] !== 'undefined' &&
                    this.props.priceList.data[value[0]].buy !== value[1].buy) {
                    if (this.props.priceList.data[value[0]].buy <= value[1].buy) {
                        this.setState({ trends: Object.assign(this.state.trends, {
                            [value[0]]: 'up',
                        })})
                    } else if (this.props.priceList.data[value[0]].buy >= value[1].buy) {
                        this.setState({ trends: Object.assign(this.state.trends, {
                            [value[0]]: 'down',
                        })})
                    }
                }
            })
        }

        populateList = () => {
            setInterval(() => forEach(priceArray, unit => {
                if (!this.props.priceList.loading[unit.url]) {
                    this.props.getPrice(unit.url);
                }
            }), 10000);
        };

        renderItem = ({ item }) => {
            const { data } = this.props.priceList;
            const url = item.url.replace('_', '');
            return (
                <TouchableOpacity
                    onPress={() => Linking.openURL(`https://vip.bitcoin.co.id/chart/${url}`)}
                >
                <View style={styles.loginContainer}>
                <Text style={styles.topStyle}>
                    {item.unit.toUpperCase()} :
                </Text>
                <View style={{ width: SCREEN_WIDTH / 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
            {
                data[item.url] && data[item.url].buy ?
                    <Text style={styles.contentStyle}>
                        Buy : <Text style={[styles.contentStyle, styles.linkColor]}> {numberWithDot(data[item.url].buy)} </Text>
                    </Text>
                    : null
            }
            {
                data[item.url] && data[item.url].sell ?
                    <Text style={styles.contentStyle}>
                        Sell : <Text style={[styles.contentStyle, styles.linkColor]}> {numberWithDot(data[item.url].sell)} </Text>
                    </Text>
                    : null
            }
                </View>
                    {
                        this.state.trends[item.url] === 'up' ?
                            <Qicon name="arrow-up" size={20} style={{ color: '#5cb85c', marginRight: 15 }} />
                            :
                            (this.state.trends[item.url] === 'down' ?
                            <Qicon name="arrow-down" size={20} style={{color: '#d9534f', marginRight: 15 }}/>
                                    : <Text style={[styles.contentStyle, styles.linkColor, { fontSize: 30, fontWeight: 'bold' }]}> - </Text>
                            )

                    }
                </View>
                </View>
                </TouchableOpacity>
            )
        }
        render() {
            return (
                <FlatList
                    data={priceArray}
                    renderItem={this.renderItem}
                    keyExtractor={({ id }) => id}
                    extraData={this.props}
                    >
                </FlatList>
            )
        }
    })
export { Home }
