import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Dimensions
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
import Video from 'react-native-video';
const { height, width } = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';
import { isTemplateElement } from '@babel/types';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return state
}


class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            service: [],
            isModalVisible: false,
            isVideo: false,
            video: null,
            hvError: "please wait ..."
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if (this.props.navigation.getParam('filter')) {
                if (this.props.navigation.getParam('filter').data.length > 0) {
                    console.log('fffff', this.props.navigation.getParam('filter').data)
                    this.setState({ service: this.props.navigation.getParam('filter').data })
                } else {
                    this.setState({ service: [], hvError: 'No service found' })
                }
            }

            if (this.props.navigation.getParam('reset') == 1) {
                this.props.allActions.getServicebyID(this.props.navigation.getParam('cat_id').cat_id).then(res => {
                    console.log('liund', res);
                    if (res.status == true) {
                        this.setState({ service: res.SERVICES })
                    } else {
                        alert("Network Error")
                    }

                })
            } else {
                this.props.allActions.getServicebyID(this.props.navigation.getParam('cat_id').cat_id).then(res => {
                    console.log('liund', res);
                    if (res.status == true) {
                        this.setState({ service: res.SERVICES })
                    } else {
                        alert("Network Error")
                    }

                })
            }

        
            this.props.allActions.recentService().then(res => {
                // console.log('upcoming',res);
                if (res.status == true) {

                    this.setState({ services: res.recent_services })


                } else {
                    //alert("Network Error")
                }

            })
        })

}

goToDetail(id) {
    this.props.navigation.navigate('ServiceDetail', { 'serviceId': id, 'vid': 'https://www.ekprice.com/public/storage/service/1588781530.mp4' });
}
goToSubList(e) {
    this.props.navigation.navigate('SubCategories', { 'cat_id': this.props.navigation.getParam('cat_id') });
}

goToModal() {
    this.setState({ isModalVisible: true })
}
render() {
    let url = 'https://www.ekprice.com/public/storage/service/1588781530.mp4'
    return (
        <View style={styles.container}>
            <NormalHeader {...this.props} title={this.props.navigation.getParam('cat_id')} />
            <View style={styles.mainContent}>
                <ScrollView style={styles.listContainer}>

                    <View style={styles.imageContainer}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image source={require('../../assets/img/2nd-banner.jpeg')} style={styles.backImage} resizeMode="contain" />

                        </View>
                    </View>

                    <View style={styles.bannerContent}>
                        <Text style={styles.descText}>{this.props.navigation.getParam('cat_id').cat_description}</Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <View style={styles.sub_section}>
                            <Text style={styles.subLeft}>Show By</Text>
                            <Text style={styles.subRight} onPress={this.goToSubList.bind(this)}> <Image source={require('../../assets/img/list.png')} style={{ width: 20, height: 20, borderRadius: 50 }} />  Sub Categories</Text>
                        </View>
                        {this.state.service.length > 0 ?
                            <FlatList
                                data={this.state.service}
                                keyExtractor={(data, index) => index.toString()}
                                renderItem={({ item, index }) => (

                                    <TouchableOpacity style={styles.miniDrawItem} >



                                        <View style={{ width: '40%' }}>
                                            {item.image.substring(item.image.lastIndexOf(".")) == ".mp4" ?

                                                <TouchableOpacity style={[styles.imageWrapper, { backgroundColor: '#000' }]} onPress={() => { this.props.navigation.navigate('VideoPlay', { 'video': item.image }) }}>
                                                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: "#CED3DB", justifyContent: 'center', alignItems: 'center' }}>
                                                        {/* <VLCPlayer
                                                            ref={(ref) => (this.vlcPlayer = ref)}
                                                            style={{ width: '100%', height: 120 }}
                                                            videoAspectRatio="14:6"
                                                            onBuffering={this.onBuffer}
                                                            onError={this.videoError}
                                                            source={{
                                                                uri: item.image
                                                            }}
                                                            

                                                        //autoplay={false}
                                                        /> */}
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View style={styles.imageWrapper}>
                                                    <View style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: "#CED3DB" }}>
                                                        <Image source={{ uri: item.image }} style={styles.serviceImage} resizeMode="center" />
                                                    </View>
                                                </View>
                                            }
                                        </View>

                                        <TouchableOpacity style={{ width: '60%', paddingLeft: normalize(20), padding: 3 }} onPress={this.goToDetail.bind(this, item.id)} key={`service_${index}`}>
                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                                <View style={{ width: '50%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', }}>
                                                    <View style={{ width: '20%', }}>
                                                        {item.seller_data && item.seller_data.profile != '' ?
                                                            <Image source={{ uri: item.seller_data.profile }} style={{ width: 20, height: 20, borderRadius: 50 }} />
                                                            :
                                                            <Image source={require('../../assets/img/userProfile.png')} style={{ width: 20, height: 20, borderRadius: 50 }} />
                                                        }
                                                    </View>
                                                    <View style={{ width: '80%', alignItems: 'flex-start' }}>
                                                        <Text style={styles.ReviewNameText} numberOfLines={1}> {item.seller_data.display_name}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', }}>
                                                    <View style={{ width: '70%', alignItems: 'flex-end' }}>
                                                        <Image source={require('../../assets/img/star.png')} style={{ width: 20, height: 20, borderRadius: 50 }} />
                                                    </View>
                                                    <View style={{ width: '30%' }}>
                                                        <Text style={styles.ReviewNameText}> {item.reviews}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <Text style={styles.reviewText} numberOfLines={2}>{item.title}</Text>
                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', paddingTop: 8 }}>
                                                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                                    <Text style={[styles.priceText, { textAlign: 'left', paddingTop: 4 }]}>Starting At</Text>
                                                </View>
                                                <View style={{ width: '30%' }}>
                                                    <Text style={[styles.ReviewNameText, { color: 'green', fontSize: 12, fontFamily: 'Poppins-SemiBold' }]}> Rs {item.price}</Text>
                                                </View>
                                                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableOpacity style={styles.sellerBtn}>
                                                        <Text style={styles.sellerBtnText}>Chat Now</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                                }
                            />
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <Text>{this.state.hvError}</Text>
                            </View>
                        }


                    </View>
                </ScrollView>
            </View>

        </View>
    )

}

}

export default connect(mapStateToProps, mapDispatchToProps)(Category)