import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
  import {
    normalize
  } from '../../helpers'
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    miniDrawItem: {
      width: normalize(290),
      height: normalize(100),
      marginHorizontal: normalize(5),
      backgroundColor: '#fff',
      borderColor:'#CED3DB',
      borderWidth:1,
      flexDirection:'row',
      alignItems:'center'
     
    },
    descWrapper: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      padding:5
      //justifyContent: 'flex-start'
    },
    ReviewNameText: {

      color: '#212121',
      fontSize: normalize(10),
      fontFamily:'Poppins-Meddium',
      //marginHorizontal: normalize(5),
      fontWeight:'bold'
    },
   reviewText: {
      color: '#212121',
      fontSize: normalize(12),
      paddingTop:normalize(5),
      // textTransform: 'uppercase',
      fontFamily:'Poppins-Medium'
    },
    priceText: {
      width:'50%',
      color: '#212121',
      fontSize: normalize(10),
      //textTransform: 'uppercase',
      fontFamily:'Poppins-Bold',
      //textAlign:'left'
    },
    
    imageWrapper: {
      padding:normalize(5),
      width: normalize(100),
      height: normalize(100),
      
      
     
    },
    serviceImage: {
      width: '100%',
      height: '100%',
      
      resizeMode:'cover'
      
    },
  })
  
  
  export default styles