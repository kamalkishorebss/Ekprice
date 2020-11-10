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
import SelectMultiple from 'react-native-select-multiple'

const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return state
}


class Language extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            languages: [],
            selectedLang: [],
           



        }



    }

    componentDidMount() {
        
            fetch(`https://www.ekprice.com/api/languages`)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res)
                    let l = []
                    for (var i = 0; i < res.data.length; i++) {
                        l.push({ "label": res.data[i].name, "value": res.data[i].id })
                    }
                    this.setState({ languages: l })
                })
        

    }


    onLanguageChange = (selectedLang) => {
        // selectedLang is array of { label, value }
        this.setState({ selectedLang })
    }


    

    doneBtn() {
        AsyncStorage.setItem("languages", JSON.stringify(this.state.selectedLang));
        this.props.navigation.navigate("Filter",{'languages':this.state.selectedLang});
    }

    cancelBtn(){
        this.state.selectedLang = []
        this.props.navigation.navigate("Filter", { 'languages': this.state.selectedLang});
    }

    

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Select Language"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <SelectMultiple
                                items={this.state.languages}
                                selectedItems={this.state.selectedLang}
                                onSelectionsChange={this.onLanguageChange.bind(this)} />
                        </View>
                    </ScrollView>
                    
                    <View style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto', flexDirection: 'row', paddingVertical: 5 }}>
                        <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1,borderColor:'red' ,paddingVertical: 5 }} onPress={this.cancelBtn.bind(this)}>
                            <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1,borderColor:'red', paddingVertical: 5 }} onPress={this.doneBtn.bind(this)}>
                            <Text style={{ color: 'red', fontSize: 16 }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Language)