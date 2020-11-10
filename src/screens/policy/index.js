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


class Policy extends React.Component {
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
        <BasicHeader {...this.props} title={"Privacy Policy"} />
        <View style={styles.mainContent}>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.sectionContainer}>
              <Text style={styles.text}>Ekprice collects only such Personal Information that we believe to be relevant and is required to understand you or your interests. Such information may be stored in server logs. This data may include: IP address of your server from where the Website is being accessed, the type of browser (Internet Explorer, Firefox, Opera, and Google Chrome etc.), the operating system of your system and the Website You last visited before visiting to our Website.
              </Text>
              <Text style={styles.text}>You acknowledge that apart from your Personal Information, if you upload any content on the Website, such content may be available to the other users of the Website.
Ekprice will not be liable for the disclosure and dissemination of such Personal Information to any third parties.
</Text>
              <Text style={styles.text}>You are required to submit your information at the time of making an online transaction on the Website. Ekprice uses an online payment gateway that is operated by a third party and the information that you share with Ekprice is transferred and shared with such third party payment gateway operator. The said operator may also have access to your online purchase history/details that you make from the website.</Text>
              <Text style={styles.text}>Ekprice will share the information required for processing a transaction to the service provider who will fulfil the orders. The information includes the email address, phone number.
Extremely sensitive information like your credit-card details are transacted upon secure sites of approved payment gateways which are digitally under encryption, thereby providing the highest possible degree of care as per current technology.
</Text>
              <Text style={styles.text}>When you visit our Site, we generally use industry-wide technologies such as "cookies" (or similar technologies), which stores certain information on your computer and which will allow us, among other things, to enable automatic sign-in to the Site, make your browsing much more convenient and effortless and allow us to test user experience and offer you personalised browsing or promotions. By continuing to use our Site, you are agreeing to place cookies on your computer or device in accordance with the terms of this Policy. The Site uses cookies to collect statistical data about its use, to tailor the Site's functionality to suit personal preferences and to assist with various aspects of Site operation. These files contain a variety of information such as information about Ekprice webpages visited by you, the length of time you visited the Site, data about how you came to visit the Site, areas viewed by you within the Site, and additional information. Cookies remain on your device for the period described below.</Text>
              <Text style={styles.text}>Some cookies are used to help you navigate through the website. Few cookies are used by Ekprice to provide you the best user experience possible such as remembering the choices made by you or to show personalised content based on your location. The last category of cookies are used to understand the behaviour on the website which also allows us to continuously improve user experience and provide you at most support.</Text>
              <Text style={styles.text}>Ekprice implements standard measures to protect against unauthorized access to and unlawful interception of Personal Information. However, no Internet site can fully eliminate security risks.</Text>
              <Text style={styles.text}>Ekprice strives to ensure the security, integrity and privacy of your Personal Information and to protect your Personal Information against unauthorized access or unauthorized alteration, disclosure or destruction. Ekprice is not responsible for any breach of security or for any actions of any third parties that receive your Personal Information.
The Website also linked to many other sites and we are not/shall be not responsible for their privacy policies or practices as it is beyond our control.</Text>
              <Text style={styles.text}>By accessing the Website, You have agreed to the terms set out in this Policy. This Policy should be at all times read along with the Terms of Use of the Website.</Text>
              <Text style={styles.text}>If you have questions or concerns about this Policy, please contact Ekprice at care@Ekprice.com</Text>
              
              </View>
          </ScrollView>
        </View>
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Policy)