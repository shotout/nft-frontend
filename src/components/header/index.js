import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const backIcon = require('../../assets/icon/back_button.png');
const ethRed = require('../../assets/icon/cryptocurrency.png');

function Header({type, title}) {
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnBack}>
        <TouchableOpacity
          onPress={() => {
            console.log('EW');
          }}
          style={styles.backWrapper}>
          <Image source={backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
      </View>
      <View style={styles.ctnTitle}>
        <Image source={ethRed} style={styles.ethRedStyle} />
        <Text style={styles.txtTitle}>NFT of the Day</Text>
      </View>
    </View>
  );
}
export default Header;
