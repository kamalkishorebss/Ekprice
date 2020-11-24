import React from 'react';
import { 
    TouchableOpacity, 
    Image,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder'

import styles from './styles'
import MediaImage from './MediaImage';

const MediaItem = ({
    attachmentUrl, 
    attachment, 
    attachmentType,
    onPressItem,
    mediaLoader,
    uploadItemId,
    id
}) => {
    const mainType = attachmentType.split('/')
    
    return (
        <TouchableOpacity style={styles.rowText} onPress={() => onPressItem(attachmentUrl)}>
            <MediaImage 
                type={mainType[0]} 
                subType={mainType[1]} 
                uri={attachmentUrl}
                mediaLoader={mediaLoader}
                uploadItemId={uploadItemId}
                id={id}
            />
        </TouchableOpacity>
    )
}

export default MediaItem;
