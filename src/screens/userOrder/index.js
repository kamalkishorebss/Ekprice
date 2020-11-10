import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import {
    normalize
} from '../../helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import moment from "moment";
import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'
import Toast, { DURATION } from 'react-native-easy-toast'



import styles from './style'


import {
    allActions
} from '../../actions'


import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.common.loginStatus,
        getProfile: state.common.getProfile,
        getSeller: state.common.getSeller,
        checkBtn: state.common.checkBtn
    }
}


class Orders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            userOrder: [],
            user_id: 1,
            tabsIndex: 'AO',
            hvError: 'Please wait ...'



        }



    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getKey();
            if (this.props.checkBtn == 1) {
                this.setState({ user_id: 1 })
            } else {
                this.setState({ user_id: 2 })
            }



        });
    }

    async getKey() {
        const value = await AsyncStorage.getItem('currentUser');
        console.log('gggggg', value);
        if (value == null) {
            this.props.navigation.navigate("Login");
        } else {
            this.props.navigation.navigate("UserOrder");
            this.getOrders('all')
        }
    }

    changeTab(e) {
        if (e == "AO") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('all')
            })
        }
        if (e == "N") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('new')
            })
        }
        if (e == "P") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('inprogress')
            })
        }
        if (e == "C") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('completed')
            })
        }
        if (e == "R") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('rejected')
            })
        }
        if (e == "A") {
            this.setState({ tabsIndex: e, userOrder: [] }, () => {
                this.getOrders('approved')
            })
        }

    }

    getOrders(status) {
        if (this.props.checkBtn == 1) {
            this.props.allActions.get_Order(this.props.getProfile.user_id, status).then(res => {
                console.log('user orders', res.data);
                if (res.success == true && res.data.length > 0) {
                    this.setState({ userOrder: res.data })
                } else {
                    this.setState({ hvError: "No order Found" })
                }
            }).catch(err => {
                this.setState({ hvError: "No order Found" })
            })
        }

        if (this.props.checkBtn == 2) {
            this.props.allActions.get_SellerOrder(this.props.getSeller.data.seller_id, status).then(res => {
                console.log('user orders', res.data);
                if (res.success == true && res.data.length > 0) {
                    this.setState({ userOrder: res.data })
                } else {
                    this.setState({ hvError: "No order Found" })
                }

            }).catch(err => {
                this.setState({ hvError: "No order Found" })
            })
        }


    }
    goToDetail(id) {
        this.props.navigation.navigate('OrderDetail', { 'order_id': id });
    }
    WriteReviews(order) {
        this.props.navigation.navigate('WriteReviews',{'order':order});
    }
    userApproveOrder(data) {
        this.props.allActions.get_Order(this.props.getProfile.user_id, status).then(res => {
            console.log('user orders', res.data);
            if (res.success == true && res.data.length > 0) {
                this.setState({ userOrder: res.data })
            } else {
                this.setState({ hvError: "No order Found" })
            }
        }).catch(err => {
            this.setState({ hvError: "No order Found" })
        })
    }

    userRejectOrder(data) {
        this.props.allActions.get_Order(this.props.getProfile.user_id, status).then(res => {
            console.log('user orders', res.data);
            if (res.success == true && res.data.length > 0) {
                this.setState({ userOrder: res.data })
            } else {
                this.setState({ hvError: "No order Found" })
            }
        }).catch(err => {
            this.setState({ hvError: "No order Found" })
        })
    }


    sellerAcceptOrder(data) {
        this.props.allActions.change_OrderStatus(data.orderId, 'inprogress').then(res => {
            console.log(res)
            if (res.status == true) {
                this.props.allActions.get_SellerOrder(this.props.getSeller.data.seller_id, 'new').then(res => {
                    console.log('user orders', res.data);
                    if (res.success == true && res.data.length > 0) {
                        this.setState({ userOrder: res.data })
                    } else {
                        this.setState({ hvError: "No order Found" })
                    }

                }).catch(err => {
                    this.setState({ hvError: "No order Found" })
                })
            }
        })
    }

    sellerCompleteOrder(data) {
        this.props.allActions.change_OrderStatus(data.orderId, 'completed').then(res => {
            console.log(res)
            if (res.status == true) {
                this.props.allActions.get_SellerOrder(this.props.getSeller.data.seller_id, 'new').then(res => {
                    console.log('user orders', res.data);
                    if (res.success == true && res.data.length > 0) {
                        this.setState({ userOrder: res.data })
                    } else {
                        this.setState({ hvError: "No order Found" })
                    }

                }).catch(err => {
                    this.setState({ hvError: "No order Found" })
                })
            }
        })
    }


    render() {

        return (
            <View style={styles.container}>
                <Header {...this.props} title={this.state.user_id == 1 ? "User Orders" : "Seller Orders"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        {this.state.user_id == 1 ?

                            <View style={styles.sectionContainer}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'AO')}>
                                            <Text style={this.state.tabsIndex == "AO" ? styles.tabsLabelRed : styles.tabsLabel}>All Orders</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'N')}>
                                            <Text style={this.state.tabsIndex == "N" ? styles.tabsLabelRed : styles.tabsLabel}>New Orders</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'P')}>
                                            <Text style={this.state.tabsIndex == "P" ? styles.tabsLabelRed : styles.tabsLabel}>In-Progress</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'C')}>
                                            <Text style={this.state.tabsIndex == "C" ? styles.tabsLabelRed : styles.tabsLabel}>Completed</Text>

                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.orderTabs} >
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'A')}>
                                            <Text style={this.state.tabsIndex == "A" ? styles.tabsLabelRed : styles.tabsLabel}>Approved</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'R')}>
                                            <Text style={this.state.tabsIndex == "R" ? styles.tabsLabelRed : styles.tabsLabel}>Rejected</Text>

                                        </TouchableOpacity>
                                    </View>

                                </ScrollView>
                                {
                                    this.state.userOrder.length > 0 ? this.state.userOrder.map((item, index) => {
                                        return (

                                            <View style={styles.sectionContent} onPress={this.goToDetail.bind(this, item)} key={`orderIn_${index}`}>

                                                <View style={styles.orderHeader} >
                                                    <Text style={styles.orderIDText}>{moment(item.created_date).format("MMM Do YYYY")}</Text>
                                                    <Text style={[styles.orderIDText, { textAlign: 'right' }]}># {item.orderId}</Text>
                                                </View>

                                                <View style={styles.orderDetail}>
                                                    <View style={styles.orderImage}>
                                                        <Image source={{ uri: item.image }} style={{ width: 70, height: 70 }} />
                                                    </View>
                                                    <View style={styles.orderDes}>
                                                        <Text style={[styles.orderStatusTextvalue, { fontWeight: 'normal' }]} numberOfLines={3}>{item.service_title}</Text>
                                                    </View>
                                                    <View style={styles.orderPrice}>
                                                        <Text style={styles.orderStatusTextLabel}>Price</Text>
                                                        <Text style={[styles.orderStatusTextvalue, { color: '#59BD5A', fontSize: 14 }]}>{'\u20A8'} {item.price}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.orderStatus}>
                                                    <View style={styles.orderStatusDueDate}>
                                                        <Text style={styles.orderStatusTextLabel}>{item.status == 'completed'?"Completed Date":"Due Date"}</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.status == 'completed'?moment(item.completed_date).format("MMM Do YYYY"):moment(item.due_date).format("MMM Do YYYY")}</Text>
                                                    </View>
                                                    <View style={styles.orderStatusBuyer}>
                                                        <Text style={styles.orderStatusTextLabel}>Seller</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.seller_name}</Text>
                                                    </View>
                                                    <View style={styles.orderStatusBoxStatus}>
                                                        <Text style={styles.orderStatusTextLabel}>Status</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.status == "auto_approve" ? "Auto Approved" : item.status}</Text>
                                                    </View>
                                                </View>
                                                {this.state.tabsIndex == "N" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonReject} onPress={this.WriteReviews.bind(this)}>

                                                            <Text style={[styles.buttonText, { color: "#000" }]}> Cancel Order</Text>

                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.buttonDetail} />



                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }
                                                {this.state.tabsIndex == "C" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonReject} onPress={this.WriteReviews.bind(this)}>

                                                            <Text style={[styles.buttonText, { color: "#000" }]}> Reject Order</Text>

                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={styles.buttonAccept} onPress={this.WriteReviews.bind(this,item)}>

                                                            <Text style={[styles.buttonText, { color: "#FFF" }]}> Approve Order</Text>

                                                        </TouchableOpacity>



                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }

                                                {this.state.tabsIndex == "A" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonDetail} />
                                                        <TouchableOpacity style={styles.buttonDetail} />
                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </View>





                                        )
                                    })
                                        :
                                        <View style={{ flex: 1, paddingVertical: '50%', alignSelf: 'center', }} >
                                            <Text style={styles.tabsLabelRed}>{this.state.hvError}</Text>
                                        </View>

                                }




                            </View>
                            :
                            <View style={styles.sectionContainer}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'AO')}>
                                            <Text style={this.state.tabsIndex == "AO" ? styles.tabsLabelRed : styles.tabsLabel}>All Orders</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'N')}>
                                            <Text style={this.state.tabsIndex == "N" ? styles.tabsLabelRed : styles.tabsLabel}>New Orders</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'P')}>
                                            <Text style={this.state.tabsIndex == "P" ? styles.tabsLabelRed : styles.tabsLabel}>In-Progress</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'C')}>
                                            <Text style={this.state.tabsIndex == "C" ? styles.tabsLabelRed : styles.tabsLabel}>Completed</Text>

                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.orderTabs} >
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'A')}>
                                            <Text style={this.state.tabsIndex == "A" ? styles.tabsLabelRed : styles.tabsLabel}>Approved</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.orderTabs}>
                                        <TouchableOpacity onPress={this.changeTab.bind(this, 'R')}>
                                            <Text style={this.state.tabsIndex == "R" ? styles.tabsLabelRed : styles.tabsLabel}>Rejected</Text>

                                        </TouchableOpacity>
                                    </View>

                                </ScrollView>
                                {
                                    this.state.userOrder.length > 0 ? this.state.userOrder.map((item, index) => {
                                        return (

                                            <View style={styles.sectionContent} onPress={this.goToDetail.bind(this, item)} key={`orderIn_${index}`}>

                                                <View style={styles.orderHeader} >
                                                    <Text style={styles.orderIDText}>{moment(item.dateTime).format("MMM Do YYYY")}</Text>
                                                    <Text style={[styles.orderIDText, { textAlign: 'right' }]}># {item.orderId}</Text>
                                                </View>

                                                <View style={styles.orderDetail}>
                                                    <View style={styles.orderImage}>
                                                        <Image source={{ uri: item.serviceImage }} style={{ width: 50, height: 50 }} />
                                                    </View>
                                                    <View style={styles.orderDes}>
                                                        <Text style={[styles.orderStatusTextvalue, { fontWeight: 'normal' }]} numberOfLines={3}>{item.title}</Text>
                                                    </View>
                                                    <View style={styles.orderPrice}>
                                                        <Text style={styles.orderStatusTextLabel}>Price</Text>
                                                        <Text style={[styles.orderStatusTextvalue, { color: '#59BD5A', fontSize: 14 }]}>{'\u20A8'} {item.orderPrice}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.orderStatus}>
                                                    <View style={styles.orderStatusDueDate}>
                                                        <Text style={styles.orderStatusTextLabel}>{item.orderStatus == 'completed'?"Completed Date":"Due Date"}</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.orderStatus == 'completed'?moment(item.dueDate).format("MMM Do YYYY"):moment(item.dueDate).format("MMM Do YYYY")}</Text>
                                                    </View>
                                                    <View style={styles.orderStatusBuyer}>
                                                        <Text style={styles.orderStatusTextLabel}>Buyer</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.buyerName}</Text>
                                                    </View>
                                                    <View style={styles.orderStatusBoxStatus}>
                                                        <Text style={styles.orderStatusTextLabel}>Status</Text>
                                                        <Text style={styles.orderStatusTextvalue}>{item.orderStatus == 'auto_approve' ? 'Auto Approved' : item.orderStatus}</Text>
                                                    </View>
                                                </View>
                                                {this.state.tabsIndex == "N" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonAccept} onPress={this.sellerAcceptOrder.bind(this, item)}>

                                                            <Text style={[styles.buttonText, { color: "#fff" }]}> Accept Order</Text>

                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.buttonDetail} />



                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }

                                                {this.state.tabsIndex == "P" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonAccept} onPress={this.sellerCompleteOrder.bind(this,item)}>

                                                            <Text style={[styles.buttonText, { color: "#FFF" }]}> Complete Order</Text>

                                                        </TouchableOpacity>

                                                        
                                                        <TouchableOpacity style={styles.buttonDetail}></TouchableOpacity> 


                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }
                                                

                                                {this.state.tabsIndex == "A" ?
                                                    <View style={styles.orderActions}>
                                                        <TouchableOpacity style={styles.buttonDetail} />
                                                        <TouchableOpacity style={styles.buttonDetail} />
                                                        <TouchableOpacity style={styles.buttonDetail} onPress={this.goToDetail.bind(this, item.orderId)}>

                                                            <Icon name="keyboard-arrow-right" size={30} color="#000"></Icon>

                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </View>





                                        )
                                    })
                                        :
                                        <View style={{ flex: 1, paddingVertical: '50%', alignSelf: 'center', }} >
                                            <Text style={styles.tabsLabelRed}>{this.state.hvError}</Text>
                                        </View>

                                }




                            </View>
                        }
                    </ScrollView>
                </View>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'red' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontSize: 14, padding: 5, fontWeight: 'bold' }}
                />

            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)