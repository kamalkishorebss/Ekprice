
import {
    StyleSheet,
    Dimensions
  } from 'react-native'
  
  
  const { height, width } = Dimensions.get('window')
  
  const styles = StyleSheet.create({
    buttonBasic: {
      margin: 10,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonBlock: {
      width: width - 80
    },
    buttonWrapper: {
      width: width - 30
    },
  
    defaultBackground: {
      backgroundColor: '#ff002f'
    },
    transparentBackground: {
      backgroundColor: 'rgba(0,0,0, 0)'
    },
    defaultBorder: {
      borderWidth: 2
    },
    defaultBorderColor: {
      borderColor: '#ff002f',
    },
  
  
    buttonTitle: {
      fontSize: 16, 
      color: '#ffffff',
      fontWeight: 'normal',
      textAlign: 'center',
      fontFamily:'montserrat'
    },
  })
  
  
  export default styles