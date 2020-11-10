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
        paddingVertical: normalize(15),
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
        fontFamily: 'Poppins-Regular',
        paddingVertical: normalize(5)
        //marginHorizontal: normalize(5),
        
    },
    
    orderDetail:{
        flex:5,
        flexDirection: 'row',
    },
    orderImage: {
        flex:1,
        alignSelf: 'center',
        padding: normalize(10)
    },
    orderDes:{
        flex:3,
        alignItems:'flex-start',
        padding: normalize(10)
    },
    orderPrice: {
        flex:1,
        alignItems:'flex-end',
        padding: normalize(10)
    },
    orderStatus:{
        flex:4,
        flexDirection: 'row',
    },
   
    orderStatusDueDate:{
        flex:2,
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
        fontFamily: 'Poppins-meddium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(8),
        color:'#767676',
        fontWeight:'bold'
    },
    orderStatusTextvalue:{
        
        
        fontFamily: 'Poppins-meddium',
        paddingVertical: normalize(2),
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:normalize(10),
        color:'#373737',
        fontWeight:'bold'
    },

    orderActions:{
        borderTopColor: '#CED3DB',
        borderTopWidth: .5,
        flexDirection: 'row',
        
    }

})


export default styles