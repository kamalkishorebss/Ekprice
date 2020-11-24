import React, { useEffect } from 'react'
import {
    View
} from 'react-native'

import {
    Header
} from '../../shares'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './style';
import MessageUserList from './MessageUserList'

import {
    allActions
} from '../../actions';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const Message = ({
    navigation,
    allActions
}) => {
    useEffect(() => {
        const focusListner = navigation.addListener("didFocus", () => {
            allActions.resetTotalUnreadMessage()
        })
    },[])
    return (
        <View style={styles.container}>
            <Header navigation={navigation} title={"Message"} />
            <View style={styles.mainContent}>
                <MessageUserList navigation={navigation}/>
            </View>
        </View>
    )
}

export default connect(null, mapDispatchToProps)(Message);