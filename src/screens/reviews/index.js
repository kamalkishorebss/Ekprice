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
import { Rating, AirbnbRating } from 'react-native-ratings';
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
    return {loginStatus : state.common.loginStatus}
}
import axios from "axios";
class WriteReviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoriesList: [],
            orderD : this.props.navigation.getParam('order'),
            rating: 0,
            quality:'',
            delivery:'',
            sellerRating:'',
            appRating :'',
            seller_comment :'',
            app_comment:''
        }



    }

    componentDidMount() {
        
    }

    goToDetail(e) {
        this.props.navigation.navigate("Category", { 'cat_id': e });
    }

    ratingQlty =(quality) => {
        this.setState({quality :quality})
     }
     

    ratingDel = (delivery) => {
        this.setState({delivery})  
    }

    ratingSeller=(sellerRating)=> {
        console.log(sellerRating)  
        this.setState({sellerRating})  
    }

    ratingEkprice = (appRating)=> {
        this.setState({appRating})
    }

    submitRating(){
     
        let url = `https://www.ekprice.com/api/orders_reviews?user_id=${this.props.loginStatus.data.user_id}&sellerid=${this.state.orderD.seller_id}&serviceid=${this.state.orderD.service_id}&orderid=${this.state.orderD.orderId}&quality_rating=${this.state.quality}&delivery_rating=${this.state.delivery}&response_rating=${this.state.sellerRating}&ekprice_rating=${this.state.appRating}&order_comments=${this.state.seller_comment}`
        console.log(url)
        // axios.post(url)
        // .then(data => {

        // })
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Your Review"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <View style={styles.profileSection}>
                                {/* <View style={styles.profileImage}>
                                    <View style={styles.userImage}>
                                        <Image source={require('../../assets/img/userProfile.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                    </View>
                                    <Text style={styles.userName}>Jack Doe <Text style={{ color: '#59BD5A', fontSize: 15 }}>(New Seller)</Text></Text>
                                    <Text style={styles.userSkill} >I will design Professional & Creative business logo</Text>

                                </View> */}
                                <Text style={styles.userSkill} >Please share your valuable feedback and help other clients make better decision</Text>
                                <View style={styles.starSection}>
                                    <Text style={styles.starSectionHeader}>Quality of work</Text>
                                    <Text style={styles.skillText}>Was the quality of work delivered as per your expectation?</Text>
                                    <AirbnbRating
                                        reviews={["1", "2", "3", "4", "5",]}
                                        size={25}
                                        defaultRating={0}
                                        onFinishRating={this.ratingQlty}
                                        showRating={false}
                                    />



                                </View>

                                <View style={styles.starSection}>
                                    <Text style={styles.starSectionHeader}>On time delivery</Text>
                                    <Text style={styles.skillText}>Was the order delivered on time?</Text>
                                    <AirbnbRating
                                        reviews={["1", "2", "3", "4", "5",]}
                                        size={25}
                                        defaultRating={0}
                                        onFinishRating={this.ratingDel}
                                        showRating={false}
                                    />
                                </View>

                                <View style={styles.starSection}>
                                    <Text style={styles.starSectionHeader}>How responsive was the seller</Text>
                                    <Text style={styles.skillText}>How responsive was the seller during the order process? </Text>
                                    <AirbnbRating
                                        reviews={["1", "2", "3", "4", "5",]}
                                        size={25}
                                        defaultRating={0}
                                        onFinishRating={this.ratingSeller}
                                        showRating={false}
                                    />
                                </View>

                                <View style={styles.starSection}>
                                    <Text style={[styles.starSectionHeader, { textAlign: 'center' }]}>What was it like working with seller?</Text>
                                    <TextInput style={styles.input}
                                        
                                        placeholder={'Your comments'}
                                        placeholderTextColor="#212121"
                                        onChangeText={(seller_comment) => { this.setState({ seller_comment: seller_comment }) }}
                                        multiline={true}
                                        numberOfLines={4}
                                    ></TextInput>
                                </View>

                                <View style={styles.starSection}>
                                    <Text style={[styles.starSectionHeader,{marginBottom :10}]}>Rate Ekprice </Text>
                                   
                                    <AirbnbRating
                                        reviews={["1", "2", "3", "4", "5",]}
                                        size={25}
                                        defaultRating={0}
                                        onFinishRating={this.ratingEkprice}
                                        showRating={false}
                                    />
                                </View>

                                <View style={styles.starSection}>
                                    <Text style={[styles.starSectionHeader, { textAlign: 'center' }]}>Share your experience with Ekprice.</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'Share your experience'}
                                        placeholderTextColor="#212121"
                                        onChangeText={(app_comment) => { this.setState({ app_comment: app_comment }) }}
                                    ></TextInput>
                                </View>


                                <View >
                                    <TouchableOpacity style={styles.button} onPress={this.submitRating.bind(this)}>

                                        <Text style={styles.buttonText}>Submit</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>



                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(WriteReviews)