import React from 'react';
import {
    View,
} from 'react-native';
import moment from 'moment';

import ProfileThumbnail from './ProfileThumbnail';
import styles from './styles';
import TextItem from './TextItem';
import MediaItem from './MediaItem';
import UserName from './UserName';

const ListItem = ({
    profile_pic,
    item,
    onPressItem,
    userId,
    receiverPic,
    receiverName,
    userName,
    mediaLoader,
    uploadItemId
}) => {
    const { attachmentUrl, attachment, attachmentType, sender_id, message, created_at } = item
    const name = sender_id === userId ? 'Me' : receiverName
    const time = moment(item.created_at).format('LT')
    if (attachment) {
        return (
            <View style={styles.row}>
                <ProfileThumbnail
                    profile_pic={profile_pic}
                    userId={userId}
                    sender_id={sender_id}
                    receiverPic={receiverPic}
                />
                <View>
                    <UserName name={name} time={time} />
                    <MediaItem
                        attachmentUrl={attachmentUrl}
                        attachment={attachment}
                        attachmentType={attachmentType}
                        onPressItem={onPressItem}
                        mediaLoader={mediaLoader}
                        uploadItemId={uploadItemId}
                        id={item.id}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.row]}>
            <ProfileThumbnail
                profile_pic={profile_pic}
                userId={userId}
                sender_id={sender_id}
                receiverPic={receiverPic}
            />
            <View>
                <UserName name={name} time={time}/>
                <TextItem message={message} />
            </View>
        </View>
    )
}

export default ListItem;
