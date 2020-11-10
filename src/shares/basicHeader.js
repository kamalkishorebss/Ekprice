import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class BasicHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    
      }
    
     // this.props.navigation.navigate("Categories");
    render() {
        const { navigation } = this.props;
        const { title } = this.props
       // console.log(this.props);
        return (
            <View style={{ flex:.1,flexDirection: "row",  borderBottomColor: "#ddd", borderBottomWidth: 1, backgroundColor: '#fff',justifyContent:'center' }}>

            <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start',paddingLeft:10 }} onPress={() => {this.props.navigation.goBack()}}>
             
             <Icon name="chevron-left" size={30} color="#525252"  />
            
            </TouchableOpacity>
            <View style={{ width: '60%', alignItems: 'center',justifyContent:'center',padding:10 }}>
                <Text numberOfLines={1} style={{
                    color: '#212121',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginHorizontal: 15,
                    fontFamily: 'Poppins-Medium'
                }}>{title}</Text>
            </View>
            <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} />
               
            
        </View>
        )
    }
}