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
        margin: normalize(5),
        width: width - normalize(20),
        height: (width - normalize(20)) * 9/ 20,
        borderRadius : 5,
        
    },
    backImage: {
        width: '100%',
        height: '100%',
        borderRadius : 5,
    },
    sectionContainer: {
        width: width,
        backgroundColor: '#fff',
    },
    bannerContent:{
        backgroundColor:'#F2F4F6',
        paddingVertical:normalize(2)
    },
    descText:{
        marginHorizontal:normalize(15),
        color: '#212121',
        fontSize: normalize(11),
        fontFamily: 'Poppins-Regular',
        padding: normalize(3),
        textAlign:'left'
    },
    sectionContent: {
        width: width,
        paddingTop: normalize(15)
    },
    sub_section:{
        
        //marginHorizontal: normalize(5),
        width:width,
        flexDirection:'row'
    },
    subLeft:{
        width : '50%',
        color: '#212121',
        fontSize: normalize(11),
        fontFamily: 'Poppins-Medium',
        padding: normalize(15),
        textAlign:'left'
    },
    subRight:{
        width : '50%',
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-Medium',
        padding: normalize(15),
        textAlign:'right'
    },
    miniDrawItem: {
        marginLeft:'auto',
        marginRight:'auto',
        width: width-normalize(20),
        height: normalize(100),
        marginHorizontal: normalize(5),
        backgroundColor: '#fff',
        borderColor:'#CED3DB',
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:normalize(15)
       
      },
      descWrapper: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        padding:5
        //justifyContent: 'flex-start'
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
        fontSize: normalize(11),
        paddingTop:normalize(5),
        // textTransform: 'uppercase',
        fontFamily:'Poppins-Regular'
      },
      priceText: {
        width:'100%',
        color: '#212121',
        fontSize: normalize(8),
        textTransform: 'uppercase',
        fontFamily:'Poppins-Medium',
        //textAlign:'left'
      },
      
      imageWrapper: {
       // padding:normalize(5),
        width: normalize(140),
        //height: normalize(100),
        
        
       
      },
      serviceImage: {
        width: '100%',
        height: '100%',
        
        resizeMode:'cover'
        
      },

      ///
      sellerBtnBox: {
        flex: 1,
        alignItems: 'center',
        padding : normalize(5)
        //justifyContent: 'flex-end'.
      },
      sellerBtn: {
        alignItems:'center',
        width:normalize(60),
        borderRadius:3,
        padding: normalize(2),
        backgroundColor: '#427BEC'
      },
      sellerBtnText: {
        color: '#ffffff',
        fontSize: normalize(8),
        textAlign:'center',
        padding : normalize(2),
       // textTransform: 'uppercase',
        fontFamily:'Poppins-Bold'
      }

})


export default styles