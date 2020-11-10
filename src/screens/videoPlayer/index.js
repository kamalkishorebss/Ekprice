import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import VideoPlayer from 'react-native-video-controls';

export default class VideoPlay extends React.Component {
	constructor(props) {
		super(props)

	}



	render() {
		let video = this.props.navigation.getParam('video')
		console.log(video)
		return (
			<View style={{ flex: 1, justifyContent: 'center', width: Dimensions.get('window').width, backgroundColor: '#fff' }}>
				<View style={{ flex: .1, justifyContent: 'center', alignItems: 'flex-end' }} >
					<TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => this.props.navigation.goBack()}><Icon name="close" size={30} color="#000" /></TouchableOpacity>
				</View>
				<View style={{ flex: .9, justifyContent: 'center', backgroundColor: '#fff' }}>
					<VideoPlayer
						source={{uri : video}}
						navigator={this.props.navigator}
					/>

					{/* <VLCPlayer
						ref={(ref) => (this.vlcPlayer = ref)}
						style={{ width: '100%', height: 400 }}
						videoAspectRatio="16:9"
						source={{uri: video}}
						//onProgress={this.onProgress.bind(this)}
						// onEnd={this.onEnded.bind(this)}
						// onBuffering={this.onBuffering.bind(this)}
						// onError={this._onError}
						// onStopped={this.onStopped.bind(this)}
						// onPlaying={this.onPlaying.bind(this)}
						// onPaused={this.onPaused.bind(this)}
					/> */}

				</View>

			</View>

		)
	}



};
