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
        backgroundColor: '#fff'
      },
      mainContent: {
        flex: 1
      },
      listContainer: {
        width: width,
        
      },
     
      sectionContainer: {
        width: width-normalize(20),
        //paddingVertical: normalize(5),
        backgroundColor: '#fff',
        margin: normalize(10),
        marginLeft:'auto',
        marginRight:'auto'
      },
      sectionContent: {
        width: width,
        paddingTop: normalize(10)
      },
    addedServices: {
      width: '46%',
      //height: normalize(250),
      //marginHorizontal: normalize(5),
      backgroundColor: '#fff',
      borderColor:'#CED3DB',
      borderWidth:1,
      margin : '2%'
    },
    descWrapper: {
      width: '95%',
      marginRight:'auto',
      marginLeft:'auto',
      borderBottomColor:"#F2F4F6",
      borderBottomWidth:1,
      alignItems: 'flex-start',
      paddingLeft:normalize(5),
     
    },
   
   reviewText: {
      width:'100%',
      color: '#212121',
      fontSize: normalize(10),
      textAlign:'left',      // textTransform: 'uppercase',
      fontFamily:'Poppins-Medium'
    },
    priceText: {
      color: '#212121',
      fontSize: normalize(8),
      textTransform: 'uppercase',
      fontFamily:'Poppins-Medium',
      paddingVertical:normalize(10),
      textAlign:'left'
    },
    
    imageWrapper: {
      width: '100%',
      height: normalize(120),
     
    },
    serviceImage: {
      width: '100%',
      height: '100%',
      alignSelf:'center'
      
    },
    profileBox:{
        flex:1,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        width: width,
        flexDirection:'row',
        padding: normalize(5),
    },
    proImage:{
       
      width :30,
      height:30
    },
    ReviewNameText:{
        width:'50%'
    },
    sellerBtnBox: {
      flex: 1,
      alignItems: 'center',
      
      //justifyContent: 'flex-end'.
    },
    sellerBtn: {
      width:170,
      borderRadius:3,
      padding: normalize(5),
      backgroundColor: '#427BEC'
    },
    sellerBtnText: {
      color: '#ffffff',
      fontSize: normalize(10),
      textAlign:'center',
     // textTransform: 'uppercase',
      fontFamily:'Poppins-Medium'
    },
    orderActions:{
        
        flexDirection: 'row',
        justifyContent:'center'
       
    },
    
    button:{
       
        width: "33.3333%",
        alignSelf:'center',
        alignItems:'center'
    },
    buttonText: {
        color: "#000", textAlign: 'center', padding: normalize(5), fontSize: normalize(10),fontWeight:'bold', fontFamily:'Poppins-Bold'
    },
    contactSeller:{
         width: '90%',
         flexDirection: 'row',
         justifyContent: 'center',
         marginLeft:'auto',
         marginRight:'auto',
         paddingVertical:normalize(10)
    },
    heartIcon:{
      width:35,
      height:35,
      borderColor:'#000',
      borderWidth:1,
      borderRadius:50,
      backgroundColor:'#fff',
      justifyContent:'center'
      //
    },
  })
  
  
  export default styles