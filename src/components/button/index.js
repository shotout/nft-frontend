/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

export default function Button({
  label,
  onPress,
  type,
  isLoading,
  btnStyle,
  isDisable,
}) {
  const [isFocus, setFocus] = useState(false);

  function getBgColor() {
    switch (type) {
      case 'white-button':
        return {backgroundColor: '#fff'};
      case 'dark':
        return {backgroundColor: colors.dark};
      default:
        if (isDisable) {
          return {backgroundColor: '#ddd'};
        }
        return {};
    }
  }

  function getTextColor() {
    switch (type) {
      case 'white-button':
        return {color: colors.red};
      default:
        if (isDisable) {
          return {backgroundColor: '#ddd'};
        }
        return {};
    }
  }

  return (
    <TouchableOpacity
      disabled={isLoading || isDisable}
      onPress={onPress}
      style={[styles.ctnRoot, getBgColor(), btnStyle]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.txtButton, getTextColor()]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
