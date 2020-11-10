import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Dimensions,
    Image,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
const { height, width } = Dimensions.get('window')
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import Modal from 'react-native-modal';
import Toast, { DURATION } from 'react-native-easy-toast'
import {
    Header,
    BasicHeader,
    NormalHeader,
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
import {
    normalize
} from '../../helpers'

import * as Progress from 'react-native-progress'

import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        category: state.common.category,
    }
}


class Step1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            cat: 'Select Category',
            subcat: 'Select Sub Category',
            skills: 'Select Skills',
            categoryModal: false,
            skillsModal: false,
            skillsList: [],
            skills: [],
            modalHeaderText: '',
            title: "",
            detail: '',
            cat_id: '',
            subcat_id: '',
            initialTitle : "I will",
            titleLength :0,
            maximumCount : 80,
            detailCount  : 0 
        }
    }

    componentDidMount() {
        fetch(`https://www.ekprice.com/api/sellerskills`)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            this.setState({ skillsList: res.skills })
        })


    }



    goToModal() {
        this.setState({ isModalVisible: true })
    }

    openModal(e) {
        if (e == 'c') {
            this.setState({
                categoryModal: true,
                modalHeaderText: 'Categories',
                list: this.props.category.CATEGORIES
            })
        }

        if (e == 's') {
            if (this.state.cat_id) {
                fetch(`https://www.ekprice.com/api/getSubCategories/${this.state.cat_id}`).then((response) => response.json()).then((json) => {
                    console.log("HHHRGFGGGGFG", json)
                    this.setState({
                        categoryModal: true,
                        modalHeaderText: 'Sub Categories',
                        list: json.data.SubCategories
                    })
                })
            } else {
                alert("Please select category first")
            }

        }

    }

    selected(e) {
        if (e.cat_title) {
            this.setState({ cat: e.cat_title, categoryModal: false, cat_id: e.cat_id })
        } else {
            this.setState({ subcat: e.subcat_title, subcat_id: e.subcat_id, categoryModal: false })
        }
    }

    

    selectSkills() {
        this.setState({skillsModal : true})

    }

     
    removeSkills(id){
       let filteredArray = this.state.skills.filter(item => item.id !== id)
       this.setState({skills: filteredArray});
    }

    ShowMaxAlert = (EnteredValue) =>{
      
        var TextLength = EnteredValue.length.toString() ;
        //this.state.maximumCount = this.state.maximumCount-1;
        this.setState({titleLength : TextLength,title : EnteredValue,maximumCount :this.state.maximumCount-1})
        if(TextLength == 80){
   
          Alert.alert("Sorry, You have reached the maximum input limit.")
          // Put your code here which you want to execute when TextInput entered text reached to 10.
   
        }
   
      
    }

    continueButton() {
        if (this.state.cat_id == '' || this.state.subcat_id == '' || this.state.skills == 0 || this.state.titleLength<80 || this.state.detail.length < 200) {
            this.refs.toast.show("All the fields marked with * are required");
        } else {
            
            // let data = {
            //     "cat": this.state.cat_id,
            //     "subcat": this.state.subcat_id,
            //     "skills": this.state.skills,
            //     "title": this.state.title,
            //     "detail": this.state.detail
            // }
            // this.props.navigation.navigate('Step2', { 'data': data });
        }

    }

    render() {
        console.log("ffffff",this.state.skills) 
        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Add Service"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>

                        <View style={styles.sectionContainer}>
                            <View >
                                <Text style={styles.progressLabel}>Creating Services Progress</Text>

                                <Progress.Bar
                                    progress={25}
                                    width={width - 30}
                                    color={'#59BD5A'}
                                    unfilledColor={'#303030'}
                                    borderWidth={0}
                                    borderRadius={0}
                                />
                            </View>
                            <View style={styles.innerContainer}>
                                <Text style={styles.serviceLabel}>What makes a successful Ekprice Service?</Text>
                                <Text style={styles.serviceLightText}>Your first impression matters! Create a service that will stand out from the crowd on Ekprice.</Text>
                                <Text style={styles.inputLabel}>Category <Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>
                                    <Text style={styles.inputText} onPress={this.openModal.bind(this, 'c')}>{this.state.cat}</Text>
                                    <Text style={{ textAlign: 'right' }}><Icon name="keyboard-arrow-down" size={20} color="#000" /></Text>
                                </View>
                                <Text style={styles.inputLabel}>Sub Category <Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>
                                    <Text style={styles.inputText} onPress={this.openModal.bind(this, 's')}>{this.state.subcat}</Text>
                                    <Text style={{ textAlign: 'right' }}><Icon name="keyboard-arrow-down" size={20} color="#000" /></Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.serviceLabel}>Enter the skills you want to showcase for this service</Text>
                                <Text style={styles.serviceLightText}>[This will add more credibility to your profile.]</Text>
                                <Text style={styles.inputLabel}>Select Skill <Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>
                                    <Text style={styles.inputText} onPress={this.selectSkills.bind(this)}>Select</Text>
                                    <Text style={{ textAlign: 'right' }}><Icon name="keyboard-arrow-down" size={20} color="#000" /></Text>
                                </View>
                                {this.state.skills.length > 0 ?
                                    <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.state.skills.map((item, index) => {
                                            return (
                                                <View style={{ flexDirection: 'row', width: 'auto', padding: 10, borderBottomColor: "#777", borderBottomWidth: .5 }} key={`cat_${index}`}>
                                                    <Text style={{ width: '80%', textAlign: 'left' }}>{item.title}</Text>
                                                    <Text style={{ width: '20%', textAlign: 'right' }} onPress={this.removeSkills.bind(this,item.id)}><Icon name="close" color="red" size={25}></Icon></Text>
                                                </View>
                                            )
                                        })
                                        }
                                    </View>
                                    :
                                    null
                                }

                            </View>
                        </View>

                        <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.serviceLabel}>Service Title <Text style={{ color: 'red' }}>*</Text></Text>
                                <Text style={styles.serviceLightText}>[This will add more credibility to your profile.]</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>
                                    <TextInput
                                        style={[styles.input,{width:'15%',textAlign:'center'}]}
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#212121"
                                        numberOfLines={3}
                                        multiline={true}
                                        value = {this.state.initialTitle}
                                        editable={false}  

                                    />
                                    <TextInput
                                        style={[styles.input,{width:'85%',textTransform:'lowercase'}]}
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#767676"
                                        numberOfLines={3}
                                        multiline={true}
                                        minLength={60}
                                        maxLength={80}
                                        onChangeText={ EnteredValue => this.ShowMaxAlert(EnteredValue) }
                                        //onChangeText={(title) => { this.setState({ title: title }) }}
                                    />
                                    
                                </View>
                                <Text style={styles.serviceValidateText}>{this.state.titleLength==6?'[Min 60 chars and Max 80 chars]':`${7+parseInt(this.state.titleLength)}/80`}</Text>
                                <Text style={styles.serviceLightText}></Text>

                                <Text style={styles.serviceLabel}>Service Details <Text style={{ color: 'red' }}>*</Text></Text>
                                <Text style={styles.serviceLightText}>[Keep it as descriptive as possible]</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>

                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Enter Detail"
                                        placeholderTextColor="#767676"
                                        numberOfLines={3}
                                        onChangeText={(detail) => { this.setState({ detail: detail,detailCount :  detail.length + 1}) }}
                                        multiline={true}
                                    />
                                </View>
                                <Text style={styles.serviceValidateText}>{this.state.detailCount== 0?'[Min 100 chars]': `${this.state.detailCount}/200`}</Text>


                            </View>
                            <TouchableOpacity style={styles.Button} onPress={this.continueButton.bind(this)}>

                                <Text style={[styles.buttonText]}>Continue</Text>

                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>

                <Modal visible={this.state.categoryModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', height: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>

                        <View style={styles.modalcontainer}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.clickTxt}>{this.state.modalHeaderText}</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ categoryModal: false }) }}>
                                    <Text style={styles.clickTxt}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this.state.list.map((item, index) => {
                                    return (
                                        <View style={styles.catItem} key={`cat_${index}`}>
                                           {item.cat_title?   
                                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={()=>{this.setState({ cat: item.cat_title, categoryModal: false, cat_id: item.cat_id })}}>
                                                <View style={{ flexDirection: 'row' }}>
                                                   {item.cat_title == this.state.cat?
                                                     
                                                        <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                                        :
                                                        <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                                    
                                                   }
                                                    <Text style={styles.catNameText}>
                                                        <Text>  {item.cat_title}</Text>
                                                    </Text>
                                                    
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={()=>{this.setState({ subcat: item.subcat_title, subcat_id: item.subcat_id, categoryModal: false })}}>
                                                <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.catNameText}>
                                                {item.subcat_title == this.state.subcat?
                                                     
                                                     <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                                     :
                                                     <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                                 
                                                }</Text>
                                                    <Text style={styles.catNameText}>
                                                        <Text>  {item.subcat_title}</Text>

                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>


                    </View>
                </Modal>

                <Modal visible={this.state.skillsModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', height: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>

                        <View style={styles.modalcontainer}>
                            <View style={{ width: '50%', alignItems: 'flex-start' }}>
                                <Text style={styles.clickTxt}>Skills List</Text>
                            </View>
                            <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ skillsModal: false }) }}>
                                    <Text style={styles.clickTxt}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this.state.skillsList.map((item, index) => {
                                    return (
                                        <View style={styles.catItem} key={`cat_${index}`}>

                                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={() => { this.setState({ skills: this.state.skills.concat(item), skillsModal: false }) }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.catNameText}>
                                                   {this.state.skills == item.title?
                                                     <Icon name="radio-button-checked" size={20} color='red'></Icon>
                                                     :
                                                     <Icon name="radio-button-unchecked" size={20} color='red'></Icon>
                                                   
                                                   }
                                                   </Text>
                                                    <Text style={styles.catNameText}> 
                                                            {item.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>


                    </View>
                </Modal>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'red' }}
                    position='center'
                    positionValue={200}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff', fontSize: 16, padding: 5, fontWeight: 'bold' }}
                />
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Step1)