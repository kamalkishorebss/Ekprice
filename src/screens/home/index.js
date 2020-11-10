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
import Toast, { DURATION } from 'react-native-easy-toast'
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
  return { loginStatus: state.common.loginStatus }
}


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: [],
      competitions: [],
      orders: [],
      customers_reviews: [],
      services: [],
      top_Service : [],
      EFB: [
        {

          icon: require('../../assets/img/faster.png'),
          title: 'Faster',
          desc: 'Don’t wait for days to have work completed. Pick a service of your choice on Ekprice and get it delivered in just few hours.'

        },
        {
          icon: require('../../assets/img/easier.png'),
          title: 'Easier',
          desc: 'It cant get much easier to have quality work delivered. Place orders for services just like you would place orders for products.'

        },
        {
          icon: require('../../assets/img/Better_icon.png'),
          title: 'Better',
          desc: 'Get services from top professionals with quality assured and a 100% Money Back guaranteed.'

        }
      ],
      userResponse: '',
      search: ''


    }



  }

  componentDidMount() {
    this.focusListner = this.props.navigation.addListener("didFocus", () => {

      this.props.allActions.getBanner().then(res => {
        console.log('upcoming', res);
        if (res.status == true) {
          this.setState({ competitions: res.data })
        } else {
          alert("Network Error")
        }

      })

      this.props.allActions.getTopservice().then(res => {
        console.log('upcoming', res);
        if (res.status == true) {
          this.setState({ top_Service: res.data })
        } else {
          alert("Network Error")
        }

      })
      


      this.props.allActions.get_Category().then(res => {
        // console.log('upcoming',res);
        if (res.status == true) {
          this.setState({ categoriesList: res.CATEGORIES })
        } else {
          alert("Network Error")
        }

      })





      this.props.allActions.recentService().then(res => {
        // console.log('upcoming',res);
        if (res.status == true) {

          this.setState({ services: res.recent_services })


        } else {
          //alert("Network Error")
        }

      })

      this.props.allActions.get_UserReviews().then(res => {
        // console.log('upcoming',res);
        if (res.status == true) {

          this.setState({ customers_reviews: res.customer_reviews })


        } else {
          //alert("Network Error")
        }

      })


      if (this.props.loginStatus.data) {

        this.props.allActions.get_RunningOrder(this.props.loginStatus.data.user_id).then(res => {
          // console.log('upcoming',res);
          if (res.status == true) {
            this.setState({ orders: res.running_orders })
          } else {
            //alert("Network Error")
          }
        })
        this.props.allActions.getUserProfile(this.props.loginStatus.data.user_id).then(res => {
          // console.log("profile response",res ,this.props.loginStatus.data.id)
        })



      }
    });

  }



  goToCategory(e) {
    this.props.navigation.navigate("Category", { 'cat_id': e });
  }

  componentWillUnmount() {
    // remove event listener
    this.focusListner.remove();
  }


  goToSearch = () => {
    let z = this.state.search.split('');
    console.log(z)
    if (z.length > 3) {
      this.props.navigation.navigate('SearchPage', { 'keyword': this.state.search })
    } else {
      this.refs.toast.show("Please type atleast three word");
    }

  }

  render() {

    return (
      <View style={styles.container}>
        <Header {...this.props} title={"Home"} />
        <View style={styles.mainContent}>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>


            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <View style={styles.searchBar}>
                  <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center', paddingleft: 10 }}>
                    <TouchableOpacity ><Icon name="search" size={25} color="#525252" /></TouchableOpacity>
                  </View>
                  <View style={{ flex: .9, justifyContent: 'center', paddingTop: 5 }}>
                    <TextInput style={styles.input} placeholder="Search For Micro Jobs" placeholderTextColor="#767676" onChangeText={(search) => { this.setState({ search: search }) }} ></TextInput>
                  </View>
                </View>
                <View style={styles.searchButton}>
                  <TouchableOpacity onPress={this.goToSearch.bind(this)}><Text style={[styles.input, { color: "#fff" }]}>GO</Text></TouchableOpacity>
                </View>
              </View>

              <View style={styles.sectionContent}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.competitions && this.state.competitions.length > 0 && this.state.competitions.map((item, index) => {
                      return (
                        <View style={styles.carouselContainer}>
                          <TouchableOpacity style={styles.carouselItem} key={`banner_${index}`}>
                            <ImageBackground style={styles.carouselImage} source={{ uri: item }} resizeMode="contain">
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}><Text style={{ color: '#212121' }}>Explore categories</Text></Text>

                <Text style={[styles.headerText, { marginRight: 10, fontSize: 13, color: 'red' }]} onPress={() => { this.props.navigation.navigate('Categories') }}>See All</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.subheaderText}>Click to unfold the envelope of services</Text>

                <FlatList
                  numColumns={4}
                  data={this.state.categoriesList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.categoryBox} onPress={this.goToCategory.bind(this, item)}>
                      <View style={styles.miniDrawTagWrapper} key={`cat_${index}`}>
                        <View style={styles.catImage}>
                          <Image source={{ uri: item.cat_images }} style={{ width: 40, height: 40, resizeMode: 'cover' }} />
                        </View>
                        <Text style={styles.categoryText}>{item.cat_title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            {this.props.loginStatus && this.state.orders.length > 0 ? <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}><Text style={{ color: '#333333' }}>Your Running Orders</Text></Text>

                {/* <Text style={[styles.headerText, { marginRight: 10, fontSize: 13, color: 'red' }]} onPress={() => { this.props.navigation.navigate('UserOrder') }}>See All</Text> */}
              </View>
              <View style={styles.sectionContent}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.orders.map((item, index) => {
                      return (
                        <RunningOrders
                          {...this.props}
                          key={`mini_draw_${index}`}
                          data={item}
                        />
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>
              :
              null
            }
            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}>Top Selling Services</Text>
              </View>
              <View style={styles.sectionContent}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.top_Service && this.state.top_Service.length > 0 && this.state.top_Service.map((item, index) => {
                      return (
                        <View style={styles.top_selling_service}>
                          <TouchableOpacity  key={`banner_${index}`}>
                            <ImageBackground style={styles.Top_image} source={{ uri: item }} resizeMode="contain">
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}><Text style={{ color: '#212121' }}>Recently Added Micro Jobs</Text></Text>


              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.subheaderText}>Lorem ipsum dolor sit amet, consetetur</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.services.map((item, index) => {
                      return (
                        <AddedServices
                          {...this.props}
                          key={`mini_draw_${index}`}
                          data={item}
                        />
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}>Faster-Easier-Better  </Text>
              </View>
              <View style={styles.sectionContent}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.EFB.map((data, index) => {
                      return (
                        <TouchableOpacity style={styles.ReviewItem}>


                          <View style={styles.miniDrawTagWrapper}>

                            <Image source={data.icon} style={{ width: 45, height: 45 }}></Image>
                          </View>
                          <View style={styles.descWrapper}>
                            <Text style={styles.ReviewNameText}>{data.title}</Text>
                            <Text style={styles.reviewText} >{data.desc}</Text>
                          </View>

                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>

              </View>
            </View>
            {this.props.loginStatus != '' ?
              <View style={styles.sectionContainer}>
                <View style={styles.dividerContainer}>
                  <Text style={styles.headerText}><Text style={{ color: '#333333' }}>Recently Viewed Services</Text></Text>

                  {/* <Text style={[styles.headerText, { marginRight: 10, fontSize: 13, color: 'red' }]} onPress={() => { this.props.navigation.navigate('MyService') }}>See All</Text> */}
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.subheaderText}>Lorem ipsum dolor sit amet, consetetur</Text>

                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                      this.state.services.map((item, index) => {
                        return (
                          <AddedServices
                            {...this.props}
                            key={`mini_draw_${index}`}
                            data={item}
                          />
                        )
                      })
                    }
                  </ScrollView>
                </View>
              </View>
              :
              null
            }
            <View style={styles.sectionContainer}>
              <View style={styles.dividerContainer}>
                <Text style={styles.headerText}><Text style={{ color: '#333333' }}>What our customers say</Text></Text>

                {/* <Text style={[styles.headerText, { marginRight: 10, fontSize: 13, color: 'red' }]} onPress={() => { this.props.navigation.navigate('Competitions') }}>See All</Text> */}
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.subheaderText}>Lorem ipsum dolor sit amet, consetetur</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    this.state.customers_reviews.map((item, index) => {
                      return (
                        <Customer_Reviews
                          {...this.props}
                          key={`mini_draw_${index}`}
                          data={item}
                        />
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>

          </ScrollView>
        </View>
        <Toast
          ref="toast"
          style={{ backgroundColor: 'red' }}
          position='center'
          positionValue={200}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: '#fff', fontSize: 14, padding: 5, fontWeight: 'bold' }}
        />
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)