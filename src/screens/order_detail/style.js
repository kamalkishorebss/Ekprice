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
        backgroundColor: '#fff',
    },

    mainContent: {
        flex: 1,
        

    },
    listContainer: {
        width: width,
       
    },
    sectionContainer: {
        alignItems:'center',
        width: width,
        paddingVertical: normalize(9),
        backgroundColor: '#fff',
        marginBottom: normalize(10),
        borderWidth:1
    },
    sectionContent: {
        alignSelf: 'center',
        width: width,
        padding: normalize(10),
        //marginVertical: normalize(10)
    },
    
    orderHeader: {
        borderBottomColor: '#CED3DB',
        borderBottomWidth: .5,
        flexDirection: 'row',
        paddingBottom:normalize(5)
        

    },
    orderIDText: {
        flex : .5,
        color: '#373737',
        fontSize: normalize(13),
        fontFamily: 'Poppins-SemiBold',
       
        //marginHorizontal: normalize(5),
        
    },
    
    orderDetail:{
        //borderWidth:1,
        paddingVertical:normalize(10),
        width:'100%',
        flexDirection: 'row',
    },
    orderImage: {
        width:'18%',
        alignItems:'flex-start',
        //padding: normalize(10)
    },
    orderDes:{
        width:'62%',
        alignItems:'flex-start',
        //padding: normalize(10)
    },
    orderPrice: {
        width:'20%',
        alignItems:'flex-end',
        //padding: normalize(10)
    },
    orderStatus:{
        width:'100%',
        flexDirection: 'row',
        paddingBottom:normalize(10),
        borderBottomColor: '#CED3DB',
        borderBottomWidth: .5,
    },
   
    orderStatusDueDate:{
        flex:.5,
        alignSelf:'center' 
    },
    
    orderStatusBoxStatus:{
        flex:.5,
       alignItems:'flex-end' 
    },
    orderStatusTextLabel:{
        fontFamily: 'Poppins-medium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(8),
        color:'#767676',
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    orderStatusTextvalue:{
        
        
        fontFamily: 'Poppins-Medium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(12),
        color:'#373737',
        fontWeight:'bold',
        textTransform:'capitalize'
    },

    orderActions:{
        borderTopColor: '#CED3DB',
        borderTopWidth: .5,
        flexDirection: 'row',
        paddingTop:10
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
    Buyer:{
        width:'100%',
        paddingVertical:normalize(10)
     
    },
    Buyerlabel:{
        color: '#212121',
        fontSize: normalize(12),
        fontFamily: 'Poppins-Bold',
       // padding:normalize(5)
     
    },
    buyerBox:{
        width:'100%',
        flexDirection: 'row',
        paddingVertical:normalize(8),
        borderBottomColor: '#CED3DB',
        borderBottomWidth: .5,
    },
    includedService:{
        width : '95%',
        marginLeft:'auto',
        marginRight:'auto',
        borderBottomWidth:1,
        borderBottomColor: '#CED3DB',
        paddingBottom:normalize(10)
    },
    includedText:{
        color: '#212121',
        fontSize: normalize(9),
        fontFamily: 'Poppins-Medium',
        padding:normalize(5)
    },
    contentText: { 
        margin: normalize(12), 
        fontFamily: 'Poppins-Medium',
        textAlign: 'center' 
    },
    
    buttonLeft: {
       
        backgroundColor: '#fff',
        width: "100%",
        margin: normalize(15),
        borderRadius: 2,
        borderWidth:1
       // padding:10


    },
    buttonRight: {
       
        backgroundColor: '#59BD5A',
        width: "100%",
        margin: normalize(15),
        borderRadius: 2,
       // padding:10


    },
    view:{
       
        fontSize : normalize(10),
        color:"#427BEC",
        fontFamily:'Poppins-Medium'
    },
    orderSummary:{
        flex:1,
        padding: normalize(10),
       
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
        fontFamily:'Poppins-Medium'
    },
    rightText:{
        flex:.5,
        color: "#212121",
        textAlign: 'right',
        paddingVertical: normalize(5),
        fontSize: normalize(15),
        fontFamily:'Poppins-Medium'
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

})


export default styles