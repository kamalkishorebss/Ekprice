import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
  import {
    normalize
  } from '../../helpers'
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    ReviewItem: {
      width: normalize(250),
      //height: normalize(120),
      marginHorizontal: normalize(7),
      backgroundColor: '#fff',
      padding:15,
      borderColor:'#CED3DB',
      borderWidth:1
    },
   
    miniDrawTagWrapper: {
      marginBottom: normalize(10),
      backgroundColor: '#fff',
      borderTopRightRadius: normalize(15),
      borderBottomRightRadius: normalize(15),
      //padding: normalize(5)
    },
    ReviewNameText: {
      width:'50%',
      color: '#212121',
      fontSize: normalize(14),
      fontFamily:'Poppins-Medium',
      //marginHorizontal: normalize(5),
      fontWeight:'bold'
    },
    reviewsDateText:{
        color: '#767676',
        fontSize: normalize(12),
        fontFamily:'Poppins-Regular',
        paddingVertical: normalize(5),
       
    },
    descWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
   
   reviewText: {
      color: '#212121',
      fontSize: normalize(12),
      //textTransform: 'uppercase',
      fontFamily:'Poppins-Medium'
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