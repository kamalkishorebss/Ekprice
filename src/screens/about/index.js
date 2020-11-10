import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'

import {
  Header,
  BasicHeader,
  CarouselWrapper,
  RunningOrders,
  AddedServices,
  Micro_Jobs,
  Customer_Reviews

} from '../../shares'



import styles from './style'


import {
  allActions
} from '../../actions'


import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
  return ({
    allActions: bindActionCreators(allActions, dispatch)
  })
}

const mapStateToProps = (state) => {
  return {loginStatus :state.common.loginStatus}
}


class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }



  }

  componentWillMount() {

    
  }
  
  
  

  render() {

    return (
      <View style={styles.container}>
        <BasicHeader {...this.props} title={"About Us"} />
        <View style={styles.mainContent}>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
              <Text style={styles.text}>We are fuelling the world’s freelancing industry. Started in 2017 from the ground up, we have had a consistent vision of providing digital services to all kinds of businesses. In the growing age of e-commerce and virtual cooperation from different parties involved in every project, it’s crucial that you find a way to access whatever tools you need.
              </Text>
              <Text style={styles.text}>We have a slew of different services available on our site, powered by independent professionals that are here to fulfil your needs, and make a name for themselves!</Text>
              <Text style={styles.text}>Small business/independent work has never been so widely supported and encouraged before!
Our mission is to help YOU save time and money for a large variety of services, to make your business efforts well-calculated, and spent efficiently. Startups and individuals are also thriving under our system, because of all the fantastic features we have in place. You are free to browse the categories and subcategories to find the EXACT type of service you are looking for. Our rating system is in place to protect both buyers and sellers - quality, efficient service results in positive reviews for the sellers, and friendly, helpful responses result in positive reviews for the buyers. As our world is looking to continuously move in the direction of digital service, there has never been a better chance to take advantage of this opportunity, and turn your desires into tangible results
</Text>
              <Text style={styles.text}>We greatly value our customers time and every penny spent on our services is greatly appreciated. This is why we have created a marketplace which is more resemblant of a warm, welcoming community - rather than the typical shark-bait processes that occur elsewhere. Our community enables customers and sellers to interact with each other in a way that is kind, reasonable, and remarkably effective for all parties involved.
This is a fantastic way for you to accomplish whatever it is you seek as a new business or project. We have thousands of qualified experts in just about every field imaginable. This is something you could never find at an average employment agency, or in the ads-section of a newspaper. All of India’s skills - available at your fingertips.
</Text>
              <Text style={styles.text}>For aspiring freelancers, this is a wonderful way to earn more during your free time. There is no reason for your skills to go to waste, and not be directed towards a productive side hustle or full time job that could generate you a lot of revenue. Using your existing skills is a fantastic way you can start, but it doesn’t stop there! Thanks for our courses and educational material available, it is very easy to treat yourself to new skills that are extremely valuable in the long term. This opens up plenty of doors to turn you into a more skilled professional, that can offer value to his/her clients.</Text>
              <Text style={styles.text}>With that said, we know that you will absolutely love our site. India is a fantastic place with many aspiring talents, dreams, and ambitions. Let’s bring them to life!</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(About)