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
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#fff'
    },
    mainContent: {
      flex: 1
    },
    listContainer: {
      width: width
    },
    sectionContainer: {
      width: width,
      backgroundColor: '#fff',
    },
    sectionContent: {
      width: width,
      paddingTop: normalize(15)
    },
    messageWrapper:{
        paddingLeft: 20,
        width:'80%',
        alignItems:'flex-start'
    },
    userImage:{
      width : (width / 6) -10,
      height:(width / 6) -10,
      borderRadius:50 ,
      alignItems:'flex-start', 
    },
    catItem: {
        width: width,
        backgroundColor: '#fff',
        padding:10,
        borderColor:'#f7f7f7',
        borderWidth:.5,
        flexDirection:'row'
      },
    catNameText:{
        color: '#212121',
        fontSize: normalize(14),
        fontFamily:'Poppins-Medium',
        //marginHorizontal: normalize(5),
        //fontWeight:'bold',
        padding:normalize(3),
    },
    userNameText:{
      color: '#212121',
      fontSize: normalize(12),
      fontFamily:'Poppins-Medium',
      textAlign:'left'
    },
    timingText:{
      color: '#767676',
      fontSize: normalize(12),
      fontFamily:'Poppins-Regular',
      padding:normalize(3),
      textAlign:'right',
      color: 'darkgray'
    }
   
    
  })
  
  
  export default styles