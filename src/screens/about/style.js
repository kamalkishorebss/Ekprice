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
    backgroundColor: '#F2F4F6'
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
  text: {
    color: '#212121',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Medium',
    padding:normalize(10)
    
  }

})


export default styles