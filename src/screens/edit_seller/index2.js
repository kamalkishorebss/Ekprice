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
    return {
        loginStatus: state.common.loginStatus,
        switchSeller: state.common.switchSeller,
        getSeller: state.common.getSeller
    }
}



const describe_props = [
    { label: 'Student', value: 0 },
    { label: 'Entreprenur', value: 1 },
    { label: 'I own a small business', value: 2 },
    { label: 'I am a freelancer', value: 3 }
];


class EditSeller2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seller_data: this.props.getSeller.data,
            company_name: '',
            company: '',
            about: '',
            isl1: false,
            isl2: false,
            isl3: false,

            isll1: false,
            isll2: false,
            isll3: false,

            languages: [],
            lang1_id: '', lang1: 'Select Language 1', lang_level1: 'Select Expertise 1',
            lang2_id: '', lang2: 'Select Language 2', lang_level2: 'Select Expertise 2',
            lang3_id: '', lang3: 'Select Language 3', lang_level3: 'Select Expertise 3',
            isModalVisible: false,
            list: [],
            skills: [],
            years: '',
            GST: '',
            describe: ''


        }



    }

    componentDidMount = () => {

        //console.log('fffnhjjj',this.props.getSeller.data[0])
        let me = 0;
        if (this.state.seller_data.individual_describes_you == 'Student') {
            me = 0
        }
        if (this.state.seller_data.individual_describes_you == 'Entreprenur') {
            me = 1
        }
        if (this.state.seller_data.individual_describes_you == 'I own a small business') {
            me = 2
        }
        if (this.state.seller_data.individual_describes_you == 'I am a freelancer') {
            me = 3
        }
        this.setState({
            about: this.state.seller_data.individual_about_yourself,
            GST: this.state.seller_data.gstin,
            describe: me,
            lang1: this.state.seller_data.language1,
            lang2: this.state.seller_data.language2,
            lang3: this.state.seller_data.language3,
            lang_level1: this.state.seller_data.expertise_level_1 == null ? this.state.lang_level1 : this.state.seller_data.expertise_level_1,
            lang_level2: this.state.seller_data.expertise_level_2 == null ? this.state.lang_level2 : this.state.seller_data.expertise_level_2,
            lang_level3: this.state.seller_data.expertise_level_3 == null ? this.state.lang_level3 : this.state.seller_data.expertise_level_3
        })

        fetch(`https://www.ekprice.com/api/languages`)
            .then((response) => response.json())
            .then((res) => {
                console.log('uhuhhh', res)
                this.setState({ languages: res.data })
            })

    }


    select_Language(e) {
        if (e == 1) {
            this.setState({ isl1: true })
        }
        if (e == 2) {
            this.setState({ isl2: true })
        }
        if (e == 3) {
            this.setState({ isl3: true })
        }

    }

    select_Language_Level(e) {
        if (e == 1) {
            this.setState({ isll1: true })
        }
        if (e == 2) {
            this.setState({ isll2: true })
        }
        if (e == 3) {
            this.setState({ isll3: true })
        }

    }
    selectSkills() {

        fetch(`https://www.ekprice.com/api/sellerskills`)
            .then((response) => response.json())
            .then((res) => {
                this.setState({ list: res.skills, isModalVisible: true })
            })

    }

    updateSeller() {
            let data = this.props.navigation.getParam('seller_data')
            let sellerFrom = new FormData();
            sellerFrom.append('userid', data.seller_id)
            sellerFrom.append('display_name', data.display_name)
            sellerFrom.append('education', data.education)
            sellerFrom.append('response_number', data.average_response_time)
            sellerFrom.append('response_type', data.average_response_type)
            sellerFrom.append('country', data.country)
            sellerFrom.append('state', data.state)
            sellerFrom.append('city', data.city)
           // sellerFrom.append('seller_type', data.listed)
            if(this.state.years){sellerFrom.append('total_years', this.state.years)}
            if(this.state.skills.length>0){sellerFrom.append('individual_skill', this.state.skills)}
            if(this.state.gst){sellerFrom.append('GSTIN', this.state.gst)}
            if(this.state.about){sellerFrom.append('company_description', this.state.about)}
            sellerFrom.append('language1', this.state.lang1_id?this.state.lang1_id : this.state.language1)
            sellerFrom.append('language2', this.state.lang2_id?this.state.lang2_id : this.state.language2)
            sellerFrom.append('language3', this.state.lang3_id?this.state.lang3_id : this.state.language3)
            sellerFrom.append('expertise1', this.state.lang_level1)
            sellerFrom.append('expertise2', this.state.lang_level2)
            sellerFrom.append('expertise3', this.state.lang_level3)
            if(this.state.company_name){sellerFrom.append('company_name', this.state.company_name)}  
            if(this.state.describe){sellerFrom.append('individual_describes_you', this.state.describe)}
            if(this.state.about){sellerFrom.append('about_yourself', this.state.about)}
            // if(data.profile_pic){
            //     sellerFrom.append('profile', {
            //     uri: data.profile_pic,
            //     type: 'image/JPEG',
            //     name: `user_pic.jpg`
            // })
            // }
       
        console.log('seller_data', sellerFrom)

        fetch(`https://www.ekprice.com/api/editSellerdetails`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: sellerFrom
        }).then((response) => response.json())
            .then(res => {
                console.log(res)
                if(res.code == 200){
                   // this.setState({refreshering : false})
                   this.props.allActions.getSellerProfile(this.props.loginStatus.data.user_id);
                    this.props.navigation.navigate('Account')
                }
            }).catch(err => {
                console.log('ddddd', err)
            })

    }


    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Edit Seller"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                        <View style={styles.sectionContainer}>
                            {this.props.getSeller.data.seller_type == "1" ?
                                <View>
                                    <View style={styles.designBox}>
                                        <Text style={styles.text}>Company Name <Text style={{ color: 'red' }}> *</Text></Text>
                                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                            <TextInput style={styles.input}
                                                placeholder={'Company Name'}
                                                placeholderTextColor="#767676"
                                                onChangeText={(company_name) => { this.setState({ company_name: company_name }) }}
                                            ></TextInput>
                                        </View>
                                    </View>
                                    <View style={styles.designBox}>
                                        <Text style={styles.text}>Number of years in business  <Text style={{ color: 'red' }}> *</Text></Text>
                                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                            <TextInput style={styles.input}
                                                keyboardType={'numeric'}
                                                placeholder={'Number of years in business '}
                                                placeholderTextColor="#767676"
                                                onChangeText={(years) => { this.setState({ years: years }) }}
                                            ></TextInput>
                                        </View>
                                    </View>

                                    <View style={styles.designBox}>
                                        <Text style={styles.text}>Top 5 technologies your company works on  <Text style={{ color: 'red' }}> *</Text></Text>

                                        <Text style={styles.selectText} onPress={this.selectSkills.bind(this)}>Select Skills</Text>

                                        {this.state.skills.length > 0 ?
                                            <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                                                {this.state.skills.map((item, index) => {
                                                    return (
                                                        <View style={{ flexDirection: 'column' }} key={`cat_${index}`}>
                                                            <Text style={styles.selectText}>{item}</Text>
                                                        </View>
                                                    )
                                                })
                                                }
                                            </View>
                                            :
                                            null
                                        }
                                    </View>

                                    <View style={styles.designBox}>
                                        <Text style={styles.text}>GST/VAT Number  <Text style={{ color: 'red' }}> *</Text></Text>
                                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                            <TextInput style={styles.input}
                                                placeholder={'GST/VAT Number'}
                                                placeholderTextColor="#767676"
                                                onChangeText={(GST) => { this.setState({ GST: GST }) }}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View>
                                    {/*<View style={styles.designBox}>
                                        <Text style={styles.text}>Which of below best describes you?</Text>
                                         <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                            <RadioForm
                                                radio_props={describe_props}
                                                initial={this.state.describe}
                                                //formHorizontal={true}
                                                buttonSize={10}
                                                labelStyle={{ color: 'gray', paddingRight: 10, fontSize: normalize(13) }}
                                                buttonStyle={{ marginLeft: 10 }}
                                                onPress={(value) => { this.setState({ value: value }) }}
                                            />
                                        </View> 
                                    </View>*/}
                                    <View style={styles.designBox}>
                                        <Text style={styles.text}>A brief about yourself <Text style={{ color: 'red' }}>*</Text></Text>
                                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                            <TextInput style={styles.input}
                                                placeholder={'A brief about yourself'}
                                                placeholderTextColor="#767676"
                                                onChangeText={(about) => this.setState({ about })}
                                                value={this.state.about}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                            }

                            <View style={styles.designBox}>
                                <Text style={styles.text}>Languages <Text style={{ color: 'red' }}>*</Text></Text>
                                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#D7D7DB' }}>
                                    <View style={{ padding: 10, flexDirection: "row" }}>
                                        <View style={{ width: '49%', margin: '1%' }}>
                                            <Text style={styles.selectText} onPress={this.select_Language.bind(this, 1)}>{this.state.lang1}</Text>
                                            {this.state.isl1 ?
                                                <View>
                                                    {this.state.languages.length > 0 && this.state.languages.map((item, index) => {
                                                        return (
                                                            
                                                            <Text style={styles.selectText} key={`item_${index}`} onPress={() => { this.setState({ lang1: item.name,lang1_id:item.id, isl1: false }) }}>{item.name}</Text>
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
                                            <Text style={styles.selectText} onPress={this.select_Language_Level.bind(this, 1)}>{this.state.lang_level1}</Text>
                                            {this.state.isll1 ?
                                                <View>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level1: 'Basic', isll1: false }) }}>Basic</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level1: 'Fluent', isll1: false }) }}>Fluent</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level1: 'Native', isll1: false }) }}>Native</Text>
                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: "row" }}>
                                        <View style={{ width: '49%', margin: '1%' }}>
                                            <Text style={styles.selectText} onPress={this.select_Language.bind(this, 2)}>{this.state.lang2}</Text>
                                            {this.state.isl2 ?
                                                <View>
                                                    {this.state.languages.length > 0 && this.state.languages.map((item, index) => {
                                                        return (
                                                            <Text style={styles.selectText} key={`item_${index}`} onPress={() => { this.setState({ lang2: item.name,lang2_id:item.id, isl2: false }) }}>{item.name}</Text>
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
                                            <Text style={styles.selectText} onPress={this.select_Language_Level.bind(this, 2)}>{this.state.lang_level2}</Text>
                                            {this.state.isll2 ?
                                                <View>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level2: 'Basic', isll2: false }) }}>Basic</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level2: 'Fluent', isll2: false }) }}>Fluent</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level2ß: 'Native', isll2: false }) }}>Native</Text>

                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: "row" }}>
                                        <View style={{ width: '49%', margin: '1%' }}>
                                            <Text style={styles.selectText} onPress={this.select_Language.bind(this, 3)}>{this.state.lang3}</Text>
                                            {this.state.isl3 ?
                                                <View>
                                                    {this.state.languages.length > 0 && this.state.languages.map((item, index) => {
                                                        return (
                                                            <Text style={styles.selectText} key={`item_${index}`} onPress={() => { this.setState({ lang3: item.name,lang3_id:item.id, isl3: false }) }}>{item.name}</Text>
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
                                            <Text style={styles.selectText} onPress={this.select_Language_Level.bind(this, 3)}>{this.state.lang_level3}</Text>
                                            {this.state.isll3 ?
                                                <View>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level3: 'Basic', isll3: false }) }}>Basic</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level3: 'Fluent', isll3: false }) }}>Fluent</Text>
                                                    <Text style={styles.selectText} onPress={() => { this.setState({ lang_level3: 'Native', isll3: false }) }}>Native</Text>

                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>


                            <View style={{ width: "100%", alignSelf: 'center', flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ width: "46%", alignSelf: 'center', margin: "2%" }}>
                                    <TouchableOpacity style={styles.buttonReject} onPress={() => { this.props.navigation.navigate('EditSeller1') }}>
                                        <Text style={[styles.buttonText, { color: "#000" }]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "46%", alignSelf: 'center', margin: "2%" }}>
                                    <TouchableOpacity style={styles.approveButton} onPress={this.updateSeller.bind(this)}>
                                        <Text style={[styles.buttonText, { color: "#fff" }]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal visible={this.state.isModalVisible} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <ScrollView>
                            <View style={styles.modalcontainer}>
                                <View style={{ width: '50%' }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(16), fontFamily: 'Poppins-Medium' }]}>Skills</Text>
                                </View>
                                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible, newImage: [] }) }}>
                                        <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.modalcontainer, { flexDirection: 'column' }]}>

                                <View style={{ width: '100%', justifyContent: 'center' }}>
                                    {
                                        this.state.list.map((item, index) => {
                                            return (
                                                <View style={styles.catItem} key={`cat_${index}`}>
                                                    <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={() => { this.setState({ skills: this.state.skills.concat(item.title), isModalVisible: false }) }}>
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <Text style={styles.catNameText}>{item.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditSeller2)