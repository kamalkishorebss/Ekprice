import React from 'react'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import Carousel from 'react-native-snap-carousel'

import {
  normalize
} from '../../helpers'

import styles from './style'

//import Spinner from 'react-native-loading-spinner-overlay';

const { height, width } = Dimensions.get('window')

class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }

    
  }
  goToDetail(p) {
   console.log("ff")
  }

  

  render() {

    return (
      <View style={styles.carouselContainer}>
       
        <TouchableOpacity style={styles.carouselItem} onPress={this.goToDetail.bind(this)}>

          <ImageBackground style={styles.carouselImage} source={this.props.data}>





          </ImageBackground>
        </TouchableOpacity>

      </View>
    )

  }

}

export default CarouselWrapper