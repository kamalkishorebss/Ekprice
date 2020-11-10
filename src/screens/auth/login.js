import React, { Component } from 'react';
import { View, ActivityIndicator, Text, Platform, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { Header, BasicHeader } from '../../shares/index';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase, { Notification, NotificationOpen } from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from 'react-native-google-signin';
import { allActions } from '../../actions';
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
	return ({
		allActions: bindActionCreators(allActions, dispatch)
	})
}

const mapStateToProps = (state) => {
	return state
}

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			refreshering: false,
			token: '',
			device_type: ''
		}

	}
	componentDidMount() {
		this.config()
	}
	config() {
		GoogleSignin.configure({
			scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
			webClientId:
				'87211480811-9egkisnv8n0eunc385380k4lrvfsqvnd.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
			offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		});
	}

	signIn = () => {
		//this.props.navigation.navigate("MyAccount")
		if (this.state.email == "" || this.state.password == "") {
			this.refs.toast.show("All fields required");
		} else {

			this.setState({ refreshering: true });
			this.props.allActions.LoginUser(this.state.email, this.state.password).then(res => {
				console.log(res);
				//this.setState({ refreshering: true });
				if (res.status == true) {
					this.setState({ refreshering: false });
					this.saveKey(res.data);
					this.saveToken(res.data.user_id);
					this.props.allActions.checkToggle(1);
					this.props.navigation.navigate("Home")
				} else {
					this.setState({ refreshering: false });
					this.refs.toast.show(res.message);
				}
			}).catch((err) => {
				console.log(err)
				this.refs.toast.show(err);
			})
		}
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



	registerPage = () => {
		this.props.navigation.navigate("Register")
	}

	onSignInWithGoogle = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo)
			if (userInfo) {
				this.setState({ refreshering: true });
				let loginType = "Google-Login"
				this.props.allActions.RegisterUser(userInfo.user.name, userInfo.user.email,loginType).then(res => {
					console.log('social-login', res);
					if (res.status == true) {
						this.setState({ refreshering: false });
						this.saveKey(res.data);
						this.saveToken(res.data.user_id);
						this.props.allActions.checkToggle(1);
						this.props.navigation.navigate("Home")
					} else {
						this.setState({ refreshering: false });
					}
				})
			}
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
				console.log('Cancel');
			} else if (error.code === statusCodes.IN_PROGRESS) {
				console.log('Signin in progress');
				// operation (f.e. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				console.log('PLAY_SERVICES_NOT_AVAILABLE');
				// play services not available or outdated
			} else {
				console.log(error);
				// some other error happened
			}
		}
	};


	onSignInWithFacebook = async () => {
		LoginManager.logInWithPermissions(["public_profile","email"]).then(result=>{
				if (result.isCancelled) {
					console.log("Login cancelled");
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						//console.log('token', data)
						fetch('https://graph.facebook.com/v3.1/me?fields=email,name,first_name,last_name,picture&access_token=' + data.accessToken)
							.then((response) => response.json())
							.then((json) => {
								console.log('fb login ---------',json)
							
									let loginType = "FBLogin"
									this.setState({ refreshering: true });
									this.props.allActions.RegisterUser(json.name,json.email,loginType).then(res => {
										console.log('social-login', res);
										if (res.status == true) {
											this.setState({ refreshering: false });
											this.saveKey(res.data);
											this.saveToken(res.data.user_id);
											this.props.allActions.checkToggle(1);
											this.props.navigation.navigate("Home")
										} else {
											this.setState({ refreshering: false });
										}
									})
							
								// Some user object has been set up somewhere, build that user here
							})
							.catch((error) => {
								console.log("Token", JSON.stringify(error))
							})
					})
					console.log(
						"Login success with permissions: " +
						result.grantedPermissions.toString()
					);
				}
			}
		);
		


	}



	render() {

		return (
			<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

				<View style={styles.container}>
					<View style={{ flex: .1, flexDirection: "row", backgroundColor: '#F2F4F6', justifyContent: 'center' }}>

						<TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }} onPress={() => { this.props.navigation.navigate("Home") }}>

							<Icon name="chevron-left" size={30} color="#525252" />

						</TouchableOpacity>
						<View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
							<Text numberOfLines={1}></Text>
						</View>
						<TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} />


					</View>
					<View style={styles.logoImage}>
						<Image source={require('../../assets/img/1.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
						{/* <View style={{width: width  - 40,height: (width / 6) - 10,}}>
						  <Image source={require('../../assets/img/logo.png')} style={{ width: '100%',height:'100%',resizeMode:'contain' }} />
						</View>
						<Text style={styles.headerText}>Login</Text> */}
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

					<View style={styles.inputStyle}>
						<View style={{ width: '8%', alignSelf: 'center' }}>
							<Image source={require('../../assets/img/lock.png')} /></View>
						<TextInput style={styles.input}
							placeholder={'Password'}
							placeholderTextColor="#767676"
							secureTextEntry={true}
							onChangeText={(password) => { this.setState({ password: password }) }}
						></TextInput>

					</View>

					<View style={{ paddingTop: 10 }}>
						<TouchableOpacity style={styles.button}
							onPress={this.signIn.bind(this)}
						>
							{this.state.refreshering ?
								<ActivityIndicator size="large" color="#fff" />
								:
								<Text style={styles.buttonText}> Login</Text>
							}
						</TouchableOpacity>
					</View>
					<Text style={{ color: "#767676", textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular' }} onPress={() => { this.props.navigation.navigate('RestorePassword') }}> Forgot Password ?</Text>

					<View style={styles.socialView}>
						<TouchableOpacity style={styles.socialIcon} onPress={this.onSignInWithFacebook.bind(this)}>
							<Image source={require('../../assets/img/f_icon.png')} style={styles.previewImage} />

						</TouchableOpacity>
						<TouchableOpacity style={styles.socialIcon} onPress={this.onSignInWithGoogle.bind(this)}>
							<Image source={require('../../assets/img/g_icon.png')} style={styles.previewImage} />

						</TouchableOpacity>
					</View>

					{/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}

					<Text style={{ color: "#333", textAlign: 'center', padding: 10, fontSize: 14, fontFamily: 'Poppins-Regular' }} onPress={this.registerPage.bind(this)}> Don't Have an account? <Text style={{ color: '#DB0A23', fontWeight: 'bold' }}>Sign Up </Text></Text>

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

				</View>
				<View style={{ justifyContent: 'flex-end', marginTop: 50 }}>
					<Text style={{ color: "#333", textAlign: 'left', padding: 20, fontSize: 14, fontFamily: 'Poppins-ExtraLight', }} onPress={this.registerPage.bind(this)}>Ekprice collects only such Personal Information that we believe to be relevant and is required to understand you or your interests<Text style={{ color: '#DB0A23', fontWeight: 'bold' }} onPress={() => { openURL('https://www.ekprice.com/privacy_policy') }}>  Learn More </Text></Text>
				</View>



			</ScrollView>






		)
	}



};
export default connect(mapStateToProps, mapDispatchToProps)(Login)