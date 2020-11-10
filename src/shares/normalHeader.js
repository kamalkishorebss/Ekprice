import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class NormalHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }


    render() {
        const { navigation } = this.props
        const { title } = this.props
        
        return (
            <View style={{ height:60,flexDirection: "row",  borderBottomColor: "#ddd", borderBottomWidth: 1, backgroundColor: '#fff',justifyContent:'center' }}>

                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#525252"  />

                </TouchableOpacity>
                <View style={{ width: '60%', alignItems: 'center',justifyContent:'center' }}>
                    <Text numberOfLines={1} style={{
                        color: '#112e5a',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginHorizontal: 15,
                        fontFamily: 'Poppins-Medium'
                    }}>{title.cat_title}</Text>
                </View>
               
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center',flexDirection:'row' }} >
                    {/* <TouchableOpacity style={{ width: '49%',margin : '1%'}} ><Image source={require('../assets/img/search.png')} style={{width:30,height:30}}/></TouchableOpacity> */}
                    <TouchableOpacity style={{ width: '49%',margin : '1%'}} onPress={()=>{this.props.navigation.navigate('Filter',{'slug':title})}}><Image source={require('../assets/img/filter.png')} style={{width:30,height:30}}/></TouchableOpacity>
                </View>   
                
                
                
            </View>
        )
    }
}