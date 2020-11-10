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
    return state
}


class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            service: [],
            isModalVisible: false,
            hvError:'Please wait ...',
            keyword : ''
        }
    }

    componentDidMount() {

        
        this.props.allActions.getSearchResult(this.props.navigation.getParam('keyword')).then(res => {
            // console.log('upcoming',res);
            if (res.code == 200) {
                if (res.data.length>0){
                   this.setState({ service: res.data })
                }else{
                   this.setState({ hvError: 'No Service Found' })
                }
      
            } else {
                this.setState({ hvError: 'No Service Found' })
            }
      
          })

     }

    goToDetail(id) {
        this.props.navigation.navigate('ServiceDetail',{'serviceId' : id});
    }
    goToSubList(e){
       this.props.navigation.navigate('SubCategories',{'cat_id':this.props.navigation.getParam('cat_id')});
    }

    goToModal() {
        this.setState({ isModalVisible: true })
    }
    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Search Page"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>

                        
                       {this.state.service.length>0? <View style={styles.sectionContainer}>
                            
                            
                               <FlatList
                               data={this.state.service}
                               keyExtractor={(data, index) => index.toString()}
                               renderItem={({ item, index }) => (
                                   
                                        <TouchableOpacity style={styles.miniDrawItem} onPress={this.goToDetail.bind(this, item.id)} key={`service_${index}`}>



                                            <View style={{width: '40%'}}>
                                                <View style={styles.imageWrapper}>
                                                    <View style={{width:'100%',height:'100%'}}>
                                                        <Image source={{uri : item.service_image}} style={styles.serviceImage} resizeMode="cover"/>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: '60%', padding: normalize(5), paddingLeft: normalize(20) }}>
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                                    <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', }}>
                                                        <View style={{ width: '20%',}}>
                                                          <Image source={{uri : item.seller_image}} style={{ width: 20, height: 20, borderRadius: 50 }} />
                                                        </View>
                                                        <View style={{ width: '80%',alignItems:'flex-start'}}>
                                                          <Text style={styles.ReviewNameText} numberOfLines={1}> {item.seller_name}</Text>
                                                        </View>
                                                    </View>

                                                   
                                                </View>
                                                <Text style={styles.reviewText} numberOfLines={2}>{item.service_title}</Text>
                                                <Text style={[styles.priceText, { textAlign: 'left',paddingTop:8 }]}>Starting At
                                                <Text style={{ color: '#59BD5A', fontSize: normalize(12), fontFamily: 'Poppins-Medium', textAlign: 'right',textTransform:'capitalize' }}>   {'\u20A8'} {item.service_price}</Text>
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                               }
                               />


                        </View>
                        :
                        
                          <View style={{paddingTop:'50%',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.ReviewNameText}>{this.state.hvError}</Text>
                          </View>
                           
                       
                        }
                    </ScrollView>
                </View>
                
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)