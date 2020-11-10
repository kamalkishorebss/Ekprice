import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class ProductHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    
      }
    
   
    render() {
        const { navigation } = this.props
        console.log(this.props);
        const { title } = this.props
        return (
            <View style={{ flexDirection: "row", flex:0.1,borderBottomColor:"#ddd",borderBottomWidth:1,backgroundColor:'#fff' }}>

                <TouchableOpacity style={{ width: '20%',justifyContent:'center',alignItems:'center'  }}>
                    <Icon name="arrow-back" size={30} color="#525252" onPress={() => this.props.navigation.goBack()}/>

                </TouchableOpacity>
                <View style={{ width: '60%', alignItems: 'center',justifyContent:'center' }}>
                    <Text numberOfLines={1} style={{
                        color: '#112e5a',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginHorizontal: 15,
                        fontFamily: 'montserrat'
                    }}>{title}</Text>
                </View>
                <TouchableOpacity style={{ width: '20%',justifyContent:'center',alignItems:'center'  }} onPress={() => this.props.navigation.navigate("Cart")}>
                    <Icon name="local-grocery-store" size={30} color="#525252" />
                </TouchableOpacity>
            </View>
        )
    }
}