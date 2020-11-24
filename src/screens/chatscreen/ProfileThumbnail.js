import React from 'react';
import {  Image } from 'react-native';
import ImageLoad from 'react-native-image-placeholder'

import styles from './styles'
const defaultProfile = require('../../assets/img/default_profileImage.png')
//default_profileImage
const ProfileThumbnail = ({
    profile_pic,
    userId,
    sender_id,
    receiverPic
}) => {
    if(userId === sender_id){
        if(!profile_pic){
            return <Image style={styles.avatar} source={defaultProfile} />
        }
        return (
            <Image style={styles.avatar} source={{ uri: profile_pic }} />
        )
    }
    if(receiverPic){
        return (
            <Image style={styles.avatar} source={{ uri: receiverPic }} />
        )
    }
    return <Image style={styles.avatar} source={defaultProfile} />
    
}

export default ProfileThumbnail;
