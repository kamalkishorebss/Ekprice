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
    profileSection:{
        flex: 1,
        width: width, 
        paddingVertical:normalize(15),
        
    },
    
    profileImage:{
       width:width,
       alignItems:'center',
       borderRadius:50,
       paddingHorizontal:normalize(15) ,
       borderBottomColor : "#F2F4F6",
        borderBottomWidth : 1
    },
    userImage:{
        width : (width / 6) -10,
        height:(width / 6) -10,
        borderRadius:50  
    },
    userName:{
      color: '#212121',
      fontSize: normalize(12),
     // marginLeft: normalize(15),
      fontFamily: 'Poppins-SemiBold',
      margin:10
    },
    userSkill :{
        color: '#212121',
        fontSize: normalize(12),
        fontFamily:'Poppins-Regular',
        textAlign:'center',
        paddingHorizontal:normalize(15),
        marginBottom:normalize(10)
    },
    skillText:{
        color :'gray',
        fontSize: normalize(12),
        fontFamily:'Poppins-Regular',
        textAlign:'center',
        marginBottom:10
    },
    starSection:{
        alignItems:'center',
       // flex: 1,
        width: width, 
        padding:normalize(15)
    },
    starSectionHeader:{
        color: '#212121',
        fontSize: normalize(12),
     // marginLeft: normalize(15),
        fontFamily: 'Poppins-Medium',
    },
    starImage:{
        width : width,
        height:(width / 6) -10,
        borderRadius:50  
    },
    input: {
        width: '90%',
        borderRadius: 5,
        borderColor: '#D7D7DB',
        borderWidth: 1,
        fontSize: 14,
        fontFamily:'Poppins-Light',
        height: 100,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        paddingLeft:10
    },
    button: {
        marginRight:'auto',
        marginLeft:'auto',
        backgroundColor: '#59BD5A',
        width: "94%",
        margin: normalize(15),
        borderRadius: 2,
       // padding:10


    },
    
    buttonText: {
        color: "#fff", textAlign: 'center', padding: 12, fontSize: 16,fontWeight:'bold', fontFamily:'Poppins-Bold'
    },
    
  })
  
  
  export default styles