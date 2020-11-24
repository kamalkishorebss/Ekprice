import React, { useEffect, useState } from 'react';
import { 
    Text,
    View,
    FlatList
 } from 'react-native';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';
 import AsyncStorage from '@react-native-community/async-storage';

import {
    allActions
} from '../../actions';
import ListItem from './ListItem';

const mapStateToProps = (state) => {
   
    return {
        conversations: state.common.conversations,
        checkBtn: state.common.checkBtn,
        userId: state.common.getProfile.user_id,
        sellerId: state.common.getProfile.seller_id,
        unreadMessageCount: state.common.unreadMessageCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const MessageUseList = ({
    conversations,
    navigation,
    checkBtn,
    userId,
    allActions,
    sellerId,
    unreadMessageCount
}) => {
    useEffect(() => {
        getKey()
    },[userId, checkBtn])
    const getKey = async () => {
        const value = await AsyncStorage.getItem('currentUser');
        if (value == null) {
            navigation.navigate("Login");
        } else {
            if (checkBtn === 1) {
                allActions.getConversation(userId, 'conversation-sellers')
            } else {
                allActions.getConversation(sellerId, 'conversation-users')
            }
        }
    }
    const onPressItem = (item) => {
        const { receiver_id, receiver_name, receiver_pic } = item
        allActions.setReceiverId(receiver_id, receiver_name, receiver_pic)
        navigation.navigate("ChatScreen")
    }
    const renderItem = ({ item, index }) => {
        const count = unreadMessageCount.find(it =>  {
            return it.receiverId === item.receiver_id
        })
        return (
            <ListItem 
                item = {item}
                onPressItem={onPressItem}
                count={count ? count : false}
            />
        )
            
    } 
    const keyExtractor = (item, index) => `${item.id}`
    return(
        <FlatList
            data={conversations}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageUseList);
