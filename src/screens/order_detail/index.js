import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    FlatList,
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

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        loginStatus : state.common.loginStatus,
        checkBtn    : state.common.checkBtn
        
    }
}


class OrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            orderDetail: '',
            services: [],
            status: 'pending'


        }



    }

    componentDidMount() {
        //this.props.navigation.getParam('order_id')
        this.props.allActions.get_OrderById(this.props.navigation.getParam('order_id')).then(res => {
            console.log('user order', res.data.service_include);
            if (res.success == true) {
                this.setState({ orderDetail: res.data[0], services: res.data[0].service_include })
            } else {
                alert("Network Error")
            }

        })

    }

    goToOrderReview(e) {
        this.props.navigation.navigate("UserOrderReview");
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Order Details"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContent}>

                            <View style={styles.orderHeader} >
                                <Text style={styles.orderIDText}>{this.state.orderDetail.updated_at}</Text>
                                <Text style={[styles.orderIDText, { textAlign: 'right' }]}># {this.state.orderDetail.order_id}</Text>
                            </View>

                            <View style={styles.orderDetail}>
                                <View style={styles.orderImage}>
                                    <Image source={{ uri: this.state.orderDetail.image }} style={{ width: 50, height: 50 }} />
                                </View>
                                <View style={styles.orderDes}>
                                    <Text style={[styles.orderStatusTextvalue, { fontWeight: 'normal' }]}>{this.state.orderDetail.title}</Text>
                                </View>
                                <View style={styles.orderPrice}>
                                    <Text style={styles.orderStatusTextLabel}>Price</Text>
                                    <Text style={[styles.orderStatusTextvalue, { color: '#59BD5A', fontSize: 14 }]}>{'\u20A8'} {this.state.orderDetail.total_price}</Text>
                                </View>
                            </View>
                            <View style={styles.orderStatus}>
                                <View style={styles.orderStatusDueDate}>
                                    <Text style={styles.orderStatusTextLabel}>Due Date</Text>
                                    <Text style={styles.orderStatusTextvalue}>{this.state.orderDetail.completed_date}</Text>
                                </View>

                                <View style={styles.orderStatusBoxStatus}>
                                    <Text style={styles.orderStatusTextLabel}>Status</Text>
                                    <Text style={styles.orderStatusTextvalue}>{this.state.orderDetail.status}</Text>
                                </View>
                            </View>

                            <View style={styles.Buyer}>
                                <Text style={styles.Buyerlabel}>{this.props.checkBtn==2?"Buyer":"Seller"}</Text>

                                <View style={styles.buyerBox}>
                                    <View style={{ flex: .1, alignItems: 'center' }}>
                                        <View style={{ width: 35, height: 35, }}>
                                            <Image source={{ uri: this.props.checkBtn == 1?this.state.orderDetail.saller_profile :  this.state.orderDetail.buyer_profile}} style={{ width: 35, height: 35, alignSelf: 'center', borderRadius: 50 }} />
                                        </View>
                                    </View>
                                    <View style={{ flex: .8, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10 }}>
                                        <Text style={{ textAlign: 'left', fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#212121', textTransform: 'capitalize' }}> {this.props.checkBtn==2?this.state.orderDetail.buyer : this.state.orderDetail.saller}</Text>
                                        {this.props.checkBtn==1?<Text style={styles.view} >  View More</Text>:null}
                                    </View>
                                    {/* <View style={{ flex:.1, alignItems: 'center',borderWidth:1 }}>
                                <View style={{ width: 35, height: 35, }}>
                                    <Image source={{uri : this.state.orderDetail.buyer_profile}} style={{ width: 35, height: 35, alignSelf: 'center', borderRadius: 50 }} />
                                </View>
                            </View> */}

                                </View>
                            </View>
                            <View style={styles.includedService}>
                                <Text style={{ paddingVertical: normalize(5), fontSize: normalize(12), fontFamily: 'Poppins-SemiBold' }}>The Service Includes</Text>
                                <FlatList
                                    data={this.state.orderDetail.service_include}
                                    keyExtractor={(data, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Text style={styles.includedText} > <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} /> {item}</Text>
                                    )}
                                />
                                <Text style={styles.includedText}> <Image source={require('../../assets/img/send.png')} style={{ width: 18, height: 18 }} />  Delivery Days : 2</Text>
                                <Text style={styles.includedText}> <Image source={require('../../assets/img/arrow_circle.png')} style={{ width: 18, height: 18 }} />  Revisions     : {this.state.orderDetail.revision}</Text>

                            </View>

                            <View style={styles.orderSummary}>
                                <Text style={{ paddingVertical: normalize(5), fontSize: normalize(12), fontFamily: 'Poppins-SemiBold' }}>Payment Information</Text>
                                <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Date</Text>
                                    <Text style={[styles.leftText, { textAlign: 'right' }]}>{this.state.orderDetail.created_at}</Text>
                                </View>

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Payment Type</Text>
                                    <Text style={[styles.leftText, { textAlign: 'right' }]}>{this.state.orderDetail.payment_type}</Text>
                                </View>
                                {/* <View style={styles.orderSummaryBox}>
                                    <Text style={styles.leftText}>Details</Text>
                                    <Text style={[styles.leftText, { textAlign: 'right' }]}>{this.props.loginStatus.data.name}</Text>
                                </View> */}

                                <View style={[styles.orderSummaryBox, { paddingTop: 0 }]}>
                                    <Text style={styles.leftText}>Order Total </Text>
                                    <Text style={[styles.leftText, { textAlign: 'right' }]}>{'\u20A8'} {this.state.orderDetail.total_price}</Text>

                                </View>
                            </View>
                            {this.state.orderDetail.status == 'new' ?
                                <View style={{ width: "100%", alignSelf: 'center', }}>
                                    <TouchableOpacity style={styles.approveButton} >

                                        <Text style={styles.buttonText}>Cancel</Text>

                                    </TouchableOpacity>
                                </View>
                                :
                                null
                            }

                            {this.state.orderDetail.status == 'completed' ?
                                <View style={{ width: "100%", alignSelf: 'center', flexDirection:'row'}}>
                                    <View style={{ width: "46%", alignSelf: 'center',margin:"2%" }}>
                                        <TouchableOpacity style={styles.approveButton} >

                                            <Text style={styles.buttonText}>Approve</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "46%", alignSelf: 'center',margin:"2%" }}>
                                        <TouchableOpacity style={styles.buttonReject} >

                                            <Text style={[styles.buttonText,{color:"#000"}]}>Reject</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                            }


                        </View>
                    </ScrollView>
                </View>

            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)