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
import ImagePicker from 'react-native-image-crop-picker';

import {
  Header,
  BasicHeader,
  CarouselWrapper,
  RunningOrders,
  AddedServices,
  Micro_Jobs,
  Customer_Reviews

} from '../../shares'
import {
  normalize
} from '../../helpers'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import styles from './style'
import { allActions } from '../../actions'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
const mapDispatchToProps = (dispatch) => {
  return ({
    allActions: bindActionCreators(allActions, dispatch)
  })
}

const mapStateToProps = (state) => {
  return { loginStatus: state.common.loginStatus }
}


const education_props = [
  { label: 'Masters', value: 'Masters' },
  { label: 'Degree', value: 'Degree' }
];
const listed_props = [
  { label: 'Company', value: '1' },
  { label: 'Individual', value: '2' },

];



class AddSeller1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      selectNumber: "Select",
      selectTime: "Select",
      isNum: false,
      isHours: false,
      image: null,
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      value1: '',
      isModalVisible: false,
      clist: [],
      slist: [],
      citylist: [],
      country: 'Select',
      country_id: '',
      state_id: '',
      state: 'Select',
      city: 'Select'


    }



  }

  componentWillMount() {


  }
  addImage() {
    ImagePicker.openPicker({
      mediaType: "image/jpeg",
      width: 300,
      height: 400,
    }).then(images => {
      this.setState({ image: images })
    })
  }
  select_Number() {
    this.setState({ isNum: true })
  }

  select_Time() {
    this.setState({ isHours: true })
  }

  save() {
    if (this.state.value1 == '' || this.state.value == '' || this.state.username == '' || this.state.selectNumber == 'Select' || this.state.selectTime == 'Select' || this.state.country_id == '' || this.state.state_id == '' || this.state.city_id == '' || this.state.image == null) {
      alert("All the fields marked with * are required")
    } else {
      let seller_data = {
        'user_id': this.props.loginStatus.data.user_id,
        'display_name': this.state.username,
        'profile_pic': this.state.image,
        'profile_url': "https//google.com",
        'education': this.state.value,
        'average_response_time': this.state.selectNumber,
        'average_response_type': this.state.selectTime == "hours" ? "1" : "2",
        'country': this.state.country_id,
        'state': this.state.state_id,
        'city': this.state.city_id,
        'listed': this.state.value1

      }
      console.log('seller_data', seller_data);
      this.props.navigation.push('AddSeller2', { 'seller_data': seller_data });
    }
  }

  showList(e) {

    if (e == 'c') {
      fetch(`https://www.ekprice.com/api/countries`)
        .then((response) => response.json())
        .then((res) => {
          this.setState({ clist: res.data, isModalVisible: true })
        })
    }

    if (e == 's') {
      if (this.state.country_id == '') {
        alert("Select country first")
      } else {
        console.log(`https://www.ekprice.com/api/state/${this.state.country_id}`)
        fetch(`https://www.ekprice.com/api/state/${this.state.country_id}`)
          .then((response) => response.json())
          .then((res) => {
            this.setState({ slist: res.State, isModalVisible: true })
          })
      }
    }
    if (e == 'city') {
      if (this.state.state_id == '') {
        alert("Select state first")
      } else {
        fetch(`https://www.ekprice.com/api/cities/${this.state.state_id}`)
          .then((response) => response.json())
          .then((res) => {
            this.setState({ citylist: res.cities, isModalVisible: true })
          })
      }
    }

  }
  render() {

    return (
      <View style={styles.container}>
        <BasicHeader {...this.props} title={"Add Freelancer Details"} />
        <View style={styles.mainContent}>
          <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
              <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                  <TouchableOpacity style={styles.userImage} onPress={this.addImage.bind(this)}>
                    {this.state.image ?
                      <Image source={{ uri: this.state.image.path }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                      :
                      <Image source={require('../../assets/img/userProfile.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                    }
                  </TouchableOpacity>
                  <Text style={[styles.userName, { color: 'green' }]} onPress={this.addImage.bind(this)}>Upload Photo <Text style={{ color: 'red' }}> *</Text></Text>
                </View>

              </View>
              <View style={styles.designBox}>
                <Text style={[styles.text, { fontSize: 12, color: '#808080' }]}>(Note :All the fields marked with * are required)</Text>
              </View>
              <View style={styles.designBox}>
                <Text style={styles.text}>Display Name <Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                  <TextInput style={styles.input}
                    placeholder={'Display Name'}
                    placeholderTextColor="#767676"
                    onChangeText={(username) => { this.setState({ username: username }) }}
                  ></TextInput>
                </View>
              </View>
              {/* <View style={styles.designBox}>
                <Text style={styles.text}>Profile Url <Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                  <TextInput style={styles.input}
                    placeholder={'Display Name'}
                    placeholderTextColor="#767676"
                    onChangeText={(profileUrl) => { this.setState({ profileUrl: profileUrl }) }}
                  ></TextInput>
                </View>
              </View> */}
              <View style={styles.designBox}>
                <Text style={styles.text}>Education</Text>
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                  <RadioForm
                    radio_props={education_props}
                    initial={-1}
                    formHorizontal={true}
                    buttonSize={10}
                    labelStyle={{ color: 'gray', paddingRight: 10, fontSize: normalize(13) }}
                    buttonStyle={{ marginLeft: 10 }}
                    onPress={(value) => { this.setState({ value: value }) }}
                  />
                </View>
              </View>
              <View style={styles.designBox}>
                <Text style={styles.text}>Average response time <Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ padding: 5, flexDirection: "row" }}>
                  <View style={{ width: '49%', margin: '1%' }}>
                    <Text style={styles.selectText} onPress={this.select_Number.bind(this)}>{this.state.selectNumber}</Text>
                    {this.state.isNum ?
                      <View>
                        {this.state.numbers.length > 0 && this.state.numbers.map((item, index) => {
                          return (
                            <Text style={styles.selectText} key={`item_${index}`} onPress={() => { this.setState({ selectNumber: item, isNum: false }) }}>{item}</Text>
                          )
                        }
                        )
                        }
                      </View>
                      :
                      null
                    }
                  </View>
                  <View style={{ width: '49%', margin: '1%' }}>
                    <Text style={styles.selectText} onPress={this.select_Time.bind(this)}>{this.state.selectTime}</Text>
                    {this.state.isHours ?
                      <View>
                        <Text style={styles.selectText} onPress={() => { this.setState({ selectTime: 'Hours', isHours: false }) }}>Hours</Text>
                        <Text style={styles.selectText} onPress={() => { this.setState({ selectTime: 'Days', isHours: false }) }}>Days</Text>
                      </View>
                      :
                      null
                    }
                  </View>
                </View>
              </View>

              <View style={styles.designBox}>
                <Text style={[styles.text, { color: '#808080' }]}>Location <Text style={[styles.text, { fontSize: 10, color: '#808080' }]}>[Adding location will map your clients much better]</Text>  *</Text>
              </View>

              <View style={styles.designBox}>
                <Text style={styles.text}>Country <Text style={{ color: 'red' }}> *</Text></Text>
                <Text style={styles.selectText} onPress={this.showList.bind(this, 'c')}>{this.state.country}</Text>
              </View>

              <View style={styles.designBox}>
                <Text style={styles.text}>State <Text style={{ color: 'red' }}> *</Text></Text>
                <Text style={styles.selectText} onPress={this.showList.bind(this, 's')}>{this.state.state}</Text>
              </View>

              <View style={styles.designBox}>
                <Text style={styles.text}>City <Text style={{ color: 'red' }}> *</Text></Text>
                <Text style={styles.selectText} onPress={this.showList.bind(this, 'city')}>{this.state.city}</Text>
              </View>
              <View style={styles.designBox}>
                <Text style={styles.text}>List As <Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ padding: 10 }}>
                  <RadioForm
                    radio_props={listed_props}
                    initial={-1}
                    formHorizontal={true}
                    buttonSize={10}
                    labelStyle={{ color: 'gray', paddingRight: 10, fontSize: normalize(13) }}
                    buttonStyle={{ marginLeft: 10 }}
                    onPress={(value) => { this.setState({ value1: value }) }}
                  />
                </View>
              </View>




              <View style={{ width: "100%", alignSelf: 'center', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: "46%", alignSelf: 'center', margin: "2%" }}>
                  <TouchableOpacity style={styles.buttonReject} onPress={() => { this.props.navigation.goBack() }}>

                    <Text style={[styles.buttonText, { color: "#000" }]}>Cancel</Text>

                  </TouchableOpacity>
                </View>
                <View style={{ width: "46%", alignSelf: 'center', margin: "2%" }}>
                  <TouchableOpacity style={styles.approveButton} onPress={this.save.bind(this)}>

                    <Text style={[styles.buttonText, { color: "#fff" }]}>Save</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <Modal visible={this.state.isModalVisible} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', height: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
            <ScrollView>
              <View style={styles.modalcontainer}>
                <View style={{ width: '50%' }}>
                  <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(16), fontFamily: 'Poppins-Medium' }]}>List</Text>
                </View>
                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible, newImage: [] }) }}>
                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.modalcontainer, { flexDirection: 'column' }]}>
                {this.state.clist.length > 0 ?
                  <View style={{ width: '100%', justifyContent: 'center' }}>
                    {
                      this.state.clist.map((item, index) => {
                        return (
                          <View style={styles.catItem} key={`cat_${index}`}>
                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={() => { this.setState({ country: item.name, isModalVisible: false, clist: [], country_id: item.id }) }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.catNameText}>
                                  {item.name == this.state.country ?
                                    <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                    :
                                    <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                  }
                                </Text>
                                <Text style={styles.catNameText}>  {item.name}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }

                  </View>
                  :
                  null
                }
                {this.state.slist.length > 0 ?
                  <View style={{ width: '100%', justifyContent: 'center' }}>
                    {
                      this.state.slist.map((item, index) => {
                        return (
                          <View style={styles.catItem} key={`cat_${index}`}>
                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={() => { this.setState({ state: item.name, isModalVisible: false, slist: [], state_id: item.id }) }}>
                              <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.catNameText}>
                                {item.name == this.state.state ?
                                  <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                  :
                                  <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                }
                                </Text>
                                <Text style={styles.catNameText}>  {item.name}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }

                  </View>
                  :
                  null
                }
                {this.state.citylist.length > 0 ?
                  <View style={{ width: '100%', justifyContent: 'center' }}>
                    {
                      this.state.citylist.map((item, index) => {
                        return (
                          <View style={styles.catItem} key={`cat_${index}`}>
                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={() => { this.setState({ city: item.name, isModalVisible: false, citylist: [], city_id: item.id }) }}>
                              <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.catNameText}>
                                {item.name == this.state.city ?
                                  <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                  :
                                  <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                }
                                </Text>
                                <Text style={styles.catNameText}>  {item.name}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }

                  </View>
                  :
                  null
                }
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    )

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddSeller1)