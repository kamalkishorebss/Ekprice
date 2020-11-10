import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class ApprovalPage extends React.Component {
    constructor(props) {
        super(props)

    }

    UNSAFE_componentWillMount = () => {

    }









    render() {

        return (
            <View style={styles.container}>
                {/* <View style={{ flex: .1, flexDirection: "row", borderBottomColor: 'gray', borderBottomWidth: 1 }}>

                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center' }} />
                    <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text numberOfLines={1}></Text>
                    </View>
                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }} onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name="autorenew" size={30} color="green" />
                    </TouchableOpacity>
                </View> */}

                <View style={styles.sectionContainer}>
                    <View style={{ flex: .3, width: '100%', height: Dimensions.get('window').width * (9 / 16),alignItems:'center',justifyContent:'flex-end' }}>
                        <View style={{ width: 200, height: 100 ,marginTop:20}}>
                            <ImageBackground source={require('../../assets/img/logo.png')} style={{ width: '100%', height: '100%' }} resizeMode="center"></ImageBackground>
                        </View>
                    </View>
                    <View style={{ flex: .4, width: '100%',justifyContent:'center',alignItems:'center'}}>
                      <Text style={styles.contentTxt}>Thanks for your interest to join Ekprice as a freelancer. </Text>
                      <Text style={styles.contentTxt}>It usually take 24-48 hours for our team to check your profile and approve it. </Text>
                    </View>
                    <View style={{ flex: .3, width: '100%',alignItems:'center'}}>
                        <TouchableOpacity style={{ width: 130, justifyContent: 'center', alignItems: 'center', paddingLeft: 10,backgroundColor:'#59BD5A' }} onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={styles.buttonText}>Go To Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

        )
    }



};
