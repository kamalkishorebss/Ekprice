import React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import {
  normalize
} from '../../helpers'
import styles from './style'


class RunningOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  goToDetail(p) {
    this.props.userActions.getProductDetail(p.id).then(res => {
      if (res) {

        let min = 0, max = 0;
        for (var i = 0; i < res.meta_data.length; i++) {
          if (res.meta_data[i].key == '_max_tickets') {
            max = res.meta_data[i].value
          }
        }
        let product = {
          'id': res.id,
          "bannerImage": res.img_src,
          'timer': res.date_diff,
          'gallery': res.gallery,
          'price': res.price,
          'meta_data': res.meta_data,
          'sale_tickets': res.sale_tickets,
          'manage_stock': res.stock_status,
          'pro': res,
          'price': res.price,
          'stock_price': res.regular_price,
          'name': res.name,
          'progress': res.sale_tickets.length / max,
          'max': max,
          'left': max - res.sale_tickets.length
        }
        console.log(product)
        this.props.navigation.navigate('Competition', { 'product_id': product })
      }
    })
  }
  render() {

    const { data } = this.props
    console.log('fff', this.props.data)

    return (
      //onPress={this.goToDetail.bind(this, data)}
      <TouchableOpacity style={styles.miniDrawItem} >

        

          <View style={{ width: '40%',padding:normalize(5)}}>
            <View style={styles.imageWrapper}>
              <Image source={{uri : data.service_details.service_image}} style={styles.serviceImage} />
            </View>
          </View>
          <View style={{ width: '60%',padding:normalize(5)}}>
              <View style={{flexDirection:'row'}}>
                <View style={{borderRadius:50,width:30,height:30}}><Image source={{uri : data.seller_image}} style={{width:30,height:30,borderRadius:50}}/></View>
                <Text style={styles.ReviewNameText}> {data.seller_name}</Text>
              </View>
              <Text style={styles.reviewText} numberOfLines={2}>{data.service_details.title}</Text>
              <View style={{width:'100%',flexDirection:'row',paddingTop:normalize(5)}}>
              <Text style={[styles.priceText,{textAlign:'left'}]}>{data.service_details.package_detail.delivered_in} delivery</Text>
              <Text style={{ width:'50%',color: '#59BD5A', fontSize: normalize(12),fontFamily:'Poppins-Medium',textAlign:'right' }}>Rs {data.order_value.service_price}</Text>
              </View>
              
          </View>

       

      </TouchableOpacity>
    )

  }

}

export default RunningOrders