//check login before going to place order on service detail page


import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions

} from 'react-native'
import FastImage from 'react-native-fast-image';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
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
import {
    normalize
} from '../../helpers'
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return { loginStatus: state.common.loginStatus }
}


class ServiceDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            service: '',
            services: [],
            isBasic: true,
            isSTD: false,
            isPre: false,
            skillsList: [],
            level: '',
            sellerDetail: '',
            sellerRating: '',
            spinner: false,
            hvError: "Please wait ...",
            standardP: '',
            professionalP: '',
            pkgName: 'Basic',
            serviceImage: ''




        }



    }

    componentDidMount() {

        this.setState({ spinner: true })
        this.props.allActions.getServiceDetail(this.props.navigation.getParam('serviceId')).then(res => {
            console.log('service', res);
            this.setState({ spinner: false })
            if (res.status == true) {

                this.setState({
                    service: res.SERVICES,
                    serviceImage: res.SERVICES.image,
                    standardP: res.SERVICES.standard,
                    professionalP: res.SERVICES.professional,
                    sellerRating: res.SERVICES.seller_rating,
                    level: res.SERVICES.basic,
                    sellerDetail: res.SERVICES.seller_data
                })
                this.props.allActions.getServiceBySaller(res.SERVICES.seller_data.seller_id).then(res => {
                    console.log('sellers services', res);
                    if (res.code == 200) {
                        this.setState({ services: res.data })
                    } else {
                        this.setState({ hvError: "No service found" })
                    }
                })
            } else {
                //alert("Network Error")
            }

        })



    }

    goToModal() {
        this.setState({ isModalVisible: true })
    }
    goToSubList(e) {
        this.props.navigation.navigate('SubCategories', { 'cat_id': this.props.navigation.getParam('cat_id') });
    }

    changeTab(e) {
        if (e == 'Basic') {
            this.setState({ pkgName: e, isBasic: true, isPre: false, isSTD: false, level: this.state.service.basic })
        }
        if (e == 'Standard') {
            this.setState({ pkgName: e, isBasic: false, isSTD: !this.state.isSTD, isPre: false, level: this.state.service.standard })
        }
        if (e == 'Premium') {
            this.setState({ pkgName: e, isBasic: false, isPre: true, isSTD: false, level: this.state.service.professional })
        }

    }
    changeImage(img) {
        this.setState({ serviceImage: img })

    }
    renderFiles = (e) => {
        {
            ["e", "f"].map((data, index) => {
                return (
                    <Text key={`o/p_${index}`}>{data}</Text>
                )
            })
        }
    }

    prodceedToPay(level) {

        if (this.props.loginStatus == '') {
            this.props.navigation.navigate('Login')
        } else {
            if (level) {
                this.props.navigation.navigate("UserOrderReview", { 'orderReview': this.state.service, "package": level, 'package_Name': this.state.pkgName })
            }
        }
    }





    render() {
        const { service } = this.state;
        let image = this.state.service.image;
        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={'Service Details'} />
                <View style={styles.mainContent}>
                    <Spinner visible={this.state.spinner} color='red' overlayColor='rgba(255, 255, 255, .9)' />
                    <ScrollView style={styles.listContainer}>
                        {this.state.serviceImage && this.state.serviceImage.substring(this.state.serviceImage.lastIndexOf(".")) == ".mp4" && this.state.serviceImage.substring(this.state.serviceImage.lastIndexOf(".")) == ".mp3" ?
                            <View style={styles.imageContainer}>
                                {/* <VLCPlayer
                                    ref={(ref) => (this.vlcPlayer = ref)}
                                    style={{ width: '100%', height: 200 }}
                                    videoAspectRatio="16:9"
                                    onBuffering={this.onBuffer}
                                    onError={this.videoError}
                                    source={{
                                        uri: this.state.serviceImage
                                    }}
                                /> */}
                                <VideoPlayer
                                    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                                    videoWidth={1600}
                                    videoHeight={900}
                                    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                                />
                            </View>
                            :
                            <View style={styles.imageContainer}>
                                <View style={{ width: '100%', height: '100%' }}>
                                    <FastImage
                                        style={styles.backImage}
                                        source={{
                                            uri: this.state.serviceImage,
                                            headers: { Authorization: '9876543210' },
                                            priority: FastImage.priority.high,
                                        }}
                                    />
                                    {/* <Image source={{ uri: this.state.serviceImage }} style={styles.backImage} resizeMode={'cover'} /> */}
                                </View>
                            </View>
                        }

                        <View style={styles.previewListContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.state.service.portfolio && this.state.service.portfolio.length > 0 && this.state.service.portfolio.map((item, index) => {
                                    return (
                                        <View>
                                            {item ?
                                                <TouchableOpacity style={styles.previewImageItem} key={`mini_image_${index}`} onPress={this.changeImage.bind(this, item)}>
                                                    {item && item.substring(item.lastIndexOf(".")) == ".mp4" && item.substring(item.lastIndexOf(".")) == ".mp3" ?
                                                        <VLCPlayer
                                                            ref={(ref) => (this.vlcPlayer = ref)}
                                                            style={{ width: '100%', height: 200 }}
                                                            videoAspectRatio="16:9"
                                                            onBuffering={this.onBuffer}
                                                            onError={this.videoError}
                                                            source={{
                                                                uri: item
                                                            }}
                                                        />
                                                        :
                                                        <FastImage
                                                            style={styles.previewImage}
                                                            source={{
                                                                uri: item,
                                                                headers: { Authorization: '9876543210' },
                                                                priority: FastImage.priority.high,
                                                            }}
                                                        />


                                                    }
                                                </TouchableOpacity>
                                                :
                                                null
                                            }
                                        </View>
                                    )
                                })
                                }
                            </ScrollView>
                        </View>

                        <View style={styles.bannerContent}>
                            {/* <Text style={styles.descText}>{image}</Text> */}
                            <Text style={styles.descText}>{this.state.service.title}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: normalize(15), paddingVertical: normalize(10) }}>
                            <View style={{ width: '8%' }}><Image source={require('../../assets/img/star.png')} style={{ width: 30, height: 30 }} /></View>
                            <View style={{ width: '10%' }}><Text style={{ textAlign: 'center', color: '#000', fontSize: normalize(18), fontFamily: 'Poppins-Meduim', fontWeight: 'bold' }}>{this.state.service.service_rating}</Text></View>
                            <View style={{ width: '10%' }}><Text>({this.state.service.number_of_service_rating})</Text></View>
                            <View style={{ width: '72%' }}>
                                {/*<Text style={{ textAlign: 'right', color: '#DB0A23', fontSize: normalize(12), fontFamily: 'Poppins-Meduim' }} onPress={() => { this.props.navigation.navigate("WriteReviews") }}>Write A Review</Text>*/}
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', marginLeft: 'auto', marginRight: 'auto', paddingVertical: 10 }}>
                            <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                <View style={{ width: '15%', alignSelf: 'center', alignItems: 'center' }}>
                                    {this.state.sellerDetail.profile ? <Image source={{ uri: this.state.sellerDetail.profile }} style={{ width: 35, height: 35, borderRadius: 50 }} />
                                        :
                                        <Image source={require('../../assets/img/userProfile.png')} style={{ width: 35, height: 35, borderRadius: 50 }} />
                                    }
                                </View>
                                <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                    <Text style={styles.ReviewNameText}>  {this.state.sellerDetail.display_name} <Text style={{ color: '#59BD5A', fontSize: 8, textTransform: 'capitalize' }}>({this.state.sellerDetail.level_type})</Text></Text>
                                    <Text style={styles.view} onPress={this.goToModal.bind(this)}>  View More</Text>
                                </View>
                                <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={styles.sellerBtn}>
                                        <Text style={styles.sellerBtnText}>Chat Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={{ marginHorizontal: normalize(10), fontFamily: 'Poppins-SemiBold', fontSize: normalize(14) }}>My Skills</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.state.service.skills && this.state.service.skills.length > 0 && this.state.service.skills.map((item, index) => {
                                    return (
                                        <View style={{ width: normalize(100), marginLeft: normalize(5), paddingTop: normalize(5) }} key={`skills_${index}`}><Text style={styles.skills} >{item}</Text></View>
                                    )
                                })
                                }
                            </ScrollView>
                            <Text style={{ margin: normalize(10), fontFamily: 'Poppins-SemiBold', fontSize: normalize(12) }}>Service Description</Text>

                            <View style={{ marginHorizontal: normalize(9) }}>
                                <HTML html={this.state.service.details} baseFontStyle={{ fontFamily: 'Poppins-Regular', fontSize: normalize(12) }} />
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#F2F4F6' }}>
                            <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Basic")}>
                                {this.state.isBasic ?
                                    <Text style={[styles.contentText, { color: '#59BD5A' }]}>Basic</Text>
                                    :
                                    <Text style={styles.contentText}>Basic</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.standardP.price ?
                                    <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Standard")}>
                                        {this.state.isSTD ?
                                            <Text style={[styles.contentText, { color: '#59BD5A' }]}>Standard</Text>
                                            :
                                            <Text style={styles.contentText}>Standard</Text>
                                        }
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.tabs}></TouchableOpacity>
                            }
                            {this.state.professionalP.price ?
                                <TouchableOpacity style={styles.tabs} onPress={this.changeTab.bind(this, "Premium")}>
                                    {this.state.isPre ?
                                        <Text style={[styles.contentText, { color: '#59BD5A' }]}>Premium</Text>
                                        :
                                        <Text style={styles.contentText}>Premium</Text>
                                    }
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.tabs}></TouchableOpacity>
                            }
                        </View>
                        <View style={styles.includedService}>
                            <Text style={{ paddingVertical: normalize(5), fontSize: normalize(10), fontFamily: 'Poppins-SemiBold' }}>The Service Includes</Text>

                            {this.state.level.features && this.state.level.features.length > 0 ? <FlatList
                                data={this.state.level.features}
                                keyExtractor={(items, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View>
                                        {item ? <Text style={styles.includedText} key={`feature_${index}`}> <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {item}</Text>
                                            :
                                            null
                                        }
                                    </View>
                                )}
                            />
                                :
                                null}
                            {this.state.level.service_includes && this.state.level.service_includes.length > 0 ? <FlatList
                                data={this.state.level.service_includes}
                                keyExtractor={(items, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <View>
                                        {item ? <Text style={styles.includedText} key={`SS_${index}`}> <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {item}</Text>
                                            :
                                            null
                                        }
                                    </View>
                                )}
                            />
                                :
                                null}
                            {this.state.level.output_files && this.state.level.output_files.length > 0 ? <Text style={styles.includedText}> <Image source={require('../../assets/img/green_tick.png')} style={{ width: 18, height: 18 }} />  {this.state.level.output_files}</Text>
                                :
                                null
                            }
                            <Text style={styles.includedText}> <Image source={require('../../assets/img/send.png')} style={{ width: 18, height: 18 }} />  Delivery Days : {this.state.level.delivered_in ? this.state.level.delivered_in : 'N/A'}</Text>
                            <Text style={styles.includedText}> <Image source={require('../../assets/img/arrow_circle.png')} style={{ width: 18, height: 18 }} />  Revisions     : {this.state.level.number_of_revisions ? this.state.level.number_of_revisions : 'N/A'}</Text>

                        </View>


                        <TouchableOpacity style={styles.button} onPress={this.prodceedToPay.bind(this, this.state.level)}>

                            <Text style={styles.buttonText}>Proceed To Pay ₹ {this.state.level.price}</Text>

                        </TouchableOpacity>
                        <View style={styles.ReviewsContainer}>
                            <View style={{ flexDirection: 'row', marginHorizontal: normalize(5), }}>
                                <View><Text>Reviews from customers</Text></View>
                                <View><Image source={require('../../assets/img/upward-icon.png')} style={{ width: 30, height: 30 }} /></View>
                            </View>

                            <View style={{ flexDirection: 'row', marginHorizontal: normalize(5), }}>
                                <View style={styles.commBox}><Text style={styles.boxText}>Quality</Text></View>
                                <View style={styles.barBox}>
                                    <Progress.Bar progress={this.state.service.quality_rating} width={130} color={'#FFBE2C'}
                                        unfilledColor={'#EAEAE7'}
                                        borderWidth={0}
                                        borderRadius={0} />
                                </View>
                                <View style={styles.pointBox}><Text style={styles.boxText}>{this.state.service.quality_rating}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: normalize(5), }}>
                                <View style={styles.commBox}><Text style={styles.boxText}>Delivery</Text></View>
                                <View style={styles.barBox}>
                                    <Progress.Bar progress={this.state.service.delivery_rating} width={130} color={'#FFBE2C'}
                                        unfilledColor={'#EAEAE7'}
                                        borderWidth={0}
                                        borderRadius={0} />
                                </View>
                                <View style={styles.pointBox}><Text style={styles.boxText}>{this.state.service.delivery_rating}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: normalize(5), }}>
                                <View style={styles.commBox}><Text style={styles.boxText}>Responsive</Text></View>
                                <View style={styles.barBox}>
                                    <Progress.Bar progress={this.state.service.response_rating} width={130} color={'#FFBE2C'}
                                        unfilledColor={'#EAEAE7'}
                                        borderWidth={0}
                                        borderRadius={0} />
                                </View>
                                <View style={styles.pointBox}><Text style={styles.boxText}>{this.state.service.response_rating}</Text></View>
                            </View>

                        </View>
                        <FlatList
                            data={this.state.service.user_data}
                            keyExtractor={(items, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.sectionContainer} key={`users_${index}`}>
                                    <View style={{ flexDirection: 'row', padding: normalize(15) }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            {item.user_profile_pic ?
                                                <Image source={{ uri: item.user_profile_pic }} style={{ width: 30, height: 30, borderRadius: 50 }} />
                                                :
                                                <Image source={require('../../assets/img/userProfile.png')} style={{ width: 30, height: 30, borderRadius: 50 }} />
                                            }
                                        </View>
                                        <View style={{ alignSelf: 'center', paddingLeft: normalize(15) }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={{ fontFamily: 'Poppins-Regular', width: '50%', fontSize: 13 }}>{item.user_name}</Text>
                                                <View style={{ flexDirection: 'row', width: '48%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 10 }}><Image source={require('../../assets/img/star.png')} style={{ width: 20, height: 20 }}></Image><Text>{item.user_rating}</Text></View>
                                            </View>

                                            {/* <Text style={{ fontFamily: 'Poppins-Regular' }}>{item.user_lastvisitDate}</Text> */}
                                        </View>
                                    </View>
                                    <Text style={{ margin: normalize(10), fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.user_comment}</Text>
                                </View>
                            )}
                        />
                        {this.state.service.user_data ?
                            <TouchableOpacity style={styles.buttonViewAll}>

                                <Text style={styles.buttonViewText}>Show All</Text>

                            </TouchableOpacity>
                            :
                            null
                        }
                        <View style={styles.sectionContainer}>
                            <View style={styles.dividerContainer}>
                                <Text style={styles.headerText}><Text style={{ color: '#333333' }}>Other Services By Seller</Text></Text>
                            </View>
                            <View style={styles.sectionContent}>

                                {this.state.services.length > 0 ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                                    :
                                    <Text>{this.state.hvError}</Text>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal visible={this.state.isModalVisible} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '90%', height: '90%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>
                        <ScrollView>
                            <View style={styles.modalcontainer}>
                                <View style={{ width: '80%' }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(16), fontFamily: 'Poppins-Medium' }]}>{this.state.sellerDetail.display_name}</Text>
                                </View>
                                <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible, newImage: [] }) }}>
                                        <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.modalcontainer, { flexDirection: 'column' }]}>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ width: '70%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', }}>
                                        <View style={{ width: '20%', }}>
                                            {this.state.sellerDetail.profile ?
                                                <Image source={{ uri: this.state.sellerDetail.profile }} style={{ width: 30, height: 30, borderRadius: 50 }} />
                                                :
                                                <Image source={require('../../assets/img/userProfile.png')} style={{ width: 30, height: 30, borderRadius: 50 }} />
                                            }
                                        </View>
                                        <View style={{ width: '80%', alignItems: 'flex-start' }}>
                                            <Text style={styles.ReviewNameText}> {this.state.sellerDetail.display_name} <Text style={{ color: '#59BD5A', fontSize: 8, textTransform: 'capitalize' }}>({this.state.sellerDetail.level_type})</Text></Text>
                                        </View>


                                    </View>

                                    <View style={{ width: '30%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', }}>
                                        <View style={{ width: '80%', alignItems: 'flex-end' }}>
                                            <Image source={require('../../assets/img/star.png')} style={{ width: 20, height: 20, borderRadius: 50 }} />
                                        </View>
                                        <View style={{ width: '20%' }}>
                                            <Text style={styles.ReviewNameText}> {this.state.sellerRating}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={{ flexDirection: 'row' }}>
                                <View style={styles.infoBox}>
                                    <Text>Quality (0/0)</Text>
                                </View>
                                <View style={styles.infoBox}>
                                    <Text>Deleviry (0/0)</Text>
                                </View>
                            </View> */}
                                <Text style={styles.aboutLabel}>About</Text>
                                <Text style={styles.aboutText}>{this.state.sellerDetail.individual_about_yourself}</Text>

                            </View>
                            <View style={[styles.modalcontainer, { flexDirection: 'column' }]}>
                                <Text style={styles.infoText}>Information</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.infoBox}>
                                        <Text style={styles.infoLabel}>Location</Text>
                                        <Text style={styles.infoLabelText}>{this.state.sellerDetail.city}, {this.state.sellerDetail.country}</Text>

                                    </View>

                                    <View style={styles.infoBox}>

                                        <Text style={styles.infoLabel}>Member Since</Text>
                                        <Text style={styles.infoLabelText}>{moment(this.state.sellerDetail.joined_date).format('DD-MM-YYYY')}</Text>

                                    </View>

                                </View>
                                <Text style={styles.infoLabel}>Average Response Time</Text>
                                <Text>{this.state.sellerDetail.average_response_time}</Text>
                            </View>

                            <View style={[styles.modalcontainer, { flexDirection: 'column' }]}>
                                <Text style={styles.infoText}>Languages</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.langaugeBox}>
                                        <Text style={styles.infoLabel}>{this.state.sellerDetail.language1}</Text>
                                        <Text style={styles.infoLabelText}>{this.state.sellerDetail.expertise_level_1}</Text>
                                    </View>

                                    <View style={styles.langaugeBox}>
                                        <Text style={styles.infoLabel}>{this.state.sellerDetail.language2}</Text>
                                        <Text style={styles.infoLabelText}>{this.state.sellerDetail.expertise_level_2}</Text>
                                    </View>

                                    <View style={styles.langaugeBox}>
                                        <Text style={styles.infoLabel}>{this.state.sellerDetail.language3}</Text>
                                        <Text style={styles.infoLabelText}>{this.state.sellerDetail.expertise_level_2}</Text>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail)