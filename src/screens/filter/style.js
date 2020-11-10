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
    imageContainer: {
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:'center',
        margin: normalize(12),
        width: width - normalize(20),
        height: (width - normalize(30)) * 9/ 18,
        borderRadius : 10
    },
    backImage: {
        width: '100%',
        height: '100%',
        resizeMode:'cover',
        borderRadius : 10
    },
    sectionContainer: {
        width: width,
        backgroundColor: '#fff',
        borderColor:'#F2F4F6',
        borderWidth:1,
        flexDirection:'row',
       

    },
   
    descText:{
        marginHorizontal:normalize(15),
        color: '#212121',
        fontSize: normalize(10),
        fontFamily: 'Poppins-Regular',
        padding: normalize(3),
        textAlign:'left'
    },
    sectionContent: {
        width: width - normalize(30),
        padding: normalize(15)
    },
  
    
      
      filterText: {
        flex:.5,  
        color: '#212121',
        fontSize: normalize(14),
        paddingVertical:normalize(15),
        paddingLeft:normalize(10),
        textTransform: 'uppercase',
        fontFamily:'Poppins-Regular',
        textAlign:'left',
        textAlignVertical:'center'
      },
      filterText1: {
        flex:.5,
        color: '#212121',
        fontSize: normalize(10),
        paddingVertical:normalize(15),
        paddingRight:normalize(10),
        // textTransform: 'uppercase',
        fontFamily:'Poppins-Regular',
        textAlign:'right',
        textAlignVertical:'center'
      },
      
      button: {
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#DB0A23',
        width: 180,
        margin: normalize(10),
        borderRadius: 25,
        // padding:10


    },

    buttonText: {
        color: "#fff", 
        textAlign: 'center', padding: normalize(5),
        fontSize: normalize(14), 
        fontFamily: 'Poppins-Medium',
        textTransform:'capitalize'
    },
    serIncludes:{
        width:normalize(80),
        textAlign:'center',
        borderRadius:50,
        padding:normalize(3),
        borderColor:"red",
        borderWidth:1,
        color:'red',
        fontSize:normalize(9)
    },

})


export default styles