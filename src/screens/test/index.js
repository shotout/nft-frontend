import React from 'react';
import {View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import solana from '../../assets/icon/svg/Solana.svg';

import styles from './styles';

function Test() {
  return (
    <View style={{backgroundColor: 'yellow', flex: 1}}>
      <View
        style={{
          width: moderateScale(20),
          height: moderateScale(20),
        }}>
        <SvgUri
          width="100%"
          height="100%"
          uri="https://cryptologos.cc/logos/solana-sol-logo.svg"
          fill="red"
          color="blue"
        />
      </View>
    </View>
  );
}

export default Test;
