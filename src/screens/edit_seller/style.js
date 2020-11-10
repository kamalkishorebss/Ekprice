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
    input: {
      height: 50,
      width: '100%',
      borderRadius: 50,
      // borderColor: '#D7D7DB',
      // borderBottomWidth: 1,
      paddingLeft: 5,
      fontSize: normalize(14),
      fontFamily:'Poppins-Light',
      textAlignVertical:'center'
  },
    text: {
      color: '#212121',
      fontSize: normalize(13),
      fontFamily: 'Poppins-Medium',
      fontWeight:'bold'
      
    },
    profileSection: {
      flex: 1,
      width: width,
      paddingVertical: normalize(15)
    },
  
    profileImage: {
      width: width,
      alignItems: 'center',
      borderRadius: 50
    },
    userImage: {
      width: (width / 4) - 10,
      height: (width / 4) - 10,
      borderRadius: 50,
      borderWidth:1,
      borderColor:'#F2F4F6'
    },
    userName: {
      color: '#212121',
      fontSize: normalize(13),
      // marginLeft: normalize(15),
      fontFamily: 'Poppins-SemiBold',
      margin: normalize(10)
    },
    designBox:{
      flex: 1,
      width: width,
      padding: normalize(10)
    },
    selectText:{
      padding:normalize(10),
      //padding:5,
      color:'#777',
      fontSize:normalize(12),
      fontFamily:'Poppins-Regular',
      borderBottomWidth: 1, borderBottomColor: '#D7D7DB'
     
    },
    approveButton : {
      backgroundColor: '#59BD5A',
      width: "100%",
      borderRadius: 2,
  },
  buttonReject: {
      backgroundColor: '#fff',
      width: '100%',
      marginHorizontal: '2%',
      borderRadius: 2,
      borderWidth:1,
      borderColor:'#000'
     // padding:'1%'
  
  
  },
  buttonText: {
    color: "#fff", textAlign: 'center',
    padding: normalize(8),
    fontSize: normalize(13),
    fontFamily:'Poppins-Medium'
  },
  
  ///
  ////modaloo
  modalcontainer: {
    width: "100%",
    padding: normalize(15),
    paddingTop: Platform.OS == 'ios' ? 30 : 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F6"
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    fontFamily: 'montserrat'
  },
  backIcon: {
    width: 17,
    height: 17
  },
  icons: {
    width: 25,
    height: 25
  },
  ReviewNameText: {
    //width :'90%',
    height:20,
    textAlign:'left',
    textAlignVertical:'center',
    color: '#212121',
    fontSize: normalize(10),
    fontFamily:'Poppins-Meddium',
    //marginHorizontal: normalize(5),
    fontWeight:'bold'
  },
  reviewText: {
    color: '#212121',
    fontSize: normalize(10),
    paddingTop:normalize(5),
    // textTransform: 'uppercase',
    fontFamily:'Poppins-Regular'
  },
  view:{
      fontSize : normalize(8),
      fontSize : normalize(9),
      color:"#427BEC",
      fontFamily:'Poppins-Medium'
  },
  catNameText:{
          color: '#212121',
          fontSize: normalize(14),
          fontFamily:'Poppins-Meddium',
          //marginHorizontal: normalize(5),
          //fontWeight:'bold',
          padding:normalize(3),
         
  },
  catItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding:normalize(10),
    borderColor:'#CED3DB',
    borderWidth:.5,
    flexDirection:'row'
  },
  
  })
  
  
  export default styles