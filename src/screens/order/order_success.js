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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'

import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'



import styles from './style'


import {
    allActions
} from '../../actions'


import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return state
}


class OrderSuccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            orderDetail : '',
            orderDes    : '',
            orderTotal  : '',
            currentDate : new Date()

        }



    }

    componentDidMount() {
        this.setState ({
           orderDetail : this.props.navigation.getParam("orderDetail"),
           orderDes    : this.props.navigation.getParam("orderDes"),
           orderTotal  : parseInt(this.props.navigation.getParam('orderTotal'))
        })
    }

    goToDetail(e) {
        this.props.navigation.navigate("Category", { 'cat_id': e });
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Order Success"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                                <View style={[styles.orderImage,{borderWidth:0}]}>
                                    <Image source={require('../../assets/img/thank-you.png')} style={{ width: 100, height: 100 }} />
                                </View>
                                <Text style={[styles.leftText,{textAlign:'center',fontWeight:'bold'}]}>THANK YOU!</Text>  
                                <Text style={[styles.leftText,{color:'#767676',textAlign:'center',paddingHorizontal:20}]}>Your payment was completed. Thank you for your order!</Text>  
                                <Text style={[styles.leftText,{textAlign:'center'}]}>Please check the info below</Text>  

                            <View style={[styles.orderDetail,{borderTopWidth:1,
        borderTopColor:'#F2F4F6'}]}>
                                <View style={styles.orderImage}>
                                    <Image source={{uri : this.state.orderDetail.image}} style={{ width: '100%', height: '100%' }} />
                                </View>
                                <View style={styles.orderDes}>
                                    <Text style={[styles.orderStatusTextvalue, { fontWeight: 'normal' }]}>{this.state.orderDetail.title}</Text>
                                    {/* <Text style={styles.orderStatusTextLabel}>Basic - {this.state.orderDetail.delivered_in} Days Delivery</Text> */}
                                </View>

                            </View>
                            <View style={styles.orderSummary}>

                                <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Date</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>{moment(this.state.currentDate).format('LLL')}</Text>
                                </View>

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Payment Type</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>razorpay</Text>
                                </View>
                                {/* <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Details</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>{this.state.orderDetail.user}</Text>
                                </View> */}

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Order ID </Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>#EKP{this.props.navigation.getParam('orderID')}</Text>
                                   
                                </View>
                                <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Delivery Days</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>{this.state.orderDes.delivered_in}</Text>
                                </View>

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Revision</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>{this.state.orderDes.number_of_revisions}</Text>
                                </View>
                                <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Order Total</Text>
                                    <Text style={[styles.leftText,{textAlign:'right'}]}>{'\u20A8'} {this.state.orderTotal}</Text>
                                </View>

                                
                                
                            </View>
                            <View >
                                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Home")}}>

                                    <Text style={styles.buttonText}>Home</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess)