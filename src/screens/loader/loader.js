import React, { Component } from 'react';
import { View, Text,Animated,Easing, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
//import console = require('console');


export default class Loader extends React.Component {
	constructor(props) {
		super(props)
        this.RotateValueHolder = new Animated.Value(0);
	}

	componentDidMount = () => {
		//console.log(this.props.navigation.getParam('page'))
		this.StartImageRotateFunction();
		setTimeout(() => {
			if(this.props.navigation.getParam('page')=="Home"){
                this.props.navigation.navigate('Home');
            }else{
                this.props.navigation.navigate("Account", { 'type': 'seller' });
            }
		}, 1000);
	}
	
	StartImageRotateFunction() {
		this.RotateValueHolder.setValue(0);
		Animated.timing(this.RotateValueHolder, {
		  toValue: 1,
		  duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(() => this.StartImageRotateFunction());
	  }
	

	render() {
		const RotateData = this.RotateValueHolder.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		  });
		return (

			<View style={{ flex: 1, justifyContent: 'center',alignItems:'center',backgroundColor:'#fff' }}>
				<Animated.Image style={{width:100,height:100,transform: [{ rotate: RotateData }]}} source ={require('../../assets/img/gif.gif')}/>
			</View>

			
		)
	}



};
