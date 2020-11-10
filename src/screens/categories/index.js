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


class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            categoriesList: [
                
            ],



        }



    }

    componentDidMount() {
      
        this.props.allActions.get_Category().then(res=>{
         // console.log('upcoming',res);
         if(res.status == true){
            this.setState({categoriesList:res.CATEGORIES})
         }else{
             alert("Network Error")
         }
         
        })

    }
    
    goToDetail(e){
       
        this.props.navigation.navigate("Category",{'cat_id' : e});
    }

    render() {

        return (
            <View style={styles.container}>
                <BasicHeader {...this.props} title={"Categories"} />
                <View style={styles.mainContent}>
                    <ScrollView style={styles.listContainer}>
                        <View style={styles.sectionContainer}>
                            {
                                this.state.categoriesList.map((item, index) => {
                                    return (
                                        <View style={styles.catItem}   key={`cat_${index}`}>
                                            
                                            <View style={styles.catImage}>
                                                <Image source ={{uri : item.cat_images}} style={{width:40,height:40}}/>
                                            </View>
                                            <TouchableOpacity style={styles.cat_content} onPress={this.goToDetail.bind(this,item)}>
                                               <View style={{flexDirection:'row'}}>
                                                <Text style={styles.catNameText}>{item.cat_title}  
                                                </Text>
                                                <Text style={styles.catNameText}>
                                                </Text>
                                               
                                                
                                                {/* <Text style={{backgroundColor:'#59BD5A',color:'#fff',borderRadius:10,height:20,fontSize:10,width:36,textAlign:'center',textAlignVertical:'center'}}> {item.SUBCATEGORIES.length}+ </Text>
                                                 */}
                                                 </View>
                                                <Text style={styles.typeCarText} numberOfLines={2}>{item.cat_description}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories)