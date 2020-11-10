import React, { Component } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, TextInput, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { Header, BasicHeader } from '../../shares/index';
import Toast, { DURATION } from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

class RestorePassword extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			refreshering: false,
		}
	}

	reset = () => {
		this.setState({ refreshering: true })
		let formData = new FormData();
		formData.append('user_login', this.state.email);
		console.log(formData);
		fetch(`https://www.ekprice.com/api/forgot/password?email=${this.state.email}`, {
			method: 'POST',
			headers: {
				"Accept": 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			//body: formData
		}).then(res => res.json()).then((json) => {
			console.log("user updated", json)
			if(json.success){
				this.refs.toast.show(json.success);
				this.setState({ refreshering: false });
			}else{
				this.refs.toast.show(json.error);
				this.setState({ refreshering: false });
			}
			
			
		})
	}



	render() {

		return (
			<ScrollView style={{
				flex: 1,
				backgroundColor: '#fff',

			}}>

				<View style={{
					flex: 1,
					width: '100%',
					backgroundColor: '#fff',
					justifyContent: 'center', alignItems: 'center'

				}}>
					<BasicHeader  {...this.props}  />
					<View style={{
						flex: .9,
						width: '80%',
						height :500,
						justifyContent: 'flex-start', alignItems: 'center',
						backgroundColor: '#fff', borderRadius: 10, padding: 10,
					}}>
						<View style={{ width: 300, height: 100, alignSelf: 'center' }}>
							<Image source={require('../../assets/img/logo.png')} style={{ width: '100%', height: '100%', resizeMode: 'center' }} />
						</View>

                        <Text></Text>
						<Text></Text>
                        <Text style={{ color: "#767676", textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Medium' }} > Reset your password here.</Text>

						<View style={styles.inputStyle}>

							<View style={{ width: '8%', alignSelf: 'center' }}>
								<Image source={require('../../assets/img/email.png')} /></View>
							<TextInput style={styles.input}
								placeholder={'Email'}
								placeholderTextColor="#767676"
								onChangeText={(email) => { this.setState({ email: email }) }}
							></TextInput>
						</View>

						<View style={{ paddingTop: 10 }}>
							<TouchableOpacity style={styles.button} onPress={this.reset.bind(this)}>
								{this.state.refreshering ?
									<ActivityIndicator size="large" color="#fff" />
									:
									<Text style={styles.buttonText}> Submit </Text>
								}
							</TouchableOpacity>
						</View>

						<Toast
							ref="toast"
							style={{ backgroundColor: 'red' }}
							position='center'
							positionValue={200}
							fadeInDuration={1000}
							fadeOutDuration={1000}
							opacity={0.8}
							textStyle={{ color: '#fff', fontSize: 14, padding: 5, fontWeight: 'bold' }}
						/>

					</View>

				</View>


			</ScrollView>






		)
	}



};
export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword)