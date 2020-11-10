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
  accountHeader: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    backgroundColor: '#F2F4F6'

  },
  accountHeaderTab: {
    flex: 1,
    width: width / 2,
    alignSelf: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,

  },


  accountHeaderText: {
    color: '#212121',
    fontSize: normalize(14),
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: normalize(10)

  },
  activeHeaderText: {
    color: '#DB0A23',
    fontSize: normalize(14),
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: normalize(10)

  },

  normalText: {
    color: '#ffffff',
    fontSize: normalize(14),
    fontFamily: 'Poppins-Medium'
  },
  headerText: {
    color: '#212121',
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginLeft: normalize(15),
    fontFamily: 'Poppins-SemiBold'
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
  addImage: {
    width: (width / 12) - 10,
    height: (width / 12) - 10,
    borderRadius: 50,
    marginLeft: normalize(50),
    marginTop: -15
  },
  userName: {
    color: '#212121',
    fontSize: normalize(14),
    // marginLeft: normalize(15),
    fontFamily: 'Poppins-SemiBold',
    margin: 10
  },
  profileContent: {
    color: '#212121',
    fontSize: normalize(12),
    //marginLeft: normalize(15),
    fontFamily: 'Poppins-Regular',
    margin: 10
  },


  mainContent: {
    flex: 1
  },
  listContainer: {
    width: width
  },


  sectionContainer: {
    width: width,
    //paddingVertical: normalize(15),
    backgroundColor: '#fff',
    marginBottom: normalize(10),
  },
  sectionContent: {
    width: width,
    paddingTop: normalize(10)
  },
  otherInfo: {
    width: width,
    paddingVertical: normalize(15),
    backgroundColor: '#fff',
    marginTop: normalize(10),
  },
  otherHeader: {
    paddingLeft: normalize(16),
    marginVertical: normalize(10)
  },
  serviceLevel: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#F2F4F6",
    padding: 10
  },
  serviceSupport: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#F2F4F6",
    padding: 10
  },
  serviceText: {
    color: '#212121',
    fontSize: normalize(12),
    //marginLeft: normalize(15),
    fontFamily: 'Poppins-SemiBold',
    margin: 8,
    paddingLeft: 5

  },
  inputStyle: {
    //flexDirection:'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20

  },
  input: {
    height: 40,
    width: ' 100%',
    margin: 10,
    borderRadius: 50,
    borderColor: '#D7D7DB',
    borderBottomWidth: 1,
    paddingLeft: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Light'
  },
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

  ///
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
    paddingVertical: normalize(5)
  },
  infoLabel: {
    color: '#767676',
    fontSize: normalize(8),
    fontFamily: 'Poppins-Regular',
    paddingVertical: normalize(5)
  },
  aboutLabel: {
    color: '#212121',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    paddingVertical: normalize(5)
  },

  aboutText: {
    color: '#212121',
    fontSize: normalize(10),
    fontFamily: 'Poppins-Regular',
    paddingVertical: normalize(5)
  },
  infoBox: {
    width: '50%',
    paddingVertical: normalize(10)
  },
  langaugeBox: {
    width: '33.3333%'
  },
  ReviewNameText: {
    //width :'90%',
    height: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#212121',
    fontSize: normalize(10),
    fontFamily: 'Poppins-Meddium',
    //marginHorizontal: normalize(5),
    fontWeight: 'bold'
  },
  reviewText: {
    color: '#212121',
    fontSize: normalize(10),
    paddingTop: normalize(5),
    // textTransform: 'uppercase',
    fontFamily: 'Poppins-Regular'
  },


})


export default styles