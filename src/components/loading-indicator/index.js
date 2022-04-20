import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '../../shared/styling';
import styles from './styles';

const LoadingIndicator = ({
  size = 'large',
  color = colors.dark,
  fullscreen,
  stylesRoot,
}) => (
  <View style={[stylesRoot, fullscreen ? styles.fullscreen : {}]}>
    <ActivityIndicator animating size={size} color={color} />
  </View>
);

export default LoadingIndicator;
