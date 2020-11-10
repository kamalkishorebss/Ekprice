import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { allActions } from '../actions/index'
import axios from "axios";
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
        checkBtn  : state.common.checkBtn
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggle: 0
        }

    }
    componentDidMount=async()=>{
       
           
      
       
    }

    switchToUser() {
        this.props.allActions.getUserProfile(this.props.loginStatus.data.user_id, 'u').then(res => {
            console.log("profile response", res)
            if (res.user_id) {
                this.props.allActions.checkToggle(1);
                this.props.navigation.navigate("Loader",{'page':'Home'});
               // this.props.navigation.navigate("Home")
            }
        })
    }
    
    
    switchToSeller() {
        this.props.allActions.switch_Seller(this.props.loginStatus.data.user_id).then(res => {
            console.log("check user type", res)
            if (res.status == true) {
                if(res.data.isSeller == 0 || res.data.isSeller == null){
                    this.props.allActions.getSellerProfile(this.props.loginStatus.data.user_id);
                    this.props.navigation.navigate("Step1")
                }else{
                    if(res.data.isApproved == '1'){
                        this.props.allActions.getSellerProfile(this.props.loginStatus.data.user_id);
                        this.props.allActions.checkToggle(2);
                        this.props.navigation.navigate("Loader",{'page':'Account'})
                    }else{
                        this.props.navigation.navigate("ApprovalPage")
                    }
               }
            } 
            if (res.status == false){
                this.props.navigation.navigate("AddSeller1")
            }
        })
        
    }
    
    
    render() {
        const { navigation,toggle } = this.props
        console.log("Header Props", toggle);
        return (
            <View style={{ flex: .1, flexDirection: "row", borderBottomColor: "#ddd", borderBottomWidth: 1, backgroundColor: '#fff', justifyContent: 'center' }}>

                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start',paddingLeft:16 }} onPress={() => this.props.navigation.navigate("Categories")}>

                    <Image source={require('../../src/assets/img/fourdots.png')} style={{ width: 20, height: 20 }}></Image>

                </TouchableOpacity>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{
                        color: '#212121',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginHorizontal: 15,
                        fontFamily: 'Poppins-Medium'
                    }}>{this.props.title}</Text>
                </View>

                {this.props.checkBtn == 1 ?
                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center',padding:5 }} onPress={this.switchToSeller.bind(this)}>
                        <Image source={require('../../src/assets/img/userSwitch.png')} style={{ width: '100%'}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    :
                    null
                }

                {this.props.checkBtn == 2 ?
                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center',padding:5 }} onPress={this.switchToUser.bind(this)}>
                        <Image source={require('../../src/assets/img/seller.png')} style={{ width: '100%'}} resizeMode="contain"></Image>
                    </TouchableOpacity>
                    :
                    null
                }
                {this.props.checkBtn == null || this.props.checkBtn == 0?
                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} resizeMode="cover"/>
                    :
                    null
                }

            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);