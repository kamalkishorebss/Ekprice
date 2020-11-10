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
  carouselContainer: {
    //  width: width - normalize(90),
    //height: normalize(120),
    margin:normalize(2),
   // borderWidth:1,
    borderRadius:10,
   // borderColor:'gray'
    
  },
  carouselItem: {
    width: width - normalize(60),
    height: (width - normalize(100)) * 9 / 16,
    marginHorizontal:normalize(1),
    //borderRadius:10
  
  },
  top_selling_service: {
    width: normalize(150),
    height: normalize(150),
    marginHorizontal: normalize(2),
    backgroundColor: '#fff',
    padding: normalize(5),
    
  },
  sellingService : {
    width: normalize(150),
    height: normalize(150),
    alignSelf:'center'
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    //borderRadius:10
  
    
  },
  Top_image: {
    alignSelf:'center',
    width: '100%',
    height: '100%',
    //borderRadius:10
  
    
  },
  carouselTagWrapper: {
    marginTop: normalize(10),
    backgroundColor: '#ff002f',
    borderTopRightRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    padding: normalize(5)
  },
  searchBar: {
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor: '#F2F4F6',
    flexDirection: 'row',
    width: '82%',
    justifyContent: 'center',
    alignItems: 'center',
    //margin:10,
    borderRadius: 5,
    marginVertical: normalize(5),
    borderColor: '#525252',
    borderWidth: .1,


  },
  searchButton:{
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor: '#59BD5A',
    flexDirection: 'row',
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    //margin:10,
    borderRadius: 5,
    marginVertical: normalize(5),
    borderColor: '#525252',
    borderWidth: .1,
  },
  input: {
    //paddingLeft: 20,
    height: 40,
    width: '100%',
    fontSize: normalize(12),
    textAlign: 'left',
    color: '#767676',
    fontFamily: 'Poppins-Regular',
    textAlignVertical:'center'
  },
  normalText: {
    color: '#ffffff',
    fontSize: normalize(14),
    fontFamily: 'montserrat'
  },
  headerText: {
    color: '#212121',
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginLeft: normalize(15),
    fontFamily: 'Poppins-SemiBold'
  },
  subheaderText: {
    color: '#767676',
    fontSize: normalize(12),
    marginLeft: normalize(15),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10
  },
  dividerContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  
  mainContent: {
    flex: 1
  },
  listContainer: {
    width: width
  },
  logoContainer: {
    padding: normalize(15),
    alignItems: 'center'
  },
  logo: {
    width: width / 2,
    height: width / (2 * 2.839)
  },

  sectionContainer: {
    width: width,
    paddingVertical: normalize(10),
    backgroundColor: '#fff',
    marginBottom: normalize(10),
  },
  sectionContent: {
    width: width,
    paddingTop: normalize(5)
  },

  swiperWrapper: {

  },
  swiperContainer: {
    width: width,
    height: width * 9 / 16
  },
  swiperSlide: {
    flex: 1,
    width: width
  },
  swiperImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captionWrapper: {
    margin: normalize(15),
    backgroundColor: 'rgba(35,35,35, 0.7)',
    padding: normalize(10),
    alignItems: 'center'
  },
  captionTitle: {
    color: '#ffffff',
    fontSize: normalize(16),
    textTransform: 'uppercase',
    fontFamily: 'montserrat'
  },
  captionDate: {
    color: '#ffffff',
    fontSize: normalize(14),
    fontFamily: 'montserrat'
  },
  captionDesc: {
    color: '#ffffff',
    fontSize: normalize(16),
    fontWeight: 'bold',
    fontFamily: 'montserrat'
  },

  categoryBox: {
    padding: normalize(8),
    width: '25%',
    borderWidth: 1,
    borderColor: '#F2F4F6'
  },
  categoryText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(10),
    textAlign: 'center',
    color: '#212121'
  },
  catImage: {
    alignSelf: 'center',
    padding: normalize(8)
  },
///customer review

ReviewItem: {
    width: normalize(200),
   // height: normalize(120),
    marginHorizontal: normalize(7),
    backgroundColor: '#fff',
    padding: normalize(15),
    borderColor: '#CED3DB',
    borderWidth: 1
  },

  miniDrawTagWrapper: {
    //marginTop: normalize(10),
    alignSelf:'center',
    backgroundColor: '#fff',
    borderTopRightRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    //padding: normalize(5)
  },
  ReviewNameText: {
    color: '#212121',
    fontSize: normalize(14),
    fontFamily: 'Poppins-Medium',
    textAlign:'center',
    //marginHorizontal: normalize(5),
    fontWeight: 'bold',
    paddingVertical: normalize(5),
  },
  reviewsDateText: {
    color: '#767676',
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
    paddingVertical: normalize(5),

  },
  descWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  reviewText: {
    color: '#212121',
    fontSize: normalize(12),
    textAlign:'center',
    //textTransform: 'uppercase',
    fontFamily: 'Poppins-Medium'
  }
  , carouselTagWrapper: {
    marginTop: normalize(10),
    backgroundColor: '#ff002f',
    borderTopRightRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    padding: normalize(5)
  },
  carouselTagText: {
    color: '#ffffff',
    fontSize: normalize(12),
    marginHorizontal: normalize(5),
    fontFamily: 'montserrat'
  },

})


export default styles