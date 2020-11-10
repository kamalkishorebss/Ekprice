import {
    StyleSheet,
    Dimensions
} from 'react-native'

import {
    normalize
} from '../../helpers'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'flex-start',
        //backgroundColor: '#fff'
    },
    mainContent: {
        flex: 1
    },

    listContainer: {
        width: width
    },
    sectionContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: width ,
        backgroundColor: '#fff',
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10),
       // marginBottom:normalize(10)

    },
    innerContainer: {
        marginVertical:normalize(15),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#CED3DB",
        padding: normalize(10)
    },
    progressLabel:{
        color: '#212121',
        fontSize: normalize(13),
        fontFamily: 'Poppins-Medium',
        textTransform:'uppercase'
    },
    serviceLabel: {
        color: '#212121',
        fontSize: normalize(15),
        fontFamily: 'Poppins-SemiBold',
    },
    serviceLightText:{
        color: '#767676',
        fontSize: normalize(10),
        fontFamily: 'Poppins-Regular',
        //textAlign:'right'
    },
    serviceValidateText:{
        color: '#767676',
        fontSize: normalize(10),
        fontFamily: 'Poppins-Regular',
        textAlign:'right'
    },
    uploadImage:{
        color: '#212121',
        fontSize: normalize(14),
        fontFamily: 'Poppins-Medium',
        textAlign:'center',
        paddingVertical:normalize(15)
    },
    inputLabel:{
        paddingTop:normalize(5),
        color: '#212121',
        fontSize: normalize(13),
        fontFamily: 'Poppins-SemiBold',
    },
    inputText:{
        color: '#767676',
        fontSize: normalize(14),
        fontFamily: 'Poppins-Regular',
        width:'94%'
    },
    
      input: {
        width:'100%',
        //height:40,
        textAlign: "left",
        color: '#767676',
        fontSize: normalize(14),
        fontFamily: 'Poppins-Regular',

      },
      Button : {
        backgroundColor: '#59BD5A',
        width: "100%",
        borderRadius: 2,
     },
    buttonText: {
        color: "#fff", textAlign: 'center',
        padding: normalize(10),
        fontSize: normalize(14),
        fontWeight:'bold',
        fontFamily:'Poppins-SemiBold',
        textTransform:'uppercase'
    },
    tabs: {
        width: '33.3333%',
        borderColor: '#fff',
        borderLeftWidth: 1,
        
    },
    selectText:{
        padding:normalize(10),
        //padding:5,
        color:'#777',
        fontSize:normalize(14),
        fontFamily:'Poppins-Regular',
        borderBottomWidth: 1, borderBottomColor: '#D7D7DB'
       
      },
    contentText: { margin: normalize(8), fontFamily: 'Poppins-Medium', textAlign: 'center',fontSize:normalize(13) },
    skills:{
        width:normalize(70),
        textAlign:'center',
        borderRadius:50,
        padding:normalize(3),
        borderColor:"#000",
        borderWidth:1,
        fontSize:normalize(9)
    },
    serIncludes:{
        width:normalize(120),
        textAlign:'center',
        borderRadius:50,
        padding:normalize(3),
        borderColor:"#000",
        borderWidth:1,
        fontSize:normalize(9)
    },
    ///

     ////modaloo
     modalcontainer: {
        width: '100%',
        paddingVertical: normalize(10),
       // paddingTop: Platform.OS == 'ios' ? 30 : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: "#F2F4F6"
    },
    modalBox: {
        width: width,
        paddingVertical: normalize(10),
       // paddingTop: Platform.OS == 'ios' ? 30 : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: "#F2F4F6"
    },
    headerText: {
        color: '#fff',
        fontSize: normalize(20),
        fontWeight: 'bold',
        marginHorizontal: 15,
        fontFamily: 'Poppins-SemiBold'
    },
    backIcon: {
        width: 17,
        height: 17
    },
    icons: {
        width: 25,
        height: 25
    },
    catItem: {
        width: width,
        backgroundColor: '#fff',
        padding:15,
        borderColor:'#CED3DB',
        borderWidth:.5,
        flexDirection:'row'
      },
    catNameText:{
        color: '#212121',
        fontSize: normalize(12),
        fontFamily:'Poppins-Meddium',
        //marginHorizontal: normalize(5),
        fontWeight:'bold',
        padding:normalize(3),
    },
    typeCarText:{
        color: '#767676',
        fontSize: normalize(13),
        fontFamily:'Poppins-Regular',
        padding:normalize(3),
        //fontWeight:'bold'
    },
    catImage:{
        alignSelf:'center',
        padding:normalize(10)
    },
    clickTxt:{
        padding:normalize(8),
        color: '#222', 
        fontSize: normalize(15),
        fontFamily: 'Poppins-SemiBold'
    }
    

})


export default styles