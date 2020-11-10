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
      width: normalize(250),
      height: normalize(120),
      marginHorizontal: normalize(5),
      backgroundColor: '#fff'
    },
    miniDrawImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    miniDrawTagWrapper: {
      marginTop: normalize(10),
      backgroundColor: '#ff002f',
      borderTopRightRadius: normalize(15),
      borderBottomRightRadius: normalize(15),
      padding: normalize(5)
    },
    miniDrawTagText: {
      color: '#ffffff',
      fontSize: normalize(12),
      marginHorizontal: normalize(5)
    },
    miniDrawNameWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    miniDrawNameSection: {
      padding: normalize(5),
      backgroundColor: 'rgba(35,35,35, 0.7)'
    },
    miniDrawNameText: {
      color: '#ffffff',
      fontSize: normalize(12),
      textTransform: 'uppercase',
      fontFamily:'montserrat'
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