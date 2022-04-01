/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function Button({label, onPress}) {
  const [isFocus, setFocus] = useState(false);
  return (
    <TouchableOpacity onPress={onPress} style={styles.ctnRoot}>
      <Text style={styles.txtButton}>{label}</Text>
    </TouchableOpacity>
  );
}
