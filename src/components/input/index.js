/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Input(props) {
  const [isFocus, setFocus] = useState(false);
  return (
    <View style={styles.ctnInput}>
      <TextInput
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={styles.inputStyle}
        placeholderTextColor={colors.dark}
        {...props}
      />
    </View>
  );
}
