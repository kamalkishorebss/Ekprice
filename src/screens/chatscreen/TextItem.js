import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles'

const TextItem = ({
    message
}) => (
        <View style={styles.rowText}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );

export default TextItem;
