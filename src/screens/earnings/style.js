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
        marginLeft: 'auto',
        marginRight: 'auto',
        width: width,
        backgroundColor: '#fff',
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10),
        // marginBottom:normalize(10)

    },
    innerContainer: {
        marginVertical: normalize(15),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#CED3DB",
        padding: normalize(10)
    },
    price: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(32)
    },
    subtext: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(12)
    },
    stats: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'flex-start'
    },
    statsLabel: {
        color: '#767676',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(9),
        paddingLeft: normalize(10),
    },
    statsValue: {
        paddingLeft: normalize(10),
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(18),
        fontWeight: 'bold'
    },
    bank: {
        textAlignVertical: 'center',
        color: '#212121',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(12),
        paddingLeft: normalize(10),
    },
    trans: {
        textAlignVertical: 'center',
        color: '#212121',
        textAlign:'left',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(12)
    },
    time: {
        textAlignVertical: 'center',
        textAlign:'left',
        color: '#525252',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(10)
    },
    priceTotal: {
        textAlignVertical: 'center',
        color: '#59BD5A',
        textAlign:'right',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(12)
    },
    status: {
        textAlignVertical: 'center',
        color: '#767676',
        textAlign:'right',
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(10)
    },
    orderActions:{
        borderTopColor: '#CED3DB',
        borderTopWidth: .5,
        flexDirection: 'row',
        paddingTop:10,
        alignItems:'center'
    },
    buttonReject: {
        backgroundColor: '#fff',
        width: '46%',
        marginHorizontal: '2%',
        borderRadius: 2,
        borderWidth:1,
        borderColor:'#000'
       // padding:'1%'


    },
    buttonAccept:{
        backgroundColor: '#59BD5A',
        width: '46%',
        marginHorizontal: '2%',
        borderRadius: 2,
    },
   
    buttonText: {
        color: "#fff", textAlign: 'center',
        padding: normalize(7),
        fontSize: normalize(10),
        fontWeight:'bold',
        fontFamily:'Poppins-Bold'
    },

})


export default styles