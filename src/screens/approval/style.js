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
    
    sectionContainer: {
      flex:.9, 
      width: width,
      //justifyContent:'center',
      alignSelf:'center',
      padding:normalize(5),
      backgroundColor: '#fff',
    },
    contentTxt:{
        color: '#767676',
        fontSize: normalize(12),
        paddingVertical:normalize(6),
        fontFamily: 'Poppins-Medium',
    },
    buttonText:{
        color: '#fff',
        textAlign:'center',
        fontSize: normalize(12),
        paddingVertical:normalize(6),
        fontFamily: 'Poppins-SemiBold',
    }


})


export default styles