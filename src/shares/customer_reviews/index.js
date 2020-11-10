import React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'


import styles from './style'


class Customer_Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
 
  render() {

    const { data } = this.props
   // console.log('fff',this.props.data)

    return(
      <TouchableOpacity style={styles.ReviewItem} >
       
        
          <View style={styles.miniDrawTagWrapper}>
            <View style={{width:'100%',flexDirection:'row'}}><Text style={[styles.ReviewNameText,{textAlign:'left'}]}>{data.customer_name}</Text><Text style={[styles.ReviewNameText,{textAlign:'right',fontSize:14,color:"#FAA61A"}]}> <Image source={require('../../assets/img/star.png')} style={{width:20,
            height:20}}/>{data.number_of_reviews}</Text></View>
            {/* <Text style={styles.reviewsDateText}>{data.created_at}</Text> */}
          </View>
          <View style={styles.descWrapper}>
              <Text style={styles.reviewText} numberOfLines={5}>{ data.comments }</Text>
          </View>
       
      </TouchableOpacity>
    )

  }

}

export default Customer_Reviews