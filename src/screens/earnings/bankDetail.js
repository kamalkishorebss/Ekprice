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

import AsyncStorage from '@react-native-community/async-storage';
import { isTemplateElement } from '@babel/types';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {loginStatus : state.common.loginStatus,
        getSeller : state.common.getSeller }
}
import axios from "axios";
import { API_URL } from '../../config/config';

class BankDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            service: [],
            isModalVisible: false,
            name :'',
            account_number:'',
            code:'',
            branch:'',
            business:'',
            seller_id:''


        }
    }

    componentDidMount() {

      this.get_BankDetail();

    }


    get_BankDetail(){
        this.props.allActions.getBankDetail(this.props.getSeller.data.seller_id).then(res=>{
            console.log(res)
            if(res.code == 200){
                this.setState({
                  seller_id :  13680, 
                  name :res.data.account_name,
                  account_number:res.data.account_no,
                  code:res.data.ifsc_code,
                  branch:res.data.bank_name,
                  business:res.data.business_name
                })
            }
        })
    }

    editBankDetail(){
        axios.post(`${API_URL}editSellerBankDetails?user_id=${this.state.seller_id}&account_no=${this.state.account_number}&account_name=${this.state.name}&bank_name=${this.state.branch}&ifsc_code=${this.state.code}&type_of_account=saving&business_name=${this.state.business}&business_type=individual`)
        .then(data => {
            if(data.status == 200){
                this.get_BankDetail();
                this.refs.toast.show("Bank detail edit successfully");
               
            }else{
                this.refs.toast.show("Bank detail not edit");
            }
        })
    }


    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={'Bank Detail'} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={[styles.sectionContainer, { marginBottom: 15 }]}>
                            <Text style={styles.bank}>Razarpay Details     <Text style={{ color: '#59BD5A' }}>Link account with razorpay</Text></Text>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Razarpay A/c ID</Text>
                                    <Text style={styles.trans}>2098321930-Razarpay</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.sectionContainer}>
                            <Text style={styles.bank}>Bank Details</Text>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>A/C Name</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'A/C Name'}
                                        placeholderTextColor="#767676"
                                        onChangeText={(name) => { this.setState({ name }) }}
                                        value={this.state.name}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>A/C Number</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'A/C Number'}
                                        placeholderTextColor="#767676"
                                        value={this.state.account_number}
                                        onChangeText={(account_number) => { this.setState({ account_number }) }}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Confirm A/C Number</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'A/C Number'}
                                        placeholderTextColor="#767676"
                                        value={this.state.account_number}
                                        onChangeText={(account_number) => { this.setState({ account_number }) }}
                                    ></TextInput>
                                </View>
                            </View>

                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>IFSC</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'IFSC_Code'}
                                        placeholderTextColor="#767676"
                                        value={this.state.code}
                                        onChangeText={(code) => { this.setState({ code }) }}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Bank Branch</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'Bank Branch'}
                                        placeholderTextColor="#767676"
                                        value={this.state.branch}
                                        onChangeText={(branch) => { this.setState({ branch }) }}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Account Type</Text>
                                    <Text style={styles.trans}>3 May, 2020 | IP: 176.24666.7</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Business Name</Text>
                                    <TextInput style={styles.input}
                                        placeholder={'Business Name'}
                                        placeholderTextColor="#767676"
                                        value={this.state.business}
                                        onChangeText={(business) => { this.setState({ business }) }}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '100%' }} >
                                    <Text style={styles.time}>Business Type</Text>
                                    <Text style={styles.trans}>3 May, 2020 | IP: 176.24666.7</Text>
                                </View>
                            </View>

                            <View style={styles.orderActions}>
                                <TouchableOpacity style={styles.buttonReject} onPress={this.editBankDetail.bind(this)} >

                                    <Text style={[styles.buttonText, { color: "#000" }]}>Save</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonAccept}>

                                    <Text style={styles.buttonText}>Link</Text>

                                </TouchableOpacity>


                            </View>

                        </View>



                    </ScrollView>
                </View>
                <Toast
						ref="toast"
						style={{ backgroundColor: '#59BD5A' }}
						position='bottom'
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

export default connect(mapStateToProps, mapDispatchToProps)(BankDetail)