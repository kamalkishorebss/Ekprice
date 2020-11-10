import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
  import {
    normalize
  } from '../../helpers'
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    addedServices: {
      width: normalize(180),
      height: normalize(270),
      marginHorizontal: normalize(5),
      backgroundColor: '#fff',
      borderColor:'#CED3DB',
      borderWidth:1
    },
    descWrapper: {
      width: normalize(180),
      flex: 1,
      //alignItems: 'center',
      minHeight:normalize(50),
      padding:normalize(10)
      //justifyContent: 'flex-start'
    },
   
   reviewText: {
      color: '#212121',
      fontSize: normalize(12),
      // textTransform: 'uppercase',
      fontFamily:'Poppins-Medium'
    },
    priceText: {
      color: '#212121',
      fontSize: normalize(10),
      textTransform: 'uppercase',
      fontFamily:'Poppins-SemiBold',
      paddingTop:normalize(5),
      textAlign:'left'
    },
    
    imageWrapper: {
      width: '100%',
      height: normalize(120),
      alignSelf:'center'
     
    },
    serviceImage: {
      width: '100%',
      height: '100%',
      alignSelf:'center'
      
      
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
    
    sellerBtnBox: {
      flex: 1,
      alignItems: 'center',
      padding : normalize(10)
      //justifyContent: 'flex-end'.
    },
    sellerBtn: {
      alignItems:'center',
      width:normalize(150),
      borderRadius:3,
      padding: normalize(5),
      backgroundColor: '#427BEC'
    },
    sellerBtnText: {
      color: '#ffffff',
      fontSize: normalize(11),
      textAlign:'center',
      padding : normalize(3),
     // textTransform: 'uppercase',
      fontFamily:'Poppins-Bold'
    }
    , carouselTagWrapper: {
      marginTop: normalize(10),
      backgroundColor: '#ff002f',
      borderTopRightRadius: normalize(15),
      borderBottomRightRadius: normalize(15),
      padding: normalize(5)
    },
    carouselTagText: {
      color: '#ffffff',
      fontSize: normalize(12),
      marginHorizontal: normalize(5),
      fontFamily:'montserrat'
    },
  })
  
  
  export default styles