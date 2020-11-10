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
    imageWrapper:{
        width:'20%',
        justifyContent:'flex-start',
        alignItems:'flex-start' 
    },
    messageWrapper:{
        width:'80%',
        alignItems:'flex-start'
    },
    userImage:{
      width : (width / 7) -10,
      height:(width / 7) -10,
      borderRadius:50 ,
      alignItems:'flex-start',
      paddingLeft:normalize(5) 
    },
    catItem: {
        width: width,
        backgroundColor: '#fff',
        padding:15,
        borderColor:'#CED3DB',
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
      flex:.5,
      color: '#212121',
      fontSize: normalize(12),
      fontFamily:'Poppins-Medium',
      //marginHorizontal: normalize(5),
      //fontWeight:'bold',
      padding:normalize(3),
      textAlign:'left'
    },
    timingText:{
      flex:.5,
      color: '#767676',
      fontSize: normalize(10),
      fontFamily:'Poppins-Regular',
      padding:normalize(3),
      textAlign:'right'
    }
   
    
  })
  
  
  export default styles