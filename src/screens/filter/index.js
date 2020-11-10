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
import SelectMultiple from 'react-native-select-multiple'
const mapDispatchToProps = (dispatch) => {
    return ({
        allActions: bindActionCreators(allActions, dispatch)
    })
}

const mapStateToProps = (state) => {
    return state
}


class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            service: [],
            isModalVisible: false,
            appliedValueL: [],
            deliveredIn: -1,
            list: [],
            selectedFiles: [],
            files: [],
            getLang:[]
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            AsyncStorage.getItem("languages")
            .then(item => {
                item = JSON.parse(item);
                console.log(item)
                this.setState({ getLang: item });
            })

            AsyncStorage.getItem("upFile")
            .then(item => {
                item = JSON.parse(item);
                console.log('ddddd',item)
                this.setState({ files: item });
            })
            AsyncStorage.getItem("dd")
            .then(item => {
                item = JSON.parse(item);
                console.log('ddddd',item)
                this.setState({ deliveredIn: item });
            })
            
        })
    }

    goToLanguage(type) {
        this.props.navigation.navigate('Language', { "type": type });
    }

    selectDays(day) {
        this.setState({ deliveredIn: day })
        AsyncStorage.setItem("dd",JSON.stringify(day))
    }

    

    openOutPutFile() {
        fetch(`https://www.ekprice.com/api/output-files`)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            this.setState({ isModalVisible: true})
            let l = []
            for (var i = 0; i < res.data.length; i++) {
                l.push({ 'label': res.data[i].title, "value": res.data[i].id })
            }
            this.setState({ list: l })
        })
       
    }


    onFileChange = (selectedFiles) => {
        this.setState({ files:selectedFiles,selectedFiles })
        AsyncStorage.setItem("upFile",JSON.stringify(selectedFiles))
    }

    doneBtn = () => {
        this.setState({ isModalVisible: false })
    }

    cancelBtn() {
        this.setState({ isModalVisible: false })
    }

    add(){
        console.log(this.state.getLang)
        let lng = [], sf = [];
        for(let i=0;i<this.state.getLang.length;i++){
            lng.push(this.state.getLang[i].value)
        }
        for(let i=0;i<this.state.selectedFiles.length;i++){
            sf.push(this.state.selectedFiles[i].value)
        }

        
        let url = `https://www.ekprice.com/api/services-filter?cat_slug=${this.props.navigation.getParam('slug').cat_slug}&deliver_time=${this.state.deliveredIn} days&language=${lng.toString()}&outputfiles=${sf.toString()}`
        console.log(url);
        fetch(url, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
           // body: filterForm
        }).then((response) => response.json())
            .then(res => {
                console.log(res)
                this.props.navigation.navigate('Category',{'filter':res})
            })
    }
    
    resetFilter(){
        
                AsyncStorage.clear();
                this.props.navigation.navigate('Category',{'reset':'1'})
              
        
    }
    

    render() {

        return (
            <View style={styles.container}>
                <View style={{ height: 60, flexDirection: "row", borderBottomColor: "#ddd", borderBottomWidth: 1, backgroundColor: '#fff', justifyContent: 'center' }}>

                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Category')}>
                        <Icon name="close" size={30} color="#525252" />

                    </TouchableOpacity>
                    <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={{
                            color: '#112e5a',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginHorizontal: 15,
                            fontFamily: 'montserrat'
                        }}>Filter</Text>
                    </View>

                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.props.navigation.navigate("Cart")}>
                    </View>



                </View>
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.filterText}>Applied Filters</Text>
                        </View>
                        {this.state.getLang && this.state.getLang.length > 0 ?
                            <View style={{ width: '100%', height: 50 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.getLang && this.state.getLang.length > 0 && this.state.getLang.map((item, index) => {
                                        return (
                                            <View style={{ width: normalize(80), marginLeft: normalize(5), paddingTop: normalize(5), alignItems: 'center', justifyContent: 'center' }} ><Text style={styles.serIncludes} key={`lang_${index}`}>{item.label}</Text></View>
                                        )
                                    })
                                    }
                                </ScrollView>
                            </View>
                            :
                            null
                        }

                        {this.state.files && this.state.files.length > 0 ?
                            <View style={{ width: '100%', height: 50 }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {this.state.files && this.state.files.length > 0 && this.state.files.map((item, index) => {
                                        return (
                                            <View style={{ width: normalize(80), marginLeft: normalize(5), paddingTop: normalize(5), alignItems: 'center', justifyContent: 'center' }} ><Text style={styles.serIncludes} key={`lang_${index}`}>{item.label}</Text></View>
                                        )
                                    })
                                    }
                                </ScrollView>
                            </View>
                            :
                            null
                        }

                        <View style={[styles.sectionContainer, { flexDirection: 'column' }]}>
                            <Text style={[styles.filterText, { paddingBottom: 0 }]}>Delivery time</Text>
                            {
                                [...Array(4)].map((item, index) => {
                                    return (
                                        <View>
                                            {index >= 1 ?
                                                <Text style={[styles.filterText, { paddingVertical: 5, fontSize: 12, paddingTop: 0 }]} onPress={this.selectDays.bind(this, index)} key={`day_${index}`}>
                                                    <Image source={this.state.deliveredIn == index ? require('../../assets/img/red_tick.png') : require('../../assets/img/radio_off_light.png')} style={{ width: 20, height: 20 }} /> In {index} days</Text>
                                                :
                                                null
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>



                        <TouchableOpacity style={styles.sectionContainer} onPress={this.goToLanguage.bind(this, "L")}>
                            <Text style={styles.filterText}>select language</Text>
                            <Text style={styles.filterText1}><Icon name="keyboard-arrow-right" size={30} color="#000"></Icon></Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.sectionContainer} onPress={this.goToLanguage.bind(this, "C")}>
                            <Text style={styles.filterText}>select country</Text>
                            <Text style={styles.filterText1}><Icon name="keyboard-arrow-right" size={30} color="#000"></Icon></Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={styles.sectionContainer} onPress={this.openOutPutFile.bind(this)}>
                            <Text style={styles.filterText}>select output files</Text>
                            <Text style={styles.filterText1}><Icon name="keyboard-arrow-right" size={30} color="#000"></Icon></Text>
                        </TouchableOpacity>
                        
                        <View style={{flexDirection:'row',marginTop:20}}> 
                            <TouchableOpacity style={styles.button} onPress={this.resetFilter.bind(this)}>
                                <Text style={styles.buttonText}>reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.add.bind(this)}>
                                <Text style={styles.buttonText}>apply</Text>
                            </TouchableOpacity>
                        </View>
                        


                    </ScrollView>
                </View>
                <Modal visible={this.state.isModalVisible} style={{ margin: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', width: '100%', height: '100%', borderWidth: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff' }}>

                        <View style={{ width: '100%', flexDirection: 'row', padding: 10 }}>
                            <View style={{ width: '80%' }}>
                                <Text style={[styles.clickTxt, { color: '#222', fontSize: normalize(16), fontFamily: 'Poppins-Medium' }]}>Select OutputFile</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={() => { this.setState({ isModalVisible: !this.state.isModalVisible }) }}>
                                    <Text style={[styles.clickTxt, { color: '#222', fontSize: 16 }]}><Icon name="close" size={25} color="#000" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                        <ScrollView style={styles.listContainer}>
                            <View style={styles.sectionContainer}>
                                <SelectMultiple
                                    items={this.state.list}
                                    selectedItems={this.state.selectedFiles}
                                    onSelectionsChange={this.onFileChange.bind(this)} />

                            </View>

                        </ScrollView>
                        <View style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto', flexDirection: 'row', paddingVertical: 5 }}>
                            <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1, borderColor: 'red', paddingVertical: 5 }} onPress={this.cancelBtn.bind(this)}>
                                <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '48%', alignItems: 'center', margin: '1%', borderWidth: 1, borderColor: 'red', paddingVertical: 5 }} onPress={this.doneBtn.bind(this)}>
                                <Text style={{ color: 'red', fontSize: 16 }}>Done</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>
        )

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)