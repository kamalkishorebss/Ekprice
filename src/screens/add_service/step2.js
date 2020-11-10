import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Dimensions,
    Image,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
const { height, width } = Dimensions.get('window')
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import Modal from 'react-native-modal';
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
import ImagePicker from 'react-native-image-crop-picker';
import SelectMultiple from 'react-native-select-multiple'
import axios from "axios";

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.common.loginStatus,
        getSeller: state.common.getSeller
    }
}


class Step2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            service: [],
            isModalVisible: false,
            isBasic: true,
            image: null,
            isSTD: false,
            isPre: false,
            numbers: ["1", "2", "3", "4", "5"],
            Rnumbers: ["1", "2", "3", "4", "5"],
            selectNumber: "Select",
            selectTime: "Select",
            isR: false,
            isNum: false,
            isHours: false,
            revision: 'Select Revision',
            basic_feature1: '',
            basic_feature2: '',
            basic_feature3: '',
            OutputFiles: [],
            Outputlist: [],
            servicesList: [],
            serviceIncludes: [],
            getStep1: '',
            basic_price: 500
        }
    }

    componentDidMount() {
        this.setState({ getStep1: this.props.navigation.getParam('data') })
    }


    showOutputModal(e) {
        axios.get(`https://www.ekprice.com/api/servicesincludes/${this.props.loginStatus.data.user_id}`).then(res => {
            if (e == 'o') {
                this.setState({ servicesList: 0 })
                let opF = res.data.outputfile;
                let newArr = [];
                for (let i = 0; i < opF.length; i++) {
                    newArr.push({ "label": opF[i].title, "value": opF[i].id })
                }
                console.log("gyybyy", newArr)
                this.setState({ isModalVisible: true, Outputlist: newArr })
            }
            if (e == 's') {
                this.setState({ Outputlist: 0 })
                let sI = res.data.Servicesincludes;
                let newArray = [];
                for (let i = 0; i < sI.length; i++) {
                    newArray.push({ "label": sI[i].title, "value": sI[i].id })
                }
                console.log("gyybyy", newArray)
                this.setState({ isModalVisible: true, servicesList: newArray })
            }
        })

    }
    onSelectionsChange = (OutputFiles) => {
        console.log('out put ', OutputFiles)
        // selectedFruits is array of { label, value }
        this.setState({ OutputFiles: OutputFiles })
    }

    onServiceChange = (services) => {

        console.log('serviceIncludes', services)
        this.setState({ serviceIncludes: services })
    }

    changeTab(e) {
        if (e == 'Basic') {
            this.setState({ isBasic: true, isPre: false, isSTD: false, level: this.state.service.basic })
        }
        if (e == 'Standard') {
            this.setState({ isBasic: false, isSTD: !this.state.isSTD, isPre: false, level: this.state.service.standard })
        }
        if (e == 'Premium') {
            this.setState({ isBasic: false, isPre: true, isSTD: false, level: this.state.service.basic })
        }

    }


    updateImage() {
        // this.setState({ user_id: 2 })
        ImagePicker.openPicker({
            mediaType: "image/jpeg",
            width: 300,
            height: 400,
        }).then(images => {
            console.log("images", images);
            this.setState({ image: images })
        })
    }


    select_Number() {
        this.setState({ isNum: true })
    }

    select_Time() {
        this.setState({ isHours: true })
    }

    select_Revision() {
        this.setState({
            isR: true
        })
    }

    saveService() {
        this.setState({refreshering : true})
        if(this.state.image == null){
           alert("You need to add image for your service")
        }else{

        
        let op =[];
        
        for(var i =0;i<this.state.OutputFiles.length;i++){
           op.push(this.state.OutputFiles[i].value)
        }
        let sp =[];
        for(var i =0;i<this.state.serviceIncludes.length;i++){
            sp.push(this.state.serviceIncludes[i].value)
        }
        console.log(sp,op)
        let formData = new FormData();
        formData.append('userId', this.props.getSeller.data.user_id);
        formData.append('seller_id', this.props.getSeller.data.seller_id);
        formData.append('title', this.state.getStep1.title);
        formData.append('details', this.state.getStep1.detail);
        formData.append('category', this.state.getStep1.cat);
        formData.append('subcategory', this.state.getStep1.subcat);
        formData.append('skills', this.state.getStep1.skills.toString());
        if (this.state.image) {
            formData.append('image', {
                uri: this.state.image.path,
                type: this.state.image.mime,
                name: `service.${this.state.image.path.split('.').pop()}`
            })
        }


        //basic
        formData.append('basic_feature1', this.state.basic_feature1);
        formData.append('basic_feature2', this.state.basic_feature2);
        formData.append('basic_feature3', this.state.basic_feature3);
        formData.append('basic_output_files', op.toString());
        formData.append('basic_service_includes', sp.toString());
        formData.append('basic_price', this.state.basic_price);
        formData.append('basic_number_of_revision', this.state.revision);
        formData.append('basic_response_number', this.state.selectNumber);
        formData.append('basic_response_type', this.state.selectTime == "Hours" ? 1 : 2);

        //standard
        // formData.append('standard_feature',);
        // formData.append('standard_output_files',);
        // formData.append('standard_service_includes',);
        // formData.append('standard_price',);
        // formData.append('standard_number_of_revision',);
        // formData.append('standard_response_number',);
        // formData.append('standard_response_type',);


        //professional


        // formData.append('professional_feature',);
        // formData.append('professional_output_files',);
        // formData.append('professional_service_includes',);
        // formData.append('professional_price',);
        // formData.append('professional_number_of_revision',);
        // formData.append('professional_response_number',);
        // formData.append('professional_response_type',);
        console.log('professional', formData)

        fetch(`https://www.ekprice.com/api/addServices`,{
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method :'POST',
            body : formData
        }) .then((response) => response.json())
        .then(res => {
            console.log('response',res)
            if(res.code == 200){
                this.setState({refreshering : false})
                this.props.navigation.navigate('Home')
            }
        }).catch(err => {
            this.setState({refreshering : false})
            console.log('ddddd',err)
        })

       }

    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Add Service"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>

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
                                <View style={{ backgroundColor: "#F2F4F6", alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: 160, height: 130, paddingVertical: 10, marginTop: 10 }} onPress={this.updateImage.bind(this)}>
                                        {this.state.image ?
                                            <Image source={{ uri: this.state.image.path }} style={{ width: '100%', height: '100%' }} />
                                            :
                                            <Image source={require('../../assets/img/demoImage.png')} style={{ width: '100%', height: '100%' }} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={styles.uploadImage}>Upload Image</Text>
                                </View>
                                <Text style={[styles.serviceLightText, { paddingVertical: 5 }]}>Upload Service Image/Video [jpg, png, mp4] * 800x800</Text>
                            </View>
                        </View>

                        <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.serviceLabel}>Packages <Text style={{ color: 'red' }}>*</Text></Text>
                                <Text style={[styles.serviceLightText, { paddingVertical: 10 }]}>[Ekprice service fee will be 20% on every transaction]</Text>

                                <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F6' }}>
                                    <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Basic")}>
                                        {this.state.isBasic ?
                                            <Text style={[styles.contentText, { color: '#59BD5A' }]}>Basic</Text>
                                            :
                                            <Text style={styles.contentText}>Basic</Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Standard")}>
                                        {this.state.isSTD ?
                                            <Text style={[styles.contentText, { color: '#59BD5A' }]}>Standard</Text>
                                            :
                                            <Text style={styles.contentText}>Standard</Text>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Premium")}>
                                        {this.state.isPre ?
                                            <Text style={[styles.contentText, { color: '#59BD5A' }]}>Premium</Text>
                                            :
                                            <Text style={styles.contentText}>Premium</Text>
                                        }
                                    </TouchableOpacity>
                                </View>



                                <Text style={styles.inputLabel}>Offered Services for *</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>

                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="500"
                                        placeholderTextColor="#767676"
                                        editable={false}
                                        onChangeText={basic_price => this.setState({ basic_price })}
                                        value={this.state.basic_price}
                                    />

                                </View>
                                <Text style={styles.inputLabel}>Feature 1</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>

                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Feature"
                                        placeholderTextColor="#767676"
                                        onChangeText={(basic_feature1) => { this.setState({ basic_feature1: basic_feature1 }) }}

                                    />

                                </View>

                                <Text style={styles.inputLabel}>Feature 2</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>

                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Feature"
                                        placeholderTextColor="#767676"
                                        onChangeText={(basic_feature2) => { this.setState({ basic_feature2: basic_feature2 }) }}

                                    />

                                </View>

                                <Text style={styles.inputLabel}>Feature 3</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#CED3DB" }}>

                                    <TextInput
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Feature"
                                        placeholderTextColor="#212121"
                                        onChangeText={(basic_feature3) => { this.setState({ basic_feature3: basic_feature3 }) }}
                                    />

                                </View>

                                <View style={styles.designBox}>
                                    <Text style={styles.inputLabel}>Output Files</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {this.state.OutputFiles && this.state.OutputFiles.length > 0 && this.state.OutputFiles.map((item, index) => {
                                            return (
                                                <View style={{ width: normalize(70), marginLeft: normalize(5), paddingTop: normalize(5) }} ><Text style={styles.skills} key={`skills_${index}`}>{item.label}</Text></View>
                                            )
                                        })
                                        }
                                    </ScrollView>
                                    <TouchableOpacity style={{ padding: 10, }} onPress={this.showOutputModal.bind(this, 'o')}>
                                        <Text style={styles.selectText}>Select Output Files</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputLabel}>
                                    <Text style={styles.inputLabel}>Service Includes</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {this.state.serviceIncludes && this.state.serviceIncludes.length > 0 && this.state.serviceIncludes.map((item, index) => {
                                            return (
                                                <View style={{ width: normalize(130), marginLeft: normalize(5), paddingTop: normalize(5) }} ><Text style={styles.serIncludes} key={`skills_${index}`}>{item.label}</Text></View>
                                            )
                                        })
                                        }
                                    </ScrollView>
                                    <TouchableOpacity style={{ padding: 10, }} onPress={this.showOutputModal.bind(this, 's')}>
                                        <Text style={styles.selectText}>Select Service Includes</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputLabel}>
                                    <Text style={styles.inputLabel}>Number of Revisions<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{ padding: 10, }}>
                                        <View style={{ width: '100%', margin: '1%' }}>
                                            <Text style={styles.selectText} onPress={this.select_Revision.bind(this)}>{this.state.revision}</Text>
                                            {this.state.isR ?
                                                <View>
                                                    {this.state.Rnumbers.length > 0 && this.state.Rnumbers.map((item, index) => {
                                                        return (
                                                            <Text style={styles.selectText} key={`item_${index}`} onPress={() => { this.setState({ revision: item, isR: false }) }}>{item}</Text>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.designBox}>
                                    <Text style={styles.inputLabel}>Delivered in<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{ padding: 10, flexDirection: "row" }}>
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


                            </View>

                            <TouchableOpacity style={styles.Button} onPress={this.saveService.bind(this)}>
                            {this.state.refreshering ?
							<ActivityIndicator size="large" color="#fff" />
                            : 
                            <Text style={[styles.buttonText]}>Submit</Text>
                            }
                            </TouchableOpacity>
                        </View>



                    </ScrollView>
                </View>
                <Modal visible={this.state.isModalVisible} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', height: '90%', borderWidth: 1, alignItems: 'center', backgroundColor: '#fff' }}>

                        <View style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: 1 }}>
                            <Text style={{ color: '#222', fontSize: normalize(16), fontFamily: 'Poppins-Medium', paddingVertical: 10 }}>   List</Text>
                        </View>


                        <ScrollView>
                            <View style={styles.modalBox}>

                                {this.state.Outputlist.length > 0 ?


                                    <SelectMultiple
                                        items={this.state.Outputlist}
                                        selectedItems={this.state.OutputFiles}
                                        onSelectionsChange={this.onSelectionsChange} />


                                    :
                                    null
                                }

                                {this.state.servicesList.length > 0 ?


                                    <SelectMultiple
                                        items={this.state.servicesList}
                                        selectedItems={this.state.serviceIncludes}
                                        onSelectionsChange={this.onServiceChange} />


                                    :
                                    null
                                }

                            </View>
                        </ScrollView>

                        <View style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto', flexDirection: 'row', paddingVertical: 5 }}>
                            <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1, paddingVertical: 5 }} onPress={() => { this.setState({ isModalVisible: false }) }}>
                                <Text style={{ color: '#222', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1, paddingVertical: 5 }} onPress={() => { this.setState({ isModalVisible: false }) }}>
                                <Text style={{ color: '#222', fontSize: 16 }}>Done</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </Modal>

            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Step2)