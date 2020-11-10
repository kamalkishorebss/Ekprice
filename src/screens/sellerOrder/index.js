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
    return state
}


class UserOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            userOrder: [
                {
                    "id": '#0987679',
                    'date': 'Apr 30,2020',
                    "time": "19:20:06",
                    'image': require('../../assets/img/order.png'),
                    'price': 'Rs 500',
                    'buyer': 'Jone Doe',
                    'status': "pending",
                    'desc' : 'I will design Professional & Creative business logo'
                },
                {
                    "id": '#0987679',
                    'date': 'Apr 30,2020',
                    "time": "19:20:06",
                    'image': require('../../assets/img/order.png'),
                    'price': 'Rs 500',
                    'buyer': 'Jone Doe',
                    'status': "pending",
                    'desc' : 'I will design Professional & Creative business logo'
                },
                {
                    "id": '#0987679',
                    'date': 'Apr 30,2020',
                    "time": "19:20:06",
                    'image': require('../../assets/img/order.png'),
                    'price': 'Rs 500',
                    'buyer': 'Jone Doe',
                    'status': "pending",
                    'desc' : 'I will design Professional & Creative business logo'
                },
                {
                    "id": '#0987679',
                    'date': 'Apr 30,2020',
                    "time": "19:20:06",
                    'image': require('../../assets/img/order.png'),
                    'price': 'Rs 500',
                    'buyer': 'Jone Doe',
                    'status': "pending",
                    'desc' : 'I will design Professional & Creative business logo'
                }
                , {
                    "id": '#0987679',
                    'date': 'Apr 30,2020',
                    "time": "19:20:06",
                    'image': require('../../assets/img/order.png'),
                    'price': 'Rs 500',
                    'buyer': 'Jone Doe',
                    'status': "pending",
                    'desc' : 'I will design Professional & Creative business logo'
                }
            ],



        }



    }

    componentDidMount() {

        this.props.allActions.get_Category().then(res => {
            // console.log('upcoming',res);
            if (res.status == true) {
                this.setState({ categoriesList: res.CATEGORIES })
            } else {
                alert("Network Error")
            }

        })

    }

    goToDetail() {
        alert("hello")
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"User Orders"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            {
                                this.state.userOrder.map((item, index) => {
                                    return (
                                        <View style={styles.sectionContent} onPress={this.goToDetail.bind(this, item)} key={`cat_${index}`}>

                                            <View style={styles.orderHeader}>
                                                <Text style={styles.orderIDText}>{item.date} | {item.time}</Text>
                                                <Text style={[styles.orderIDText,{textAlign:'right'}]}># EKP709881355</Text>         
                                            </View>
                                            
                                            <View style={styles.orderDetail}>
                                              <View style={styles.orderImage}>
                                                 <Image source ={require('../../assets/img/order.png')} style={{width:50,height:50}}/>        
                                              </View>
                                              <View style={styles.orderDes}>
                                                <Text style={styles.orderStatusTextvalue}>{item.desc}</Text>         
                                              </View>
                                              <View style={styles.orderPrice}>
                                                <Text style={styles.orderStatusTextLabel}>Price</Text>
                                                <Text style={styles.orderStatusTextvalue}>{item.price}</Text>         
                                              </View>
                                            </View>
                                            <View style={styles.orderStatus}>
                                              <View style={styles.orderStatusDueDate}>
                                                <Text style={styles.orderStatusTextLabel}>Due Date</Text>
                                                <Text style={styles.orderStatusTextvalue}>{item.date} | {item.time}</Text>         
                                              </View>
                                              <View style={styles.orderStatusBuyer}>
                                                <Text style={styles.orderStatusTextLabel}>Buyer</Text>
                                                <Text style={styles.orderStatusTextvalue}>{item.buyer}</Text>         
                                              </View>
                                              <View style={styles.orderStatusBoxStatus}>
                                                <Text style={styles.orderStatusTextLabel}>Status</Text>
                                                <Text style={styles.orderStatusTextvalue}>{item.status}</Text>         
                                              </View>
                                            </View>
                                            <View style={styles.orderActions}>
                                                <Text style={styles.orderIDText}>{item.date} | {item.time}</Text>
                                                <Text style={[styles.orderIDText,{textAlign:'right'}]}># EKP709881355</Text>         
                                            </View>
                                        </View>
                                    )
                                })
                            }


                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder)