/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Input(props) {
  const [isFocus, setFocus] = useState(false);
  return (
    <View style={styles.mainWrapper}>
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
      {props.error && <Text style={styles.txtRed}>{props.error}</Text>}
      <Text style={styles.txtLimit}>{`${props.value.length || '0'}/${
        props.maxLength
      }`}</Text>
    </View>
  );
}
