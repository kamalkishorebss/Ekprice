import {
  StyleSheet,
  Dimensions
} from 'react-native';

//fontFamily:'Poppins-Medium',
import {
  normalize
} from '../../helpers'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  row: {
    flexDirection: 'row',
    padding: 10
  },
  avatar: {
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 10
  },
  rowText: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  rowText1: {
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    padding: 5,
    borderRadius: 10,
    marginLeft: '20%',
    marginHorizontal: 10
  },
  message: {
    fontSize: 12,
    marginRight: 60,
    fontFamily: 'Poppins-Regular',
    color: '#444'
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  input: {
    fontSize: 14,
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  },
  sectionContent: {
    width: width,
    paddingTop: normalize(15)
  },
  messageWrapper: {
    paddingLeft: 20,
    width: '80%',
    alignItems: 'flex-start'
  },
  userImage: {
    width: (width / 6) - 10,
    height: (width / 6) - 10,
    borderRadius: 50,
    alignItems: 'flex-start',
  },
  catItem: {
    width: width,
    backgroundColor: '#fff',
    padding: 15,
    borderColor: '#CED3DB',
    borderWidth: .5,
    flexDirection: 'row'
  },
  catNameText: {
    color: '#212121',
    fontSize: normalize(14),
    fontFamily: 'Poppins-Medium',
    //marginHorizontal: normalize(5),
    //fontWeight:'bold',
    padding: normalize(3),
  },
  userNameText: {
    flex: .5,
    color: '#212121',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Medium',
    //marginHorizontal: normalize(5),
    //fontWeight:'bold',
    textAlign: 'left'
  },
  timingText: {
    flex: .5,
    color: '#767676',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
    padding: normalize(3),
    textAlign: 'right',
    color: 'darkgray'
  },
  userNameText1: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#000'
  },
  messageTime: {
    marginLeft: 10, 
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#cdcdcd'
  }
})