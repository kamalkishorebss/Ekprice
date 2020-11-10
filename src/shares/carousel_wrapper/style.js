import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
  import {
    normalize
  } from '../../helpers'
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    carouselContainer: {
      width: 350,
      borderRadius:10,
      padding: normalize(5)
      
     
    },
    carouselItem: {
     // height: (width - normalize(90)) * 9 / 12,
     height:200,
      borderColor:'#CED3DB',
      borderWidth:1,
      borderRadius:6,
      marginHorizontal:normalize(3),
      justifyContent:'flex-start',
      padding: normalize(12) 
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor:'#fff',
      borderRadius:6
    },
    carouselTagWrapper: {
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
    carouselNameWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    carouselNameSection: {
      padding: normalize(5),
      fontFamily:'montserrat',
      backgroundColor: 'rgba(35,35,35, 0.7)'
    },
    carouselNameText: {
      color: '#ffffff',
      fontSize: normalize(14),
      textTransform: 'uppercase',
      fontFamily:'montserrat'
    }
  })
  
  
  export default styles