import React, { Component } from 'react';
import { View, Text,Dimensions, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logoImage:{ 
        width: width,
        height:(width / 2) -9
    },
    headerText:{
        color: '#3F4952',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
        fontFamily:'Poppins-Middium',
        padding:16
    },
    inputStyle:{
       flexDirection:'row',
       justifyContent:'center',
       width:'100%',
       paddingTop:20,
       
    },
    input: {
        height: 40,
        width: '70%',
        margin: 10,
        borderRadius: 50,
        borderColor: '#D7D7DB',
        borderBottomWidth: 1,
        paddingLeft: 20,
        fontSize: 14,
        fontFamily:'Poppins-Light'
    },
    button: {
        backgroundColor: '#DB0A23',
        width: 265,
        margin: 15,
        borderRadius: 2,
       // padding:10


    },
    
    buttonText: {
        color: "#fff", textAlign: 'center', padding: 12, fontSize: 16,fontWeight:'bold', fontFamily:'Poppins-Bold'
    },
    socialView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },
    socialIcon:{
        width: (width / 8) - 10,
        height: (width / 8) - 10,
        marginHorizontal: 5,
        borderColor: '#fff',
        backgroundColor: '#fff'
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },

});
export default styles