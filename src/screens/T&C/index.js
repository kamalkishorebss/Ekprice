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
        <BasicHeader {...this.props} title={"Terms and Conditions"} />
        <View style={styles.mainContent}>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
              <Text style={styles.text}>Ekprice.com is an online service providing website that connects its users to service providers through its platform. This document covers the terms and conditions under which the services are provided.
              </Text>
              <Text style={styles.text}>Your registration as a member of Ekprice.com or the use of any of the features and services on Ekprice.com, either as a registered service provider/ service user or as a visitor constitutes automatic acceptance of these terms and conditions. Ekprice.com reserves the right to update the terms, conditions and notices of this agreement without notice to you. It is your responsibility to periodically review the most current version of this Agreement.</Text>
              <Text style={styles.text}>By accessing or using the Sites, Content, or Services, you agree to be bound by these Terms of Service. If you do not agree with any of the terms and conditions of Ekprice.com, do not register and you will not be authorised to use Ekprice.com services.</Text>

              <Text style={styles.text}>The views expressed on the website are not those of Ekprice.com, and any issues in them belong to the respective contributors. Through the use of this site, you agree to hold Ekprice.com harmless and its sponsors, owners, shareholders or employees against any claims.You are responsible for safeguarding the password that you use to access the Sites, Content and Services. You agree not to disclose your password to any third party.</Text>

              <Text style={styles.text}>You agree to take sole responsibility for any activities or actions under your password, whether or not you have authorized such activities or actions. You may not make any content item originating from Ekprice.com available for public access by any means whatsoever without obtaining prior written permission from Ekprice.com.</Text>
              <Text style={styles.text}>Ekprice.com provides a variety of forums for its members to express themselves in the form of blogs, comments, reviews and photographs. You truthfully assert that the content being contributed is yours and that you own the copyright to the content. The content on the website is posted by Ekprice.com, visitors and its service providers/service user. Ekprice.com will attempt to ensure the integrity and the accuracy of the site in the Content and or Services but it does not guarantee that the information is accurate or complete or current. Ekprice.com can not be held liable for inaccuracy of any data listed on the website or any damage caused by the use of inaccurate data. It is Ekprice.com's policy to correct any inaccuracy reported within 7 days.</Text>

              <Text style={styles.text}>The opinions and reviews expressed on the site belong to the users and Ekprice.com cannot be held liable in any way about the content of the opinions and reviews.Information about the service providers posted on the site is obtained from the sellers/ associated companies websites, other source on the internet.</Text>
              <Text style={styles.text}>Ekprice.com should not be thought of as the authority and the final guide in your decision making. Ekprice.com at its sole discretion may edit, delete or block access to any Content including Member Posted Content, without notice and without liability. We will however make reasonable efforts to inform you of the changes.</Text>
              <Text style={styles.text}>If you are a visitor on our website and if you update any personal contact information such as phone number or e-mail address, Ekprice.com reserves the right to contact you over Phone calls, SMS or E-mail. If the intention was for becoming a seller/ to use a service, or seeking information about our services, ekprice team will guide you accordingly via phone call, SMS or e-mail.While using the web site and engaged in any form of communication on any of the forums, you agree not to:</Text>
             
              <Text style={styles.text}>Post, publish or transmit any messages that is false, misleading, defamatory, harmful, threatening, abusive, harassing, defamatory, invades another's privacy, offensive, promotes racism, hatred or harm against any individual or group or religion or caste, infringes another's rights including any intellectual property rights or copyright or trademark, violates or encourages any conduct that would violate any applicable law or regulation or would give rise to civil liability.</Text>
              <Text style={styles.text}>Upload or post otherwise make available any content that you do not have a right to make available, under any law or under contractual or fiduciary relationships.Upload or post or otherwise make available any Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party. You may, however, post excerpts of copyrighted material so long as they adhere to Fair Use guidelines.Collect screen names and email addresses of members for purposes of advertisement, solicitation or spam are prohibited.. Attempt to probe, scan, or test the vulnerability of website or breach any security or authentication measures.</Text>
              <Text style={styles.text}>Access or search the Sites Content or Services with any engine, software, or tool.Send unsolicited email, junk mail, spam, or chain letters, or promotions or advertisements for products or services. Reformat or frame any portion of the web pages that are part of the Ekprice.com Site without written agreement.</Text>
              <Text style={styles.text}>Create user accounts by automated means or under false or fraudulent pre-tenses. Post text, messages, graphics or materials that are sales offers, advertisements, or promotions for products or services. Ekprice.com reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Services with or without notice.</Text>
              <Text style={styles.boldText}>Venue Only</Text>
              <Text style={styles.text}>If you enter into correspondence or engage in commercial transactions with third parties in connection with your use of the ekprice Service, such activity is solely between you and the applicable third party. Ekprice shall have no liability, obligation or responsibility for any such activity. You hereby release Ekprice.com from all claims arising from such activity.</Text>
              <Text style={styles.boldText}>Ownership</Text>
              <Text style={styles.text}>Except for the Content submitted by members or users, the ekprice Service and all aspects thereof, including all copyrights, trademarks, and other intellectual property or proprietary rights therein, is owned by Ekprice.com or its licensors. You acknowledge that the Ekprice.com and any underlying technology or software used in connection with the ekprice Service contain ekprice proprietary information. You may not modify, reproduce, distribute, create derivative works of, publicly display or in any way exploit, any of the content, software, and/or materials available on the Ekprice.com Site, in whole or in part except as expressly provided in ekprice policies and procedures.
 Except as expressly and unambiguously provided herein, Ekprice.com and its suppliers do not grant you any express or implied rights, and all rights in the Ekprice.com Service not expressly granted by Ekprice.com to you are retained by Ekprice.com.</Text>
              <Text style={styles.boldText}>Limitation of Liability</Text>
              <Text style={styles.text}>The site, content, and services are provided as is, without warranty or condition of any kind, either expressed or implied. in no event shall ekprice.com, be liable for any direct, indirect, incidental, special, punitive, consequential damages whatsoever, including, but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use or the inability to use our services.ekprice.com makes no warranty that the sites, content, or services will meet your requirements or be available on an uninterrupted, secure, or error-free basis.ekprice.com makes no warranty regarding the quality of any products, services, accuracy, timeliness, truthfulness, completeness or information purchased or obtained through the sites, content or services.</Text>

            </View>
          </ScrollView>
        </View>
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(About)