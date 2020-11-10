import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'


import styles from './style'


class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    const {
      type,
      backgroundStyle,
      text
    } = this.props

    let buttonStyle = []
    buttonStyle.push(styles.buttonBasic)
    buttonStyle.push(styles.defaultBorder)
    buttonStyle.push(styles.defaultBorderColor)
    if (type == 'block') {
      buttonStyle.push(styles.buttonBlock)
    }
    if (type == 'wrapper') {
      buttonStyle.push(styles.buttonWrapper)
    }
    if (backgroundStyle == 'transparent') {
      buttonStyle.push(styles.transparentBackground)
    } else {
      buttonStyle.push(styles.defaultBackground)
    }

    return(
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={buttonStyle}>
          <Text style={styles.buttonTitle}>{ text }</Text>
        </View>
      </TouchableOpacity>
    )

  }

}

export default Button