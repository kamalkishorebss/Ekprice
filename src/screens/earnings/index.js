import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    Alert,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

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
import Toast, { DURATION } from 'react-native-easy-toast'
import AsyncStorage from '@react-native-community/async-storage';
import { isTemplateElement } from '@babel/types';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        checkBtn  : state.common.checkBtn,
        switchSeller : state.common.switchSeller,
        getSeller : state.common.getSeller 
    }
}

const dR=new Date();

class Earnings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            earnings: '',
            isModalVisible: false,
            dateF: moment(new Date()).format('yyyy-MM-DD'),
            dateT: moment(new Date()).format('yyyy-MM-DD'),
            isDatePickerVisible1: false,
            isDatePickerVisible2: false,
            setDatePickerVisibility: false,
            list:[],
            hvError : 'loading ...'

        }
    }

    componentDidMount() {
        this.props.allActions.YourEarning(this.props.getSeller.data.user_id,0,0).then(res => {
            console.log(res)
            this.setState({ earnings: res.data })
        })
        this.props.allActions.getwithdrwalList(this.props.getSeller.data.user_id).then(res => {
         if(res.code ==200){
             if(res.data.length>0){
                this.setState({list:res.data})
             }else{
                this.setState({hvError:'No Transaction'})
             }
         }else{
            this.setState({hvError:'No Transaction'})
         }
        })
    }

    bankDetail() {
        this.props.navigation.navigate("BankDetail")
    }

    showDatePicker = (e) => {
        if(e=='f'){
            this.setState({ isDatePickerVisible1: true })
        }
        if(e=='t'){
            this.setState({ isDatePickerVisible2: true })
        }
        
    };

    hideDatePicker1 = () => {
        this.setState({ isDatePickerVisible1: false })

    };
    hideDatePicker2 = () => {
        this.setState({ isDatePickerVisible2: false })
    };


    handleConfirm1 = (date) => {
            console.log("A date has been picked: ", moment(date).format('yyyy-MM-DD'));
            this.setState({dateF : moment(date).format('yyyy-MM-DD')})
            this.hideDatePicker1();
    };
    handleConfirm2 = (date) => {
        
             console.log("A date has been picked2: ", this.state.dataF);
             this.setState({dateT : moment(date).format('yyyy-MM-DD')})
             this.props.allActions.YourEarning(this.props.getSeller.data.user_id,this.state.dataF,moment(date).format('yyyy-MM-DD')).then(res => {
                console.log(res)
                this.setState({ earnings: res.data })
            })
             this.hideDatePicker2();
     };

     creditBtn(){
        Alert.alert(
            "Withdrawal Money",
            "Are you sure to withdraw money?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {this.widthdrawMoney()} }
            ],
            { cancelable: false }
        ) 
    }
    

    widthdrawMoney(){
        fetch(`https://www.ekprice.com/api/sellerWithdrwal?account_id=${123}&amount=${this.state.earnings.final_amount}&seller_id=${this.props.getSeller.data.seller_id}`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        }).then((response) => response.json())
            .then(res => {
            console.log(res)
            this.refs.toast.show(res.data);
        })    
        
    }
        
     

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={'My Earnings'} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '50%' }} >
                                    <Text style={styles.time}>  Form Date</Text>
                                    <View style={{ width: '100%', flexDirection: 'row' }} >
                                        <Image source={require('../../assets/img/calender.png')} style={{ width: 30, height: 30 }}></Image>
                                        <Text style={styles.time} onPress={this.showDatePicker.bind(this,'f')}>{this.state.dateF}</Text>
                                        <DateTimePickerModal
                                            isVisible={this.state.isDatePickerVisible1}
                                            mode="date"
                                            onConfirm={this.handleConfirm1.bind(this)}
                                            onCancel={this.hideDatePicker1.bind(this)}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.time}>  To Date</Text>
                                    <View style={{ width: '100%', flexDirection: 'row' }} >
                                        <Image source={require('../../assets/img/calender.png')} style={{ width: 30, height: 30 }}></Image>
                                        <Text style={styles.time} onPress={this.showDatePicker.bind(this,'t')}>{this.state.dateT}</Text>
                                        <DateTimePickerModal
                                            isVisible={this.state.isDatePickerVisible2}
                                            mode="date"
                                            onConfirm={this.handleConfirm2.bind(this)}
                                            onCancel={this.hideDatePicker2.bind(this)}
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={{ backgroundColor: "#59BD5A", flexDirection:'row', padding: 10 }}>
                                <View style={{ alignItems: 'flex-start',width:'70%'}}>
                                  <Text style={styles.price}>Rs {this.state.earnings.final_amount}</Text>
                                  <Text style={styles.subtext}>Total Money to withdraw</Text>
                                </View>
                                {this.state.earnings.final_amount>0?
                                <View style={{ alignItems: 'flex-start',width:'30%',justifyContent:'center'}}>
                                   <TouchableOpacity style={{borderWidth:1,borderColor:"#fff",padding:8,borderRadius:5}} onPress={this.creditBtn.bind(this)}>
                                       <Text style={{color:'#fff',fontFamily:'Poppins-SemiBold'}}>Withdraw</Text>
                                   </TouchableOpacity>
                                </View>
                                :
                                null
                                }
                            </View>
                            

                            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                <View style={styles.stats}>
                                    <View>
                                        <Image source={require('../../assets/img/red-label.png')} style={{ width: 40, height: 40 }} />
                                    </View>
                                    <View>
                                        <Text style={styles.statsLabel}>Total Earnings</Text>
                                        <Text style={[styles.statsValue, { color: 'red', }]}>{this.state.earnings.total_earn}</Text>
                                    </View>
                                </View>
                                <View style={styles.stats}>
                                    <View>
                                        <Image source={require('../../assets/img/black-label.png')} style={{ width: 40, height: 40 }} />
                                    </View>
                                    <View>
                                        <Text style={styles.statsLabel}>Commission Deducted</Text>
                                        <Text style={[styles.statsValue, { color: 'black', }]}>{this.state.earnings.total_com}</Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                        <View style={{ backgroundColor:'#F2F4F6',alignItems: 'flex-start', padding: 10, borderWidth: 1, justifyContent: 'center', borderColor: '#F2F4F6' }}>
                           <TouchableOpacity onPress={this.bankDetail.bind(this)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/img/ser.png')} style={{ width: 30, height: 30, }} />
                                    <Text style={styles.bank}>  Bank Details</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        {this.state.list.length>0?
                        <View style={styles.sectionContainer}>
                            <Text style={styles.bank} >Withdrawal Transaction Details</Text>
                            {this.state.list.length>0 && this.state.list.map((item,index)=>{
                            return (
                            <View style={{ alignItems: 'flex-start', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                                <View style={{ width: '60%' }} >
                                    <Text style={styles.trans}>{item.recipient}</Text>
                                    <Text style={styles.time}>{moment(item.processed_at).format('ll')} | IP: 176.24666.7</Text>
                                </View>
                                <View style={{ width: '40%' }}>
                                    <Text style={styles.priceTotal}>Rs {item.amount}</Text>
                                    <Text style={styles.status}>Completed</Text>
                                </View>

                            </View>)
                            })
                            
                            }
                            
                            
                        </View>
                        :
                        <View style={styles.sectionContainer}>
                            <Text style={styles.bank} >Withdrawal Transaction Details</Text>
                            <View style={{ alignItems: 'center', padding: 10, borderBottomColor: '#F2F4F6', borderBottomWidth: 1, flexDirection: 'row' }}>
                              <Text style={styles.bank} >{this.state.hvError}</Text>
                            </View>
                        </View>
                       }



                    </ScrollView>
                </View>
                <Toast
						ref="toast"
						style={{ backgroundColor: 'red' }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Earnings)