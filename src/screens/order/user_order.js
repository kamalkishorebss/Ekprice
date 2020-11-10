import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import { normalize } from '../../helpers';
import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'
import qs from "qs";
import styles from './style'
import {
    allActions
} from '../../actions'
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
//import console = require('console');

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        checkBtn: state.common.checkBtn,
        loginStatus: state.common.loginStatus,
        getSeller: state.common.getSeller
    }
}


class UserOrderReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetail: '',
            orderDes: '',
            orderTotal: 0,
            package_name: this.props.navigation.getParam('package_Name'),
            order_id : ''
        }



    }

    componentDidMount() {

        console.log(this.props.navigation.getParam("orderReview"), "ffff", this.state.package_name, this.props.navigation.getParam("package"))
        this.setState({
            orderDetail: this.props.navigation.getParam("orderReview"),
            orderDes: this.props.navigation.getParam("package"),
            orderTotal: parseInt(this.props.navigation.getParam("package").price) + 50
        })
    }

    placeOrder(e) {
        
        let orderID = 'EKP'+Math.floor(Math.random() * 1000000000);
        let defaultImg = require('../../assets/img/userProfile.png');
        const options = {
            description: 'Credits towards consultation',
            image: this.props.loginStatus.data.profile_pic == '' ? defaultImg : `https://www.ekprice.com//public/storage/user_profile/${this.props.loginStatus.data.profile_pic}`,
            currency: 'INR',
            key: 'rzp_live_3ZiYSKfF4YAmhz',
            amount: this.state.orderTotal * 100,
            name: this.props.loginStatus.data.name,
            prefill: {
                email: this.props.loginStatus.data.email,
                contact: this.props.loginStatus.data.phone_no,
                name: this.props.loginStatus.data.name
            },
            notes: {
                soolegal_order_id:orderID,
            },
            theme: { color: '#F37254' }
        }
        RazorpayCheckout.open(options).then((data) => {
            this.createOrder(data.razorpay_payment_id);
        }).catch((error) => {
           this.props.navigation.goBack();
        });

    }

    createOrder(id,orderID) {
        let url = `https://www.ekprice.com/api/create-order?service_id=${this.state.orderDetail.service_id}&user_id=${this.props.loginStatus.data.user_id}&seller_id=${this.state.orderDetail.seller_data.seller_id}&language=EN&currency_code_id=INR&merchant_amount=${this.state.orderTotal}&merchant_total=${this.state.orderTotal}&card_holder_name_id=${this.props.loginStatus.data.name}&revision=${this.state.orderDes.number_of_revisions}&package_type=${this.state.package_name}&merchant_order_id=${orderID}&pay_type=razorpay&razorpay_payment_id=${id}&payment_type=razorpay&service_price=${this.state.orderDes.price}&transaction_fee=50&total_order_value=${this.state.orderTotal}&title=${this.state.orderDetail.title}&package_price=${this.state.orderDes.price}&delivered_in=${this.state.orderDes.delivered_in}&number_of_revisions=${this.state.orderDes.number_of_revisions}&features=${this.state.orderDes.features}`
        axios.post(url).then(res => {
                console.log(data)
                if (res.data.status == true) {
                    this.props.navigation.navigate("OrderSuccess", {
                        orderDetail : this.state.orderDetail,
                        orderDes    : this.state.orderDes,
                        orderTotal  : this.state.orderTotal,
                        orderID     : orderID
                    });
                }

            }).catch(err => {
                console.log(err)
            })


    }
   

    

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Order Review"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <View style={styles.orderDetail}>
                                <View style={styles.orderImage}>
                                    <Image source={{ uri: this.state.orderDetail.image }} style={{ width: '100%', height: '100%' }} />
                                </View>
                                <View style={styles.orderDes}>
                                    <Text style={[styles.orderStatusTextvalue, { fontWeight: 'normal' }]}>{this.state.orderDetail.title}</Text>
                                    <Text style={styles.orderStatusTextLabel}>{this.state.orderDes.delivered_in} Delivery
                                    {/* <Text style={[styles.orderStatusTextvalue, { color: '#59BD5A', fontSize: 14 }]}>  {`\u20A8`} {this.state.orderDes.price}</Text>*/}
                                </Text> 
                                </View>

                            </View>
                            <View style={styles.includedService}>
                                <Text style={{ paddingVertical: normalize(5), fontSize: normalize(12), fontFamily: 'Poppins-SemiBold' }}>The Service Includes</Text>
                                <FlatList
                                    data={this.state.orderDes.features}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (

                                        <View>
                                            {item ? <Text style={styles.includedText} > <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {item}</Text>
                                                :
                                                null
                                            }
                                        </View>
                                    )}
                                />
                                <FlatList
                                    data={this.state.orderDes.service_includes}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (

                                        <View>
                                            {item ? <Text style={styles.includedText} > <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {item}</Text>
                                                :
                                                null
                                            }
                                        </View>
                                    )}
                                />
                                <Text style={styles.includedText}> <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {this.state.orderDes.output_files}</Text>
                                <Text style={styles.includedText}> <Image source={require('../../assets/img/send.png')} style={{ width: 18, height: 18 }} />  Delivery Days : {this.state.orderDes.delivered_in}</Text>
                                <Text style={styles.includedText}> <Image source={require('../../assets/img/arrow_circle.png')} style={{ width: 18, height: 18 }} />  Revisions     : {this.state.orderDes.number_of_revisions}</Text>

                            </View>
                            <View style={styles.orderSummary}>

                                <Text style={[styles.orderStatusTextvalue, { fontWeight: 'bold', fontSize: 16, paddingVertical: 10 }]}>Summary</Text>
                                <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Subtotal</Text>
                                    <Text style={styles.rightText}>{`\u20A8`} {this.state.orderDes.price}</Text>
                                </View>

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Service Free</Text>
                                    <Text style={styles.rightText}>{`\u20A8`} 50</Text>
                                </View>

                                <View style={[styles.orderSummaryBox, {
                                    borderTopWidth: 1,
                                    borderTopColor: '#F2F4F6', paddingTop: 10
                                }]}>
                                    <Text style={styles.leftText}>Total</Text>
                                    <Text style={styles.rightText}>{`\u20A8`} {this.state.orderTotal}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, padding: 10 }}>
                                <Text style={[styles.orderStatusTextvalue, { fontWeight: 'bold', paddingVertical: 10 }]}>Payment Method</Text>
                                <View style={styles.PaymentSection}>
                                    <View style={styles.PaymentBox}>
                                        <View style={{ width: 80, height: 40 }}>
                                            <Image source={require('../../assets/img/razorpay.png')} style={{ width: '100%', height: '100%', resizeMode: 'center' }} />

                                        </View>
                                    </View>

                                </View>
                            </View>
                            <View >
                                <TouchableOpacity style={styles.button} onPress={this.placeOrder.bind(this)}>

                                    <Text style={styles.buttonText}>Place Order</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderReview)