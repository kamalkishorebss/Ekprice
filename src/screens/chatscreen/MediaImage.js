import React from 'react';
import { Image, ImageBackground, ActivityIndicator } from 'react-native';
import ImageLoad from 'react-native-image-placeholder'


const MediaImage = ({
    type,
    subType,
    uri,
    mediaLoader,
    uploadItemId,
    id
}) => {
    
    if(type ==='image'){
        if(mediaLoader && uploadItemId === id){
            return  <ImageBackground 
                        source={require('../../assets/img/imageThumbnail.png')} 
                        style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}
                
                    >
                        <ActivityIndicator size="small" color="#aaa" />
                    </ImageBackground>
        }
        return <ImageLoad source={{ uri }} style={{ height: 100, width: 100 }} />
    }
    if(type === 'video'){
        if(mediaLoader && uploadItemId === id){
            return  <ImageBackground 
                        source={require('../../assets/img/video-player.png')}
                        style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ActivityIndicator size="small" color="#aaa" />
                    </ImageBackground>
        }
        return <Image source={require('../../assets/img/video-player.png')} style={{ height: 70, width: 70 }} />
    }
    if(type === 'audio'){
        if(mediaLoader && uploadItemId === id){
            return  <ImageBackground 
                        source={require('../../assets/img/volume.png')}
                        style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ActivityIndicator size="small" color="#aaa" />
                    </ImageBackground>
        }
        return <Image source={require('../../assets/img/volume.png')} style={{ height: 70, width: 70 }} />
    }
    if(subType === 'pdf'){
        if(mediaLoader && uploadItemId === id){
            return  <ImageBackground 
                        source={require('../../assets/img/pdfThumbnail.png')}
                        style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ActivityIndicator size="small" color="#aaa" />
                    </ImageBackground>
        }
        return <Image source={require('../../assets/img/pdfThumbnail.png')} style={{ height: 70, width: 70 }} />
    }
    if(subType === 'vnd.openxmlformats-officedocument.wordprocessingml.document'){
        if(mediaLoader && uploadItemId === id){
            return  <ImageBackground 
                        source={require('../../assets/img/docThumnail.png')}
                        style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ActivityIndicator size="small" color="#aaa" />
                    </ImageBackground>
        }
        return <Image source={require('../../assets/img/docThumnail.png')} style={{ height: 70, width: 70 }} />
    }
    if(mediaLoader && uploadItemId === id){
        return  <ImageBackground 
                    source={require('../../assets/img/zipThumbnail.png')}
                    style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}
                >
                    <ActivityIndicator size="small" color="#aaa" />
                </ImageBackground>
    }
    return (
        <Image source={require('../../assets/img/zipThumbnail.png')} style={{ height: 70, width: 70 }} />
    )
}

export default MediaImage;
