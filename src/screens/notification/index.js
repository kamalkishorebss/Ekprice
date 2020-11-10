import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper'
import moment from "moment";
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


import AsyncStorage from '@react-native-community/async-storage';

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.common.loginStatus,
        getProfile : state.common.getProfile,
        getSeller: state.common.getSeller,
        checkBtn   : state.common.checkBtn  
    }
}


class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            NN: [],
            user_id:'',
            type :'',
            hvError : 'Please wait ...'
        }



    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getKey();
        });
      
    }
    

    async getKey() {
        const value = await AsyncStorage.getItem('currentUser');
        console.log('gggggg', value);
        if (value == null) {
            this.props.navigation.navigate("Login");
        } else {
            this.props.navigation.navigate("Notification");
            this.getNotification();
        }
    }

    getNotification(){
        if(this.props.checkBtn ==1){
            this.setState({user_id:this.props.getProfile.user_id,type:"user"})
        }
        if(this.props.checkBtn ==2){
            this.setState({user_id:this.props.getSeller.data.seller_id,type:"seller"})
        }
        this.props.allActions.getNotification(this.state.user_id,this.state.type).then(res=>{
            console.log("res",res)
            if(res.status == true && res.data.length>0){
              this.setState({NN : res.data})
            }else{
                this.setState({hvError:"No notification found"})
            }
        }).catch(err=>{
            this.setState({hvError:"No notification found"})
        })
    }


    goToDetail(){
        alert("hello")
    }

    render() {

        return (
            <View style={styles.container}>
                <Header {...this.props} title={"Notificaton"} />
                {this.state.NN && this.state.NN.length>0?
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                       
                        <View style={styles.sectionContainer}>
                            {
                                this.state.NN.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.catItem}   key={`NN_${index}`}>
                                            
                                           
                                            <View style={styles.miniDrawTagWrapper}>
                                               
                                                <Text style={styles.catNameText}>{item.type}</Text>
                                                <Text style={styles.typeCarText} numberOfLines={1}>{moment(item.created_at).format('lll')}</Text>
                                           
                                               </View>
                                                
                                        </TouchableOpacity>
                                    )
                                })
                            }


                        </View>
                       
                    </ScrollView>
                </View>
                 :
                 <View style={styles.mainContent}>
                   <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                       <Text>{this.state.hvError}</Text>
                   </View>
                 </View>
                 }
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)