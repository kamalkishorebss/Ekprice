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

import {
    Header,
    BasicHeader,
    CarouselWrapper,
    RunningOrders,
    AddedServices,
    Micro_Jobs,
    Customer_Reviews

} from '../../shares'



import styles from './style';


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
        loginStatus : state.common.loginStatus
    }
}


class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            Message: [
            //     { "name": "John Doe", 'desc': 'Lorem ipsum is a pseudo text used in typography layout printing in place of English design.' },
            //     { "name": "John Doe", 'desc': 'Lorem ipsum is a pseudo text used in typography layout printing in place of English design.' },
            //     { "name": "John Doe", 'desc': 'Lorem ipsum is a pseudo text used in typography layout printing in place of English design.' },
            //     { "name": "John Doe", 'desc': 'Lorem ipsum is a pseudo text used in typography layout printing in place of English design.' },
            //     { "name": "John Doe", 'desc': 'Lorem ipsum is a pseudo text used in typography layout printing in place of English design.' }
            // 
        ],



        }



    }

    componentDidMount() {
        this.getKey() 
    }
    
    async getKey() {
        const value = await AsyncStorage.getItem('currentUser');
        console.log('gggggg', value);
        if (value == null) {
            this.props.navigation.navigate("Login");
        } else {
            this.props.navigation.navigate("Notification");
            this.props.allActions.get_Messages(this.props.loginStatus.data.user_id).then(res=>{
                console.log('upcoming',res);
                if(res.status == true){
                    this.setState({Message:res.data})
                }else{
                    alert("Network Error")
                }
                })
        }
    }

    goToDetail() {
        alert("hello")
    }

    render() {

        return (
            <View style={styles.container}>
                <Header {...this.props} title={"Message"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            {
                                this.state.Message.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={styles.catItem} key={`NN_${index}`}>

                                            <View style={styles.imageWrapper}>
                                                <View style={styles.userImage}>
                                                    <Image source={{uri : item.sender_profile}} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                                </View>
                                            </View>
                                            <View style={styles.messageWrapper}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.userNameText} numberOfLines={1}>{item.sender_name}</Text>
                                                    <Text style={styles.timingText} numberOfLines={1}>Just Now</Text>
                                                </View>
                                                <Text style={styles.typeCarText} numberOfLines={1}>{item.message}</Text>
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }


                        </View>
                    </ScrollView>
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)