import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles'

const UserName = ({
    name,
    time
}) => (
    <View style={{ flexDirection: 'row'}}>
        <Text style={styles.userNameText1}>{name}</Text>
        <Text style={styles.messageTime}>{time}</Text>
    </View>
);

export default UserName;
