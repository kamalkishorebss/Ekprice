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
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import axios from "axios";
import moment from 'moment';
import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'
import { normalize } from '../../helpers'
import styles from './style'
import { allActions } from '../../actions'
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        checkBtn     : state.common.checkBtn,
        switchSeller : state.common.switchSeller,
        loginStatus  : state.common.loginStatus,
        getSeller    : state.common.getSeller
    }
}

const radio_props = [
    { label: 'Enabled', value: 'Enabled' },
    { label: 'Disabled', value: 'Disabled' }
];

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            isAccount: true,
            isSupport: false,
            userId: '',
            userNameModal: false,
            emailModal: false,
            phoneModal: false,
            passwordModal: false,
            password: '',
            name: '',
            email: '',
            phone_no: '',
            profileImage: null,
            registerDate: '',
            user_id: 1,
            sellerLeveL:''


        }



    }

    componentDidMount() {
        

        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            if(this.props.checkBtn == 1) {
                this.setState({ user_id: 1 })
            } 
            if(this.props.checkBtn == 2) {
                this.setState({ user_id: 2,sellerLeveL :  this.props.getSeller.data.level_type})
            }

            this.getKey();

        });

    }
    changeTab1() {
        this.setState({ isSupport: !this.state.isSupport, isAccount: !this.state.isAccount })
    }


    async getKey() {


        const value = await AsyncStorage.getItem('currentUser');
        console.log('gggggg', value);
        if (value == null) {
            this.props.navigation.navigate("Login");
        } else {

            this.props.navigation.navigate("UserAccount");
            this.getUser(JSON.parse(value).user_id)

        }


    }


    getUser(id) {
        this.props.allActions.getUserProfile(id).then(res => {
            console.log('getuser', res);
            this.setState({
                id: res.id,
                userName: res.name,
                userId: res.user_id,
                email: res.email,
                phone_no: res.phone_no,
                // password: res.password, 
                profileImage: this.state.user_id == 1 ? res.profile_pic : this.props.getSeller.data[0].profile,
                registerDate: res.registerDate
            })


        })
    }

    openUserModal() {
        this.setState({ userNameModal: !this.state.userNameModal })
    }
    openEmailModal() {
        this.setState({ emailModal: !this.state.emailModal })
    }

    openPhoneModal() {
        this.setState({ phoneModal: !this.state.phoneModal })
    }

    openPasswordModal() {
        this.setState({ passwordModal: !this.state.passwordModal })
    }
    addService() {
        this.props.navigation.navigate('Step1')
    }
    myEarnings() {
        this.props.navigation.navigate('Earnings')
    }
    MyService() {
        this.props.navigation.navigate('MyService')
    }
    async logout() {

        try {
            this.props.allActions.checkToggle(0);
            await AsyncStorage.removeItem('currentUser');
            await AsyncStorage.clear();
            this.props.navigation.navigate("Home")

        } catch (error) {
            console.log("Error resetting data" + error);
        }

    }


    updateProfile() {
        let formData = new FormData();
        formData.append('userId', this.state.userId);
        formData.append('name', this.state.userName);
        formData.append('email', this.state.email);
        formData.append('phone_no', this.state.phone_no);
        formData.append('password', this.state.password);
        formData.append('confirmPassword', this.state.password);

        console.log('gggggg', formData);

        fetch(`https://www.ekprice.com/api/update-profile`, {

            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'multipart/form-data',

            },
            body: formData
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("response of update user profile", json)
                this.setState({ userNameModal: false, emailModal: false, phoneModal: false, passwordModal: false })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateImage() {
        // this.setState({ user_id: 2 })
        ImagePicker.openPicker({
            mediaType: "image/jpeg",
            width: 300,
            height: 400,
        }).then(images => {

            let formData = new FormData();
            formData.append('userId', this.state.userId);
            formData.append('name', this.state.userName);
            formData.append('email', this.state.email);
            formData.append('phone_no', this.state.phone_no);
            formData.append('password', this.state.password);
            formData.append('confirmPassword', this.state.password);
            formData.append('profile_pic', {
                uri: images.path,
                type: images.mime,
                name: `user_pic.${images.path.split('.').pop()}`
            })
            console.log(formData);

            fetch(`https://www.ekprice.com/api/update-profile`, {

                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("response of update user profile", json)
                    if (json.status == true) {
                        this.getUser(json.user_id)
                        this.setState({ userNameModal: false, emailModal: false, phoneModal: false, passwordModal: false })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    updateSeller() {
        ImagePicker.openPicker({
            mediaType: "image/jpeg",
            width: 300,
            height: 400,
        }).then(images => {
            let sellerFrom = new FormData();
            sellerFrom.append('user_id', this.props.loginStatus.data.user_id)
            sellerFrom.append('profile', {
                uri: images.path,
                type: images.mime,
                name: `user_pic.${images.path.split('.').pop()}`
            })
            fetch(`https://www.ekprice.com/api/editSellerProfilePic`, {

                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: sellerFrom
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if(json.success == true){
                        this.props.allActions.getSellerProfile(this.props.loginStatus.data.user_id);
                    }
                })

        })

    }

    render() {

        return (
            <View style={styles.container}>
                <Header {...this.props} title={"Account"} />
                {this.state.user_id == 1 ?
                    <View style={styles.mainContent}>
                        <ScrollView style={styles.listContainer}>
                            <View style={styles.sectionContainer}>
                                <View style={styles.accountHeader}>
                                    <TouchableOpacity style={styles.accountHeaderTab} onPress={this.changeTab1.bind(this)}>
                                        <Text style={this.state.isAccount ? styles.activeHeaderText : styles.accountHeaderText}>Account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.accountHeaderTab} onPress={this.changeTab1.bind(this)}>
                                        <Text style={this.state.isSupport ? styles.activeHeaderText : styles.accountHeaderText}>Support</Text>
                                    </TouchableOpacity>
                                </View>

                                {this.state.isAccount ?
                                    <View >
                                        <View style={styles.profileSection}>
                                            <View style={styles.profileImage}>
                                                <View style={styles.userImage}>
                                                    {this.state.profileImage ?
                                                        <Image source={{ uri: this.state.profileImage }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                        :
                                                        <Image source={require('../../assets/img/userProfile.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                    }
                                                </View>
                                                <TouchableOpacity style={styles.addImage} onPress={this.updateImage.bind(this)}>
                                                    <Image source={require('../../assets/img/plus_icon.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                </TouchableOpacity>
                                                <Text style={styles.userName}>{this.state.userName}</Text>
                                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>{this.state.email} | {this.state.phone_no}</Text>
                                                <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>User ID {this.state.userId} | Joined in {moment(this.state.registerDate).format('MMMM')},{moment(this.state.registerDate).format('YYYY')}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.otherInfo}>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.openUserModal.bind(this)}><Image source={require('../../assets/img/user.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Update UserName</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.openEmailModal.bind(this)}><Image source={require('../../assets/img/email.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Update Email Address</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.openPhoneModal.bind(this)}><Image source={require('../../assets/img/phone.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Update Phone Number</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.openPasswordModal.bind(this)}><Image source={require('../../assets/img/lock.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Change Password</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel}><Image source={require('../../assets/img/heart.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Favourite Services</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.logout.bind(this)}><Image source={require('../../assets/img/logout.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Logout</Text></TouchableOpacity>
                                        </View>


                                    </View>
                                    :
                                    null
                                }
                                {this.state.isSupport ?
                                    <View >
                                        <View style={styles.sectionContainer}>
                                            <View style={styles.otherInfo}>
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate('About') }}><Image source={require('../../assets/img/about.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>About Us</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate('Terms') }}><Image source={require('../../assets/img/T&C.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Terms and Conditions</Text></TouchableOpacity>
                                                {/* <TouchableOpacity style={styles.serviceSupport}><Image source={require('../../assets/img/support.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Support</Text></TouchableOpacity> */}
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate("Policy") }}><Image source={require('../../assets/img/policy.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Privacy Policy</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                                }

                            </View>

                        </ScrollView>
                    </View>
                    :
                    <View style={styles.mainContent}>
                        <ScrollView style={styles.listContainer}>
                            <View style={styles.sectionContainer}>
                                <View style={styles.accountHeader}>
                                    <TouchableOpacity style={styles.accountHeaderTab} onPress={this.changeTab1.bind(this)}>
                                        <Text style={this.state.isAccount ? styles.activeHeaderText : styles.accountHeaderText}>Account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.accountHeaderTab} onPress={this.changeTab1.bind(this)}>
                                        <Text style={this.state.isSupport ? styles.activeHeaderText : styles.accountHeaderText}>Support</Text>
                                    </TouchableOpacity>
                                </View>

                                {this.state.isAccount ?
                                    <View >
                                        <View style={styles.profileSection}>
                                            <View style={styles.profileImage}>
                                                <View style={styles.userImage}>
                                                    {
                                                        this.props.getSeller.data.profile ? <Image source={{ uri: this.props.getSeller.data.profile }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                            :
                                                            <Image source={require('../../assets/img/userProfile.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                    }

                                                </View>
                                                <TouchableOpacity style={styles.addImage} onPress={this.updateSeller.bind(this)}>
                                                    <Image source={require('../../assets/img/plus_icon.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                </TouchableOpacity>
                                                <Text style={styles.userName}>{this.props.getSeller.data.display_name}</Text>
                                                <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>{this.props.loginStatus.data.email} | {this.props.loginStatus.data.phone_no}</Text>
                                                {this.props.getSeller ? <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}>Seller ID {this.props.getSeller.data.seller_id} | Joined in {moment(this.props.getSeller.data.created_at).format('MMMM')},{moment(this.props.getSeller.data.created_at).format('YYYY')}</Text> : null}
                                            </View>

                                        </View>
                                        <View style={styles.otherInfo}>
                                            <Text style={styles.otherHeader}><Text style={{ fontSize: 16, fontFamily: 'Poppins-Meddium', fontWeight: 'bold', paddingLeft: normalize(16), textTransform: 'capitalize' }}>Seller Level - <Text style={{ fontWeight: 'normal' }}>{this.state.sellerLeveL}</Text></Text></Text>
                                            <View style={[styles.serviceLevel, { flexDirection: 'row' }]}>
                                                <Text style={{ paddingHorizontal: normalize(8) }}>Status</Text>
                                                <RadioForm
                                                    radio_props={radio_props}
                                                    initial={0}
                                                    buttonSize={12}
                                                    buttonColor={'#525252'}
                                                    onPress={(value) => {
                                                        this.setState({ value: value })
                                                    }
                                                    }
                                                    formHorizontal={true}
                                                    labelStyle={{ paddingHorizontal: 10, color: 'gray' }}
                                                /></View>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.addService.bind(this)}><Image source={require('../../assets/img/add.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Add Services</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.MyService.bind(this)}><Image source={require('../../assets/img/ser.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>My Services</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.myEarnings.bind(this)}><Image source={require('../../assets/img/earnings.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Your Earnings</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={() => { this.props.navigation.navigate("EditSeller1") }}><Image source={require('../../assets/img/user.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Edit Profile</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.serviceLevel} onPress={this.logout.bind(this)}><Image source={require('../../assets/img/logout.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Logout</Text></TouchableOpacity>
                                        </View>


                                    </View>
                                    :
                                    null
                                }
                                {this.state.isSupport ?
                                    <View >
                                        <View style={styles.sectionContainer}>
                                            <View style={styles.otherInfo}>
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate('About') }}><Image source={require('../../assets/img/about.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>About Us</Text></TouchableOpacity>
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate('Terms') }}><Image source={require('../../assets/img/T&C.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Terms and Conditions</Text></TouchableOpacity>
                                                {/* <TouchableOpacity style={styles.serviceSupport}><Image source={require('../../assets/img/support.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Support</Text></TouchableOpacity> */}
                                                <TouchableOpacity style={styles.serviceSupport} onPress={() => { this.props.navigation.navigate("Policy") }}><Image source={require('../../assets/img/policy.png')} style={{ width: 30, height: 30 }} /><Text style={styles.serviceText}>Privacy Policy</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                                }

                            </View>

                        </ScrollView>
                    </View>
                }
                <Modal visible={this.state.emailModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={styles.modalcontainer}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(15), fontFamily: 'Poppins-Medium' }]}>Update Email Address</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ emailModal: !this.state.emailModal }) }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.inputStyle}>

                            <TextInput style={styles.input}
                                placeholder={'Email'}
                                placeholderTextColor="#767676"
                                onChangeText={(email) => { this.setState({ email }) }}
                                value={this.state.email}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.updateProfile.bind(this)}>

                            <Text style={styles.buttonText}>Update</Text>

                        </TouchableOpacity>

                    </View>
                </Modal>

                <Modal visible={this.state.phoneModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={styles.modalcontainer}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(15), fontFamily: 'Poppins-Medium' }]}>Update Phone Address</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ phoneModal: !this.state.phoneModal }) }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.inputStyle}>

                            <TextInput style={styles.input}
                                placeholder={'Phone'}
                                placeholderTextColor="#767676"
                                onChangeText={(phone_no) => { this.setState({ phone_no }) }}
                                value={this.state.phone_no}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.updateProfile.bind(this)}>

                            <Text style={styles.buttonText}>Update</Text>

                        </TouchableOpacity>

                    </View>
                </Modal>


                <Modal visible={this.state.userNameModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={styles.modalcontainer}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(15), fontFamily: 'Poppins-Medium' }]}>Update User Name</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ userNameModal: !this.state.userNameModal }) }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.inputStyle}>
                            <TextInput style={styles.input}
                                placeholder={'UserName'}
                                placeholderTextColor="#767676"
                                value={this.state.userName}
                                onChangeText={(userName) => { this.setState({ userName: userName }) }}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.updateProfile.bind(this)}>

                            <Text style={styles.buttonText}>Update</Text>

                        </TouchableOpacity>

                    </View>
                </Modal>

                <Modal visible={this.state.passwordModal} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={styles.modalcontainer}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(15), fontFamily: 'Poppins-Medium' }]}>Update Phone Address</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ passwordModal: !this.state.passwordModal }) }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.inputStyle}>

                            <TextInput style={styles.input}
                                placeholder={'Change Password'}
                                placeholderTextColor="#767676"
                                onChangeText={(password) => { this.setState({ password }) }}
                            //value={this.state.password}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.updateProfile.bind(this)}>

                            <Text style={styles.buttonText}>Update</Text>

                        </TouchableOpacity>

                    </View>
                </Modal>


            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Account)