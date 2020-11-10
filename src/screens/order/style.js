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
    orderDetail:{
        flex:1,
        flexDirection: 'row',
        padding: normalize(10),
        borderBottomWidth:1,
        borderBottomColor:'#F2F4F6'
    },
    orderImage: {
        flex:.3,
        alignSelf: 'center',
        padding: normalize(5),
        borderWidth:1,
        borderColor:'#F2F4F6'
       
    },
    orderDes:{
        flex:.7,
        alignItems:'flex-start',
        padding: normalize(5)
    },
    orderPrice: {
        alignItems:'flex-end',
        paddingVertical: normalize(5)
    },
    orderStatusTextLabel:{
        color: "#767676", textAlign: 'left',
        paddingTop: normalize(5),
        fontSize: normalize(12),
        fontFamily:'Poppins-Medium'
    },
    orderStatusTextvalue:{
        color: "#212121", textAlign: 'left',
        //paddingTop: normalize(10),
        fontSize: normalize(12),
        fontFamily:'Poppins-Medium'
    },
    orderSummary:{
        flex:1,
        padding: normalize(10),
        borderBottomWidth:1,
        borderBottomColor:'#F2F4F6'
    },
    orderSummaryBox:{
        flex:1,
        flexDirection:'row',
        
    },
    leftText:{
        flex:.5,
        color: "#212121",
        textAlign: 'left',
        paddingVertical: normalize(5),
        fontSize: normalize(12),
        fontFamily:'Poppins-Regular'
    },
    rightText:{
        flex:.5,
        color: "#212121",
        textAlign: 'right',
        paddingVertical: normalize(5),
        fontSize: normalize(15),
        fontFamily:'Poppins-Regular'
    },
    PaymentSection:{
        flex:1,
        width:width,
       
    },
    PaymentBox:{
      width:width,
      justifyContent:'center',
      alignItems:'center'
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
        color: "#fff", textAlign: 'center', padding: normalize(10), fontSize: normalize(14), fontFamily:'Poppins-Medium'
    },
    ///
    includedService:{
        width : '95%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    includedText:{
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-Medium',
        padding:normalize(5)
    },
    contentText: { margin: normalize(12), fontFamily: 'Poppins-Medium', textAlign: 'center' },
    
    
  })
  
  
  export default styles