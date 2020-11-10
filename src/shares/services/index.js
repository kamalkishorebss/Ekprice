import React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'


import styles from './style'


class AddedServices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  

  servicePage(id){
   // console.log('FFF',this.props)
    this.props.navigation.navigate('ServiceDetail',{'serviceId' : id});
  }

  render() {

    const { data } = this.props
    //console.log('fff',this.props.data)
    let image = require('../../assets/img/service.png')
    return(
      <View>
      
      <TouchableOpacity style={styles.addedServices} onPress={this.servicePage.bind(this,data.id)}>
           
          <View style={styles.imageWrapper}>
                 
                <ImageBackground source={{uri:data.image}} style={styles.serviceImage}>
                  <View style={{alignItems : 'flex-end',padding:5}}>
                      <View style={styles.heartIcon}>
                        <Image source={require('../../assets/img/heart.png')} style={{width:25,height:25,alignSelf:'center'}}/>
                      </View>
                    </View>
                </ImageBackground>
            
          </View>
          <View style={styles.descWrapper}>
              <Text style={styles.reviewText}  numberOfLines={3}>{ data.title }</Text>
              <Text style={styles.priceText} >Starting At <Text style={{color:'#59BD5A',fontSize:18,textTransform:'capitalize'}}> Rs {data.price}</Text></Text>
          
          </View>
          <View style={styles.sellerBtnBox}>
            <TouchableOpacity style={styles.sellerBtn}>
              <Text style={styles.sellerBtnText}>Contact Seller</Text>
            </TouchableOpacity>
          </View>
          
       
      </TouchableOpacity>
      
      </View>
    )

  }

}

export default AddedServices