import {
    StyleSheet,
    Dimensions
} from 'react-native'

import {
    normalize
} from '../../helpers'
import { gray } from 'color-name';

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
    headerText: {
        color: '#212121',
        fontSize: normalize(18),
        fontWeight: 'bold',
        marginLeft: normalize(15),
        fontFamily: 'Poppins-SemiBold'
    },
    listContainer: {
        width: width
    },
    imageContainer: {
        borderColor : '#f0f0f0',
        borderWidth :1,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        margin: normalize(12),
        width: '95%',
        height: (width - normalize(30)) * 9 / 15,
        
    },
    backImage: {
        //flex:1,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        //resizeMode: 'contain',
        //borderRadius : 10
    },
    sectionContainer: {
        width: width,
        backgroundColor: '#fff',
    },
    bannerContent: {
        backgroundColor: '#fff',
        paddingTop: normalize(2)
    },
    skills:{
        width:normalize(100),
        textAlign:'center',
        borderRadius:50,
        padding:normalize(3),
        borderColor:"#000",
        borderWidth:1,
        fontSize:normalize(9)
    },
    descText: {
        marginHorizontal: normalize(15),
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: normalize(3),
        textAlign: 'left'
    },
    sectionContent: {
        width: width,
        paddingTop: normalize(15)
    },
    sub_section: {

        //marginHorizontal: normalize(5),
        width: width,
        flexDirection: 'row'
    },
    subLeft: {
        width: '50%',
        color: '#212121',
        fontSize: normalize(14),
        fontFamily: 'Poppins-Medium',
        padding: normalize(15),
        textAlign: 'left'
    },
    subRight: {
        width: '50%',
        color: '#212121',
        fontSize: normalize(11),
        fontFamily: 'Poppins-Medium',
        padding: normalize(15),
        textAlign: 'right'
    },
    miniDrawItem: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: width - normalize(30),
        height: normalize(100),
        marginHorizontal: normalize(5),
        backgroundColor: '#fff',
        borderColor: '#CED3DB',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(15)

    },
    descWrapper: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        padding: 5
        //justifyContent: 'flex-start'
    },
    ReviewNameText: {
        textAlignVertical:'center',
        //width :'90%',
        height: 20,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-SemiBold',
        //marginHorizontal: normalize(5),
        fontWeight: 'bold'
    },
    reviewText: {
        color: '#212121',
        fontSize: normalize(11),
        paddingTop: normalize(5),
        // textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular'
    },
    priceText: {
        width: '100%',
        color: '#212121',
        fontSize: normalize(9),
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Medium',
        //textAlign:'left'
    },

    imageWrapper: {
        // padding:normalize(5),
        width: normalize(100),
        height: normalize(100),
    },
    serviceImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'

    },
    tabs: {
        width: '33.3333%',
        borderColor: '#fff',
        borderLeftWidth: 1,
        
    },
    includedService:{
        width : '95%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    includedText:{
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-Regular',
        padding:normalize(5)
    },
    contentText: { margin: normalize(13), fontFamily: 'Poppins-SemiBold', textAlign: 'center' },
    button: {
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#59BD5A',
        width: "94%",
        margin: normalize(15),
        borderRadius: 2,
        // padding:10


    },

    buttonText: {
        color: "#fff", textAlign: 'center', padding: 12, fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold'
    },
    ReviewsContainer: {
        width: width,
        backgroundColor: '#fff',
    },
    commBox: {
        width: '40%',
        padding: normalize(10),
        alignItems: 'flex-start'
    },
    barBox: {
        justifyContent: 'center',
        width: '40%',
        paddingVertical: normalize(10),
        alignItems: 'flex-end'
    },
    pointBox: {
        width: '20%',
        padding: normalize(10),
        alignItems: 'flex-end'
    },
    boxText: {
        color: "#000",
        textAlign: 'center',
        fontSize: normalize(12),
        fontFamily: 'Poppins-Regular'

    },
    buttonViewAll: {
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#fff',
        width: "94%",
        margin: normalize(15),
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#000'
    },
    buttonViewText: {
        color: "#000", textAlign: 'center', padding: 12, fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Bold'
    },
    ////
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
    ////slider
    infoText: {
        color: '#212121',
        fontSize: normalize(14),
        fontWeight: 'bold',
        // marginHorizontal: 15,
        fontFamily: 'Poppins-Meduim',
        paddingVertical:normalize(5)
    },
    infoLabelText: {
        color: '#767676',
        fontSize: normalize(10),
        fontFamily: 'Poppins-Medium',
        paddingVertical:normalize(5)
    },
    aboutLabel: {
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-SemiBold',
        fontWeight:'bold',
        paddingVertical:normalize(5)
    },

    aboutText: {
        color: '#212121',
        fontSize: normalize(10),
        fontFamily: 'Poppins-Medium',
        paddingVertical:normalize(5)
    },
    infoBox:{
        width:'50%',
        paddingVertical:normalize(10) 
    },
    langaugeBox:{
        width:'33.3333%'
    },
    ReviewNameText: {
        //width :'90%',
        height:20,
        textAlign:'left',
        textAlignVertical:'center',
        color: '#212121',
        fontSize: normalize(10),
        fontFamily:'Poppins-Medium',
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
          fontSize : normalize(10),
          color:"#427BEC",
          fontFamily:'Poppins-Medium'
      },

      previewListContainer: {
        width: width,
        marginVertical: normalize(15)
      },
      previewImageItem: {
        width: (width / 5) - normalize(10),
        height: (width / 5) - normalize(10),
        marginHorizontal: normalize(5),
        borderColor: 'gray',
        borderWidth:1,
        backgroundColor: '#fff'
      },
      previewImage: {
        width: '100%',
        height: '100%'
      },

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