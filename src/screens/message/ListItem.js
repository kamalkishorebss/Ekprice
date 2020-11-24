import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import styles from './style';
const defaultProfile = require('../../assets/img/default_profileImage.png');

const ListItem = ({
    item,
    onPressItem,
    count
}) => {
    const { id, receiver_pic, receiver_name, last_message_time, last_message, receiver_id } = item
    const userFireStoreReference = firestore().collection('Users')
    const [ senderStatus, setSenderStatus] = useState(false)
    useEffect(() => {
        const subscriber = userFireStoreReference.where('id', '==', receiver_id)
          .onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot &&
              querySnapshot.forEach((doc) => {
                list.push(doc.data());
              });
              if(list.length){
                const user = list[0]
                if (user.isOnline) {
                  setSenderStatus(true)
                } else {
                  setSenderStatus(false)
                }
              }
          })
        return () => subscriber();
      }, [])
    return (
        <TouchableOpacity style={styles.catItem} key={id} onPress={() => onPressItem(item)}>
            <View style={styles.userImage}>
                { receiver_pic 
                  ? <Image source={{ uri: receiver_pic }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                  : <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={defaultProfile} />
                }
            </View>
            <View style={styles.messageWrapper}>
                <View style={{ flexDirection: 'row', flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 4, flexDirection: 'row' }}>
                        <Text style={styles.userNameText} numberOfLines={1}>{receiver_name}</Text>
                        <View style={{ marginLeft : 10, borderRadius: 3.5 , height : 7 , width: 7, backgroundColor: senderStatus ? '#44bf13' : '#ddd', alignSelf: 'center', marginBottom: 10 }}></View>
                    </View>
                    <Text style={[styles.timingText, {  flex: 3, fontSize: 9 }]} numberOfLines={1}>{moment(last_message_time).format('MMM Do YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                  <Text style={{ flex: 1, color: '#555', fontFamily: 'Poppins-Regular', fontSize: 12 }} numberOfLines={1}>{last_message}</Text>
                  { count && 
                    <View style={{ borderRadius: 10, backgroundColor: 'red', height: 20, width: 20, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#fff'}}>{count.count}</Text>
                    </View>
                  }
                </View>
            </View>
           
        </TouchableOpacity>
    )
}

export default ListItem;
