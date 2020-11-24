import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class NewHeader extends React.Component {
    onPressBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        const { navigation, title, lastSeen } = this.props;
        // console.log(this.props);
        return (
            <View style={{ 
                    flexDirection: "row", 
                    borderBottomColor: "#ddd", 
                    borderBottomWidth: 1, 
                    backgroundColor: '#f9f9f9', 
                    justifyContent: 'center', 
                    paddingVertical: 15 ,

                }}
            >
                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }} onPress={this.onPressBack}>
                    <Icon name="chevron-left" size={30} color="#525252" />
                </TouchableOpacity>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={{
                        color: '#212121',
                        fontSize: 18,
                        fontWeight: '500',
                        marginHorizontal: 15,
                        fontFamily: 'Poppins-Medium'
                    }}>{title}</Text>
                    <Text numberOfLines={1} style={{
                        color: '#949494',
                        fontSize: 9,
                        fontWeight: '200',
                        fontFamily: 'Poppins-regular'
                    }}>{lastSeen}</Text>
                </View>
                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} />
            </View>
        )
    }
}