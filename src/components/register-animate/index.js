import React from 'react';
import LottieView from 'lottie-react-native';

const lottieFile = require('../../assets/icon/register_lottie.json');

export default function RegisterAnimate() {
  return <LottieView source={lottieFile} autoPlay loop />;
}
