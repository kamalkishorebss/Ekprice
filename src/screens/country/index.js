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


class Country extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            countries: [

            ],



        }



    }

    componentDidMount() {

        fetch(`https://www.ekprice.com/api/countries`)
            .then((response) => response.json())
            .then((res) => {
            this.setState({countries : res.data})
        })
    }

    goToDetail(e) {

        this.props.navigation.navigate("Category", { 'cat_id': e });
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Select Country"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            {
                                this.state.countries.map((item, index) => {
                                    return (
                                        <View style={styles.catItem} key={`cat_${index}`}>

                                            <TouchableOpacity style={styles.miniDrawTagWrapper} onPress={this.goToDetail.bind(this, item)}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.catNameText}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Country)