/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Button({label, onPress, type}) {
  const [isFocus, setFocus] = useState(false);

  function getBgColor() {
    switch (type) {
      case 'white-button':
        return {backgroundColor: '#fff'};
      default:
        return {};
    }
  }

  function getTextColor() {
    switch (type) {
      case 'white-button':
        return {color: colors.red};
      default:
        return {};
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.ctnRoot, getBgColor()]}>
      <Text style={[styles.txtButton, getTextColor()]}>{label}</Text>
    </TouchableOpacity>
  );
}
