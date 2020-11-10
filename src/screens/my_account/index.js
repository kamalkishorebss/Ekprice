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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'

import {
    normalize
} from '../../helpers'

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
        switchSeller : state.common.switchSeller
    }
}

const radio_props = [
    { label: 'Enabled', value: 'Enabled' },
    { label: 'Disabled', value: 'Disabled' }
];

class SellerAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }



    }

    componentDidMount() {
        //this.getKey();
        // this.props.userActions.getLiveDraws().then(res=>{
        //  // console.log('upcoming',res);
        //   if(res.length>0){
        //     let u = []
        //     for(var i=0;i<3;i++){
        //       //console.log('hhh',res[i])
        //       u.push(res[i])
        //     }
        //     this.setState({upcomingDraws : u})
        //   }
        // })
         
        this.props.allActions.get_Category().then(res => {
            // console.log('upcoming',res);
            if (res.status == true) {

                let w = []
                for (var i = 0; i < 4; i++) {
                    //console.log('hhh',res[i])
                    w.push(res.CATEGORIES[i])
                }
                this.setState({ categoriesList: w })


            } else {
                alert("Network Error")
            }

        })
    } 
        
        async getKey() {


            const value = await AsyncStorage.getItem('currentUser');
            console.log('gggggg', value);
            if (value == null) {
                this.props.navigation.navigate("Login");
            } else {
                this.props.navigation.navigate("Home");
            }
    
    
        }

        async logout() {
           
            try {
              
              await AsyncStorage.removeItem('currentUser');
              this.props.navigation.navigate("Login")
             
            } catch (error) {
              console.log("Error resetting data" + error);
            } 
            
          }
        


    

    render() {

        return (
            <View style={styles.container}>
                <Header {...this.props} title={"Account"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <View style={styles.accountHeader}>
                                <View style={styles.accountHeaderTab}>
                                    <Text style={styles.accountHeaderText}>Account</Text>
                                </View>
                                <View style={styles.accountHeaderTab}>
                                    <Text style={styles.accountHeaderText}>Support</Text>
                                </View>
                            </View>
                            <View style={styles.profileSection}>
                                <View style={styles.profileImage}>
                                    <View style={styles.userImage}>
                                        <Image source={require('../../assets/img/userProfile.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                        <Icon name='plus' color="red" size={30}></Icon> 
                                    </View>
                                    <Text style={styles.userName}>Anakin Skywalker</Text>
                                    <Text style={{fontSize:11,fontFamily:'Poppins-Regular'}}>anakinskywalker@gmail.com | +91 995612486</Text>
                                    <Text style={{fontSize:11,fontFamily:'Poppins-Regular'}}>Seller ID 74548 | Joined in January, 2020</Text>
                                </View>

                            </View>


                        </View>
                        <View style={styles.otherInfo}>
                            <Text style={styles.otherHeader}>Level <Text style={{ fontSize: 16, fontFamily: 'Poppins-Meddium', fontWeight: 'bold', paddingLeft: normalize(16) }}>   Top Rated</Text></Text>
                            <View style={[styles.serviceLevel,{flexDirection:'row'}]}>
                                <Text style={{paddingHorizontal:normalize(8)}}>Status</Text> 
                                <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={12}
                                buttonColor={'#525252'}
                                onPress={(value) => {
                                    this.setState({ value: value })
                                }
                                }
                                formHorizontal={true}
                                labelStyle={{ paddingHorizontal: 10, color: 'gray'}}
                            /></View>
                            <View style={styles.serviceLevel}><Image source={require('../../assets/img/add.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Add Services</Text></View>
                            <View style={styles.serviceLevel}><Image source={require('../../assets/img/ser.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>My Services</Text></View>
                            <View style={styles.serviceLevel}><Image source={require('../../assets/img/earnings.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Your Earnings</Text></View>
                            <View style={styles.serviceLevel}><Image source={require('../../assets/img/user.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Edit Profile</Text></View>
                            <TouchableOpacity style={styles.serviceLevel} onPress={this.logout.bind(this)}><Image source={require('../../assets/img/logout.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Logout</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SellerAccount)