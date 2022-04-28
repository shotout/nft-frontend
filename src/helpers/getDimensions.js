import {Dimensions, Platform} from 'react-native';

export const getDimensionWidth = value =>
  Dimensions.get('screen').width * value;

export const getDimensionHeight = value =>
  Dimensions.get('screen').height * value;
