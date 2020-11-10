import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import {
    normalize
} from '../../helpers'
import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'

import axios from "axios";


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
        switchSeller: state.common.switchSeller,
        getSeller   : state.common.getSeller
    }
}


class MyService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            services: [],
            seller_id:'',
            hvError: 'Loading ...'



        }



    }

    componentDidMount() {
        this.getServices()
    }
    getServices(){
        this.props.allActions.getServiceBySaller(this.props.getSeller.data.seller_id).then(res=>{
            console.log(res)
            if(res.code ==200){
              if(res.data.length > 0){
                  this.setState({services : res.data})  
              }
              else{
                  this.setState({hvError : "No sevice found"})
              }
           }else{
              this.setState({hvError : "No sevice found"})
           }   
          })
    }

    servicePage(id) {
        this.props.navigation.navigate('ServiceDetail',{"serviceId":id});
    }


    remove_Service(id) {
        this.props.allActions.removeService(id).then(res => {
            console.log(res)
            if (res.success == true) {
                this.props.allActions.getServiceBySaller(this.props.getProfile.user_id).then(res => {
                    console.log(res)
                    if (res.success == true) {
                        this.setState({ services: res.data })
                    }
                })
            } else {
                alert("Service not Removed")
            }
        })
    }
    changeStatus(id, status) {
       
        console.log(`https://www.ekprice.com/api/serviceEnableDisable?service_id=${id}&status=${status}`)
        axios.get(`https://www.ekprice.com/api/serviceEnableDisable?service_id=${id}&status=${status}`)
            .then(res => {
                console.log('ddd',res)
                if (res.data.success == true) {
                    this.getServices()
                }
            })
    }


    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"My Services"} />
                {this.state.services.length > 0 ?
                    <View style={styles.mainContent}>
                        <ScrollView style={styles.listContainer}>
                            <View style={styles.sectionContainer}>
                                <FlatList
                                    numColumns={2}
                                    data={this.state.services}

                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={styles.addedServices} onPress={this.servicePage.bind(this, item.id)}>
                                            <View style={styles.imageWrapper} key={`service_${index}`}>
                                                <ImageBackground source={{ uri: item.image }} style={styles.serviceImage}>
                                                    <View style={{ alignItems: 'flex-end', padding: 5 }}>
                                                        {/* <View style={styles.heartIcon}>
                                                    <Image source={require('../../assets/img/heart.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                                                </View> */}
                                                    </View>
                                                </ImageBackground>
                                            </View>

                                            <View style={styles.descWrapper}>
                                                <Text style={styles.reviewText} numberOfLines={3}>{item.title}</Text>
                                                <Text style={styles.priceText} >Starting At <Text style={{ color: '#59BD5A', fontSize: 12 }}> ₹ 500</Text></Text>
                                            </View>
                                            <View style={styles.orderActions}>
                                                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('Edit_Services_Step1',{'service_id':item.service_id})}}>
                                                    <Image source={require('../../assets/img/edit.png')} style={{ width: 35, height: 35, resizeMode: 'center' }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.button} >
                                                    <Image source={require('../../assets/img/delete.png')} style={{ width: 35, height: 35, resizeMode: 'center' }} />
                                                </TouchableOpacity>
                                                {item.status == 1 ?
                                                    <TouchableOpacity style={styles.button} onPress={this.changeStatus.bind(this, item.service_id, 0)}>
                                                        <Image source={require('../../assets/img/redswitch.png')} style={{ width: 35, height: 35, resizeMode: 'center' }} />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={styles.button} onPress={this.changeStatus.bind(this, item.service_id, 1)}>
                                                        <Image source={require('../../assets/img/blackswitch.png')} style={{ width: 35, height: 35, resizeMode: 'center' }} />
                                                    </TouchableOpacity>
                                                }
                                            </View>


                                        </TouchableOpacity>
                                    )}
                                />



                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={[styles.mainContent, { justifyContent: 'center' }]}>
                        <Text style={[styles.reviewText, { fontSize: 16 }]}>{this.state.hvError}</Text>
                    </View>
                }
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MyService)