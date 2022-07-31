import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import Button from '../button';

const successAnimation = require('../../assets/icon/success_animation.json');
const backArrow = require('../../assets/icon/back_button.png');

export default function SuccessfullEnterAirdrop({
  backgroundColor,
  label,
  onPress,
  onBack,
}) {
  function renderBackButton() {
    return (
      <View style={styles.ctnBack}>
        <TouchableOpacity onPress={onBack}>
          <Image source={backArrow} style={styles.backIconStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderAnimation() {
    return (
      <View style={styles.ctnAnimation}>
        <LottieView
          source={successAnimation}
          autoPlay
          loop={false}
          style={styles.lottieStyle}
        />
      </View>
    );
  }
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.topContainer}>
        {renderAnimation()}
        <Text style={styles.txtTitle}>Successfully Entered</Text>
        <Text style={styles.txtDesc}>
          You will find the NFT in your wallet if you are part of the winners
          after the countdown ends.
        </Text>
      </View>

      <Button
        btnStyle={{
          marginTop: moderateScale(20),
          marginBottom: 0,
          backgroundColor,
        }}
        onPress={onPress}
        label={label}
      />
      {renderBackButton()}
    </View>
  );
}
