import React from 'react'
import {
  TouchableOpacity,
  Image,
  Text
} from 'react-native'


import styles from './style'


class DrawerLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    const {
      onPress,
      item,
      active
    } = this.props

    let containerStyle = []
    containerStyle.push(styles.container)
    if (active == true) {
      containerStyle.push(styles.active)
    }

    return(
      <TouchableOpacity style={containerStyle} onPress={() => onPress() }>
        <Image style={styles.image} source={item.icon}></Image>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    )

  }

}

export default DrawerLink