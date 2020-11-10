import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'


import styles from './style'


class Micro_Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  goToDetail(p){
    this.props.userActions.getProductDetail(p.id).then(res=>{
     if(res){
      
        let min=0,max=0;
        for(var i=0;i<res.meta_data.length;i++){
          if(res.meta_data[i].key == '_max_tickets'){
           max = res.meta_data[i].value
          }
        }
       let product ={ 
         'id'          : res.id,
         "bannerImage" : res.img_src,
         'timer'       : res.date_diff,
         'gallery'     : res.gallery,
         'price'       : res.price,
         'meta_data'   : res.meta_data,
         'sale_tickets': res.sale_tickets,
         'manage_stock': res.stock_status,
         'pro'         : res,
         'price'       : res.price, 
         'stock_price' : res.regular_price,
         'name'        : res.name,
         'progress'    : res.sale_tickets.length/max,
         'max'         : max,
         'left'        : max-res.sale_tickets.length
       }
      console.log(product)
      this.props.navigation.navigate('Competition',{'product_id':product})
      }
    })
    } 
  render() {

    const { data } = this.props
    console.log('fff',this.props.data)

    return(
      <TouchableOpacity style={styles.miniDrawItem} onPress={this.goToDetail.bind(this,data)}>
        <ImageBackground style={styles.miniDrawImage} source={{uri:data.image}}>
        {
            data.is_sale == true ?
              <View style={styles.carouselTagWrapper}>
                <Text style={styles.carouselTagText}>Sale!</Text>
              </View>
            :
            <View style={styles.carouselTagWrapper}>
              <Text style={styles.carouselTagText}>Sold Out</Text>
            </View>
          }
          <View style={styles.miniDrawTagWrapper}>
            <Text style={styles.miniDrawTagText}>{ `£${data.price}` }</Text>
          </View>
          <View style={styles.miniDrawNameWrapper}>
            <View style={styles.miniDrawNameSection}>
              <Text style={styles.miniDrawNameText} numberOfLines={1}>{ data.name }</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )

  }

}

export default Micro_Jobs