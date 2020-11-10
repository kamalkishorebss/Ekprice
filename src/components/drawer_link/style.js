
import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
//   import {
//     normalize
//   } from '../../helpers'
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    container: {
      width: width * 2 / 3,
      paddingHorizontal:16,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    active: {
      backgroundColor: '#2bcfc6'
    },
    image: {
      width: 30,
      height: 30,
      resizeMode:'center'
    },
    text: {
      color: '#000',
      fontSize:14,
      marginLeft: 10,
      fontFamily:'montserrat',
      fontWeight:'bold'
    }
  })
  
  
  export default styles