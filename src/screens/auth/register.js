import React, { Component } from 'react';
import { View, ActivityIndicator, Text, Platform, FlatList, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { Header, BasicHeader } from '../../shares/index';
import Toast, { DURATION } from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import firebase, { Notification, NotificationOpen } from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
const { width } = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';
//import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import messaging from '@react-native-firebase/messaging';

import {
	allActions
} from '../../actions'

const mapDispatchToProps = (dispatch) => {
	return ({
		allActions: bindActionCreators(allActions, dispatch)
	})
}

const mapStateToProps = (state) => {
	return state
}
const siteKey = '6Le-o-MUAAAAAOt_omF5gGY7sW6Qs10O-ciVIhfJ';
const baseUrl = 'https://www.ekprice.com/';

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email: '',
			password: '',
			phone: '',
			refreshering: false,
			visible: false,
			countries: [],
			country_code: "+91",
			token: '',
			device_type: '',
			googleCpta : ''
		}
	}

	componentDidMount() {
		fetch(`https://roomdaddy.com/api/getallcountry`).then(res => res.json()).then((json) => {
			const data = json;
			console.log('ddddddddddddddddddd', data)
			this.setState({ countries: data.data })
		});
	}

	Register = () => {
		if(this.state.googleCpta){
			if (this.state.username == '' || this.state.email == '' || this.state.password == '' || this.state.country_code == '' || this.state.phone == '') {
				alert("All fields are required")
			} else {
				this.setState({ refreshering: true });
				this.props.allActions.RegisterUser(this.state.username, this.state.email, this.state.password, this.state.country_code, this.state.phone,'Email').then(res => {
					console.log(res);
					if (res.status == true) {
						this.setState({ refreshering: false });
						this.loginUser(this.state.email, this.state.password)
					} else {
						this.setState({ refreshering: false });
						if (res.error.email) {
							this.refs.toast.show(res.error.email[0]);
						}
						if (res.error.phone_no) {
							this.refs.toast.show(res.error.phone_no[0]);
						}

					}
				})
			}
	    }else{
			alert("Please confirm the google Captcha")
		}


	}
	loginUser(e, p) {
		this.props.allActions.LoginUser(e, p).then(res => {
			console.log(res);
			//this.setState({ refreshering: true });
			if (res.status == true) {
				this.saveKey(res.data);
				this.saveToken(res.data.user_id);
				this.props.allActions.checkToggle(1);
				this.props.navigation.navigate("Home")
			} else {
				this.refs.toast.show(res.message);
			}
		})
	}


	saveToken = async (userID) => {
		if (Platform.OS == 'ios') {
			this.setState({ device_type: 'I' })
		} else {
			this.setState({ device_type: 'A' })
		}
		let fcmToken = await firebase.messaging().getToken();

		let param = {
			//'userType':userType,
			'userID': userID,
			'device_type': this.state.device_type,
			'deviceId': fcmToken
		}

		this.props.allActions.saveDeviceToken(param).then(res => {
			console.log(res);

		})
	}
	saveKey = async (value) => {
		try {
			await AsyncStorage.setItem('currentUser', JSON.stringify(value));
		} catch (error) {
			console.log("Error saving data" + error);
		}
	}

	signIn = () => {
		this.props.navigation.navigate("Login")

	}

	selectCountryCode() {
		this.setState({ visible: true })
	}


	onMessage = event => {
		if (event && event.nativeEvent.data) {
			if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
				this.captchaForm.hide();
				return;
			} else {
				console.log('Verified code from Google', event.nativeEvent.data);
				this.setState({googleCpta : event.nativeEvent.data})
				setTimeout(() => {
					this.captchaForm.hide();
					// do what ever you want here
				}, 1500);
			}
		}
	};

	render() {

		return (



			<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

				<View style={styles.container}>

					<View style={styles.logoImage}>
						<Image source={require('../../assets/img/2.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
					</View>

					<View style={styles.inputStyle}>

						<View style={{ width: '8%', alignSelf: 'center' }}>
							<Image source={require('../../assets/img/user.png')} /></View>
						<TextInput style={styles.input}
							placeholder={'Name'}
							placeholderTextColor="#767676"
							onChangeText={(username) => { this.setState({ username: username }) }}
						></TextInput>
					</View>
					<View style={styles.inputStyle}>

						<View style={{ width: '8%', alignSelf: 'center' }}>
							<Image source={require('../../assets/img/email.png')} /></View>
						<TextInput style={styles.input}
							placeholder={'Email'}
							placeholderTextColor="#767676"
							onChangeText={(email) => { this.setState({ email: email }) }}
						></TextInput>
					</View>

					<View style={{ width: '100%', flexDirection: 'row', padding: 15, }}>

						<View style={{ width: '15%', alignSelf: 'center', paddingLeft: 15 }}>
							<Image source={require('../../assets/img/phone.png')} />
						</View>
						<View style={{ width: '15%', height: 40, margin: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#D7D7DB', borderBottomWidth: 1 }}>
							<TouchableOpacity onPress={this.selectCountryCode.bind(this)} >
								<Text>{this.state.country_code}</Text>
							</TouchableOpacity>
						</View>
						<View style={{ width: "70%" }}>
							<TextInput style={[styles.input]}
								placeholder="Phone"
								underlineColorAndroid='transparent'
								onChangeText={(phone) => this.setState({ phone })}
								keyboardType='numeric'
								placeholderTextColor="#767676"
								returnKeyType="next"
							/>
						</View>


					</View>
					<View style={styles.inputStyle}>

						<View style={{ width: '8%', alignSelf: 'center' }}>
							<Image source={require('../../assets/img/lock.png')} /></View>
						<TextInput style={styles.input}
							placeholder={'Password'}
							placeholderTextColor="#767676"
							onChangeText={(password) => { this.setState({ password: password }) }}
						></TextInput>
					</View>

					<ConfirmGoogleCaptcha
						ref={_ref => this.captchaForm = _ref}
						siteKey={siteKey}
						baseUrl={baseUrl}
						languageCode='en'
						onMessage={this.onMessage}
					/>
					
					{/* <View style={{ padding: 10 }}>
					       <Text style={[styles.buttonText,{color:'red'}]} onPress={() => {
								this.captchaForm.show();
							}}> Confirm Google Captcha</Text>
						<TouchableOpacity style={styles.button}
							onPress={this.Register.bind(this)}
						>
							{this.state.refreshering ?
								<ActivityIndicator size="large" color="#fff" />
								:
								<Text style={styles.buttonText}> Register</Text>
							}

						</TouchableOpacity>
					</View> */}
					<Text style={{ color: "#000", textAlign: 'center', padding: 10, fontSize: 15, fontFamily: 'Poppins-Regular' }} onPress={this.signIn.bind(this)}> Already Have An Account? <Text style={{ color: '#DB0A23', fontWeight: 'bold' }}>Login </Text></Text>
				</View>
				<Toast
					ref="toast"
					style={{ backgroundColor: 'red' }}
					position='bottom'
					positionValue={200}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#fff', fontSize: 14, padding: 5, fontWeight: 'bold' }}
				/>

				<View style={{ justifyContent: 'flex-end', marginTop: 50 }}>
					<Text style={{ color: "#333", textAlign: 'left', padding: 20, fontSize: 14 }} >Ekprice collects only such Personal Information that we believe to be relevant and is required to understand you or your interests<Text style={{ color: '#DB0A23', fontWeight: 'bold' }} onPress={() => { openURL('https://www.ekprice.com/privacy_policy') }}>  Learn More </Text></Text>
				</View>
				<Dialog
					visible={this.state.visible}
					onTouchOutside={() => {
						this.setState({ visible: false });
					}}
					height={500}
				>
					<DialogContent style={{ width: '100%', backgroundColor: '#fff' }}>


						<FlatList
							data={this.state.countries}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) =>
								<TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderColor: "#ddd" }} onPress={() => { this.setState({ visible: false, country_code: item.phonecode, flag: item.image }) }}>
									<View style={{ justifyContent: 'center', alignItems: 'center', }}><Image source={{ uri: item.image }} style={{ width: 30, height: 30, resizeMode: 'cover' }} /></View>

									<Text style={{ paddingTop: 10, fontSize: 14, color: '#000', textAlign: 'center', textAlignVertical: 'center', fontFamily: "Poppins-Regular", fontWeight: '500', }}>  {item.name} (+{item.phonecode})</Text>
								</TouchableOpacity>
							}
						/>


					</DialogContent>
				</Dialog>
			</ScrollView>



		)
	}



};

export default connect(mapStateToProps, mapDispatchToProps)(Register)