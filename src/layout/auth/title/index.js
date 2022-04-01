import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function Title({label}) {
  return (
    <View style={styles.ctnTitle}>
      <Text style={styles.txtTitle}>{label}</Text>
    </View>
  );
}
