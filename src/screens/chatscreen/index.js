import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
// import Upload from 'react-native-background-upload'
import Toast from 'react-native-simple-toast';

import {
  NewHeader
} from '../../shares'
import {
  allActions
} from '../../actions'
import styles from './styles'
import ListItem from './ListItem';

const mapDispatchToProps = (dispatch) => {
  return ({
    allActions: bindActionCreators(allActions, dispatch)
  })
}

const mapStateToProps = (state) => ({
  userId: state.common.getProfile.user_id,
  userName: state.common.getProfile.name,
  profile_pic: state.common.checkBtn === 1 ? state.common.getProfile.profile_pic : state.common.getProfile.seller_pic,
  receiverId: state.common.receiverId,
  receiverName: state.common.receiverName,
  receiverPic: state.common.receiverPic,
  checkBtn: state.common.checkBtn,
  sellerId: state.common.getProfile.seller_id
})

const MessageList = ({
  navigation,
  userId,
  receiverId,
  receiverName,
  profile_pic,
  receiverPic,
  userName,
  allActions,
  checkBtn,
  sellerId
}) => {
  const fireStoreReference1 = firestore().collection('Messages')
  const userFireStoreReference = firestore().collection('Users')
  const [typing, setTyping] = useState('')
  const [messages, setMessage] = useState([])
  const [list, setList] = useState([])
  const [senderStatus, setSenderStatus] = useState('')
  const [loader, setLoader] = useState(true)
  const [uploadItemId, setUploadItemId] = useState('')
  const [mediaLoader, setMediaLoader] = useState(false)
  const [showImo, setShowImo] = useState(false)
  const timeSince = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  useEffect(() => {
    const subscriber = userFireStoreReference.where('id', '==', receiverId)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot &&
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
        if (list.length) {
          const user = list[0]
          console.log('user', user)
          if (user.isOnline) {
            setSenderStatus('Online')
          } else {
            let aDay = moment(user.lastSeen).valueOf();
            const date = moment().format('LT');
            setSenderStatus(`last seen ${timeSince(aDay)} ago | Local Time ${date}`)
          }
        } else {
          console.log('this', querySnapshot)
        }
      })
    return () => subscriber();
  }, [])
  useEffect(() => {
    setLoader(true)
    const subscriber = fireStoreReference1.where('sender_id', 'in', [receiverId, userId])
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot &&
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          console.log('list', list)
        setList(list)
        setMessage(messageGroup(list));
        setLoader(false)
      }, error => console.log('error in query', error))
    return () => {
      subscriber()
      allActions.resetUnreadCount(receiverId)
    };
  }, [])

  const messageGroup = (list) => {
    const filterlist1 = list.filter(item => (item.receiver_id === userId || item.receiver_id === receiverId))
    const newList = _.orderBy(filterlist1, ['created_at'], ['desc']);
    const groupByList = _.mapValues(_.groupBy(newList, item2 => moment(item2.created_at).format('MMM Do YYYY')),
      clist => clist.map(item1 => _.omit(item1, item => moment(item.created_at).format('MMM Do YY'))));
    return Object.entries(groupByList)
  }
  const onPressMessage = (attachmentUrl) => {
    Linking.openURL(attachmentUrl);
  }
  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        profile_pic={profile_pic}
        item={item}
        onPressItem={onPressMessage}
        userId={userId}
        receiverPic={receiverPic}
        receiverName={receiverName}
        userName={userName}
        mediaLoader={mediaLoader}
        uploadItemId={uploadItemId}
      />
    )
  }
  const keyExtractor = (item) => item.id

  const uploadImage = (path, type, name, docId, messageData) => {
    setMediaLoader(true)
    let sellerFrom = new FormData();
    sellerFrom.append('attach_doc', {
      uri: path,
      type: type,
      name: name
    })
    // const options = {
    //   url: 'https://www.ekprice.com/api/upload-message-attach',
    //   path: path,
    //   method: 'POST',
    //   type: 'raw',
    //   // field: 'file',
    //   maxRetries: 2, // set retry count (Android only). Default 2
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //     // 'Accept': 'application/json'
    //   },
    //   body: sellerFrom,
    //   // Below are options only supported on Android
    //   notification: {
    //     enabled: false
    //   }
    // }
    // Upload.getFileInfo(path).then(metadata => {
    //   console.log("metadata", metadata)
    // }).catch(error => {
    //   console.log("metadata error", error)
    // })
    // Upload.startUpload(options).then((uploadId) => {
    //   console.log('Upload started', uploadId)
    //   Upload.addListener('progress', uploadId, (data) => {
    //     console.log(`Progress: ${data.progress}%`, data)
    //   })
    //   Upload.addListener('error', uploadId, (data) => {
    //     console.log(`Error: ${data.error}%`, data)
    //     // setMediaLoader(false)
    //     // uploadImage(path, type, name, messageData)
    //   })
    //   Upload.addListener('cancelled', uploadId, (data) => {
    //     console.log(`Cancelled!`, data)
    //   })
    //   Upload.addListener('completed', uploadId, (data) => {
    //     const res = JSON.parse(data.responseBody).imgpath
    //     console.log("imageath", res)
    //     fireStoreReference1.doc(docId).set({ ...messageData, attachmentUrl: res, type: checkBtn === 1 ? "user" : "seller" }).then(res => {
    //       setMediaLoader(false)
    //     })
    //   })
    // }).catch((err) => {
    //   console.log('Upload error!sdasd', err)
    //   setMediaLoader(false)
    //   uploadImage(path, type, name, messageData)
    // })
    fetch(`https://www.ekprice.com/api/upload-message-attach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: sellerFrom
    })
      .then(res => res.json())
      .then((json) => {
        fireStoreReference1.doc(docId).set({ ...messageData, attachmentUrl: json.imgpath, type: checkBtn === 1 ? "user" : "seller" }).then(res => {
          setMediaLoader(false)
          console.log('object', res)
        })
        console.log('json after upload', json)
      }).catch(error => {
        setMediaLoader(false)
        uploadImage(path, type, name, messageData)
        console.log('error in upload', error)
      })
  }
  const sendDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      console.log("res size", res)
      const { name, type, uri, size } = res
      if(size < 10000000){
        const docId = uuidv4()
        const id = uuidv4()
        allActions.addMessage({
          sender_id: userId, receiver_id: receiverId, message: typing, email_message_flag: true, usertype: checkBtn === 1 ? "user" : "seller"
        })
        const messageData = {
          attachment: true,
          attachmentUrl: uri,
          attachmentType: type,
          created_at: new Date().toISOString(),
          delivered_date: new Date().toISOString(),
          email_message_flag: true,
          id,
          message: typing,
          message_id: uuidv4(),
          receiver_id: receiverId,
          sender_id: userId,
          status: "pending",
          updated_at: new Date().toISOString()
        }
        setUploadItemId(id)
        setMessage(messageGroup([...list, messageData]))
        uploadImage(uri, type, name, docId, messageData)
      }else{
        Toast.showWithGravity('You can not upload file more than 10MB!!', Toast.LONG, Toast.CENTER);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  const sendMessage = async () => {
    if (typing) {
      if(mediaLoader){
        Toast.showWithGravity('hello world!', Toast.LONG, Toast.TOP);
      }else{
        allActions.addMessage({
          sender_id: userId, receiver_id: receiverId, message: typing, email_message_flag: true, usertype: checkBtn === 1 ? "user" : "seller"
        })
        const messageData = {
          attachment: false,
          created_at: new Date().toISOString(),
          delivered_date: new Date().toISOString(),
          email_message_flag: true,
          id: uuidv4(),
          message: typing,
          message_id: uuidv4(),
          receiver_id: receiverId,
          sender_id: userId,
          type: "pending",
          updated_at: new Date().toISOString(),
          type: checkBtn === 1 ? "user" : "seller"
        }
        fireStoreReference1.doc(uuidv4()).set(messageData).then((res) => {
          console.log('res', res)
        })
        setTyping('')
      }
    }
  };
  const renderGroup = ({ item, index }) => {
    const data = _.orderBy(item[1], ['created_at'], ['desc'])
    return (
      <>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          inverted
        />
        <Text style={[styles.message, { alignSelf: 'center', paddingVertical: 10 }]}>{item[0]}</Text>
      </>
    )
  }
  const onChangeText = text => setTyping(text)
  const selectImoji = emoji => {
    setTyping(prevState => `${prevState}${emoji}`)
  }
  return (
    <SafeAreaView style={styles.container}>
      <NewHeader navigation={navigation} title={receiverName} lastSeen={senderStatus} />
      <FlatList
        data={messages}
        inverted
        renderItem={renderGroup}
        ListHeaderComponent={() => loader && <ActivityIndicator size="large" color="#0000ff" />}
      />
      <KeyboardAvoidingView >
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, }, { transform: [{ rotate: '-45deg' }] }]} onPress={sendDoc}>
              <Icon name="attachment" size={26} color="#cecece" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={[{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }]} onPress={() =>  setShowImo(!showImo)}>
                  <Icon name="mood" size={26} color="#dc332e" />
                </TouchableOpacity> */}
          </View>
          <TextInput
            value={typing}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type a message"
            multiline={true}
            onChangeText={onChangeText}
          />
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={sendMessage}>
            <Icon name="send" size={26} color="#dc332e" />
          </TouchableOpacity>
        </View>
        {showImo &&
          <View style={{ height: 200 }}>
            <EmojiSelector
              onEmojiSelected={selectImoji}
              showSearchBar={false}
              showTabs={true}
              showHistory={true}
              showSectionTitles={false}
              category={Categories.all}
            />
          </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
