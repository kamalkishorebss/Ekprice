import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import firebase from "react-native-firebase";


export default class Splash extends React.Component {
	constructor(props) {
		super(props)

	}

	UNSAFE_componentWillMount = () => {
		this.createNotificationListeners()
		setTimeout(() => {
			this.setToggle();
			this.props.navigation.navigate("Home");
			this.getKey();
		}, 6000);
	}
	
	setToggle=async()=>{
		try {
			await AsyncStorage.setItem('toggleBtn', "0");
		} catch (error) {
			console.log("Error saving data" + error);
		}
	}
	async getKey() {
		const value = await AsyncStorage.getItem('currentUser');
		console.log('gggggg', value);
		if (value == null) {
			this.props.navigation.navigate("Home");
		} else {
			this.props.navigation.navigate("Home");
		}


	}



	async createNotificationListeners() {
		//alert('1')

		// This listener triggered when notification has been received in foreground
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { title, body } = notification;
			//alert('2')
		  this.displayNotification(title, body);
		});
	
		// This listener triggered when app is in backgound and we click, tapped and opened notifiaction
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			const { title, body } = notificationOpen.notification;
			//alert('3')
		  this.displayNotification(title, body);
		});
	
		// This listener triggered when app is closed and we click,tapped and opened notification 
		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			//alert('4')
		  const { title, body } = notificationOpen.notification;
		  this.displayNotification(title, body);
		}
	  }
	
	
	  displayNotification(title, body) {
		// we display notification in alert box with title and body
		// Alert.alert(
		//   title, body,
		//   [
		// 	{ text: 'Ok', onPress: () => console.log('ok pressed') },
		//   ],
		//   { cancelable: false },
		// );
	  }
	

	render() {
		let video = require('../../assets/video/v2.mp4')
		return (
			<View style={{ flex: 1, justifyContent: 'center',width:Dimensions.get('window').width,backgroundColor:'#fff'  }}>
            <View style={{ flex:.4,width:'100%',height: Dimensions.get('window').width * (9 / 16)}}>
			    <View style={{width:'100%',height:'100%'}}>
				  <ImageBackground source={require('../../assets/img/b1.png')} style={{width:'100%',height:'100%'}} resizeMode="contain"></ImageBackground>
			    </View>
			</View>
			<View style={{ flex: .2, justifyContent: 'center',backgroundColor:'#fff' }}>
				<Video source={video}   // Can be a URL or a local file.
					ref={(ref) => {
						this.player = ref
					}}                                      // Store reference
					onBuffer={this.onBuffer}                // Callback when remote video is buffering
					onError={this.videoError}
					resizeMode={'cover'}
					// Callback when video cannot be loaded
					style={{

						width: Dimensions.get('window').width,
						height: Dimensions.get('window').width * (7 / 20),

						// width: '80%',
						// height: 20,
					}} />
			</View>
			<View style={{ flex: .4,width:'100%',height: Dimensions.get('window').width * (9 / 16)}}>
			   <View style={{width:'100%',height:'100%'}}>
                <ImageBackground source={require('../../assets/img/b2.png')} style={{width:'100%',height:'100%'}} resizeMode="contain"></ImageBackground>
				</View> 
			</View>
			</View>
			
		)
	}



};
