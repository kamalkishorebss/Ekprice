import React, { useEffect } from "react";

import IconBadge from 'react-native-icon-badge';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    Image,
    Text
} from 'react-native'
import {
  allActions
} from './src/actions'
import { TouchableOpacity } from "react-native-gesture-handler";

const mapStateToProps = (state) => {
    return {
      unreadCount: state.common.unreadCount
    }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    allActions: bindActionCreators(allActions, dispatch)
  })
}

const MessageIcon = ({
    focused,
    unreadCount,
    allActions,
    routeName
}) => {
    useEffect(() => {
      console.log("focused", focused, routeName)
      // if(focused && routeName === 'Message'){
      //   allActions.resetTotalUnreadMessage()
      // }
    },[unreadCount])
    return (
        <IconBadge
            MainElement={
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => allActions.resetTotalUnreadMessage()}
              >
                <Image
                  source={
                    focused
                      ? require('./src/assets/img/redchat.png')
                      : require('./src/assets/img/chat.png')
                  }
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 40 / 2,
                  }}
                />
              </TouchableOpacity>
            }
            BadgeElement={
                <Text style={{color:'#FFFFFF', fontSize: 9}}>{unreadCount}</Text>
            }
            IconBadgeStyle={
              {
                left: 28,
                top:6,
                width:18,
                height:18,
                borderRadius:9,
                backgroundColor: 'green'
              }
            }
            Hidden={unreadCount<1}
          />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageIcon);