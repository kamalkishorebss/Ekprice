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
        fontFamily:'Poppins-Meddium',
        //marginHorizontal: normalize(5),
        fontWeight:'bold',
        padding:normalize(3),
    },
    typeCarText:{
        width:'100%',
        color: '#767676',
        fontSize: normalize(12),
        fontFamily:'Poppins-Regular',
        padding:normalize(3),
        //fontWeight:'bold'
    },
    catImage:{
        width :'20%',
        alignSelf:'center',
        padding:normalize(10)
    },
    cat_content:{
      width :'80%',
      alignSelf:'center',
    }
    
  })
  
  
  export default styles