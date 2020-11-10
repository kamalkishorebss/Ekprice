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
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    mainContent: {
        flex: 1
    },
    listContainer: {
        width: width
    },
    sectionContainer: {
        width: width,
       // paddingVertical: normalize(9),
        backgroundColor: '#fff',
        marginBottom: normalize(10),
    },
    sectionContent: {
        alignSelf: 'center',
        width: width - 30,
        padding: normalize(10),
        borderWidth: 1,
        borderColor: "#CED3DB",
        marginVertical: normalize(10)
    },
    orderHeader: {
        borderBottomColor: '#CED3DB',
        borderBottomWidth: .5,
        flexDirection: 'row',
        

    },
    orderIDText: {
        flex : .5,
        color: '#373737',
        fontSize: normalize(12),
        fontFamily: 'Poppins-SemiBold',
        paddingVertical: normalize(5)
        //marginHorizontal: normalize(5),
        
    },
    
    orderDetail:{
        flex:5,
        flexDirection: 'row',
    },
    orderImage: {
        flex:1.2,
        alignSelf: 'center',
        padding: normalize(5)
    },
    orderDes:{
        flex:2.8,
        alignItems:'flex-start',
        padding: normalize(10)
    },
    orderPrice: {
        flex:1,
        alignItems:'flex-end',
        padding: normalize(10)
    },
    orderStatus:{
        flex:3,
        flexDirection: 'row',
    },
   
    orderStatusDueDate:{
        flex:1,
        alignSelf:'center' 
    },
    orderStatusBuyer:{
        flex:1,
        alignSelf:'center' 
    },
    orderStatusBoxStatus:{
        flex:1,
       alignItems:'flex-end' 
    },
    orderStatusTextLabel:{
        fontFamily: 'Poppins-Medium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(9),
        color:'#767676',
        fontWeight:'bold',
        textTransform:'uppercase'
    },
    orderStatusTextvalue:{
        
        
        fontFamily: 'Poppins-Medium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(11),
        color:'#373737',
        fontWeight:'bold',
        textTransform : 'capitalize'
    },

    orderActions:{
        borderTopColor: '#CED3DB',
        borderTopWidth: .5,
        flexDirection: 'row',
        paddingTop:10
    },
    buttonReject: {
        backgroundColor: '#fff',
        width: '30%',
        marginHorizontal: '2%',
        borderRadius: 2,
        borderWidth:1,
        borderColor:'#000'
       // padding:'1%'


    },
    buttonAccept:{
        backgroundColor: '#59BD5A',
        width: '30%',
        marginHorizontal: '2%',
        borderRadius: 2,
    },
    buttonDetail:{
        alignItems:'flex-end',
        width: '30%',
        marginHorizontal: '2%',
        
    },
    buttonText: {
        color: "#fff", textAlign: 'center',
        padding: normalize(7),
        fontSize: normalize(10),
        fontWeight:'bold',
        fontFamily:'Poppins-Bold'
    },
    orderTabs:{
        justifyContent  : 'flex-start',
        alignItems:'center',
        padding : normalize(8),
        width : normalize(80),
        // borderWidth:1,
        // borderColor:'#767676',
        backgroundColor:'#F2F4F6'

    },
    tabsLabel :{
        color: '#212121',
        fontSize: normalize(10),
        fontFamily:'Poppins-Bold',
       
    },
    tabsLabelRed:{
        color: 'red',
        fontSize: normalize(10),
        fontFamily:'Poppins-Bold',
        
    }

})


export default styles