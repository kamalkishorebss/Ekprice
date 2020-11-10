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
    return state
}


class SubCategories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sub_catList: [],
            services: [],
            islist: false,
            catName: '',
            hvError: 'Please wait ...'
        }
    }

    componentDidMount() {
        console.log('fdddddddddd', this.props.navigation.getParam("cat_id").SUBCATEGORIES)
        this.setState({ sub_catList: this.props.navigation.getParam("cat_id").SUBCATEGORIES })
    }

    goToDetail(e, name) {
        console.log(e, name, `https://www.ekprice.com/api/subcategoryservices/${e}`)
        this.setState({ catName: name })
        fetch(`https://www.ekprice.com/api/subcategoryservices/${e}`).then((response) => response.json()).then((json) => {
            console.log("HHHRGFGGGGFG", json)
            if (json.SERVICES.length > 0) {
                this.setState({ islist: true, services: json.SERVICES })
            } else {
                this.setState({ islist: true, hvError: 'No Service Found' })
            }


        })
    }

    goToServiceDetail(id) {
        this.props.navigation.navigate('ServiceDetail', { 'serviceId': id });
    }


    render() {

        return (
            <View style={styles.container}>
                {this.state.islist == true ?
                    <View>
                        <BasicHeader {...this.props} title={this.state.catName} />
                        <View style={styles.mainContent}>
                            <ScrollView style={styles.listContainer}>
                                <View style={styles.sectionContainer}>
                                    {this.state.services && this.state.services.length > 0 ?
                                        <FlatList
                                            data={this.state.services}
                                            keyExtractor={(data, index) => index.toString()}
                                            renderItem={({ item, index }) => (

                                                <TouchableOpacity style={styles.miniDrawItem} onPress={this.goToServiceDetail.bind(this, item.id)} key={`service_${index}`}>

                                                    <View style={{ width: '35%' }}>
                                                        <View style={styles.imageWrapper}>
                                                            <Image source={{ uri: item.image }} style={styles.serviceImage} />
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '65%', padding: normalize(5), paddingLeft: normalize(20) }}>
                                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                                            <View style={{ width: '50%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', }}>
                                                                <View style={{ width: '20%', }}>
                                                                    <Image source={{ uri: item.seller_data.profile }} style={{ width: 20, height: 20, borderRadius: 50 }} />
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
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                            }
                                        />
                                        :
                                        <View style={{ paddingTop: 250, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.catNameText}>{this.state.hvError}</Text>
                                        </View>
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    :
                    <View>
                        <BasicHeader {...this.props} title={this.props.navigation.getParam("cat_id").cat_title} />
                        <View style={styles.mainContent}>
                            <ScrollView style={styles.listContainer}>
                                <View style={styles.sectionContainer}>
                                    {
                                        this.state.sub_catList.map((item, index) => {
                                            return (
                                                <TouchableOpacity style={styles.catItem} key={`cat_${index}`} onPress={this.goToDetail.bind(this, item.subcat_id, item.subcat_title)}>
                                                    <View style={styles.catImage}>
                                                        <Image source={{ uri: item.ig_image }} style={{ width: 60, height: 60 }} />
                                                    </View>
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text style={styles.catNameText}>{item.subcat_title} </Text>
                                                        {/* <Text style={styles.typeCarText} numberOfLines={1}>25 Logos in listings</Text> */}
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </View>


                }
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories)