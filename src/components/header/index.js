import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {goBack} from '../../helpers/navigationRef';

const backIcon = require('../../assets/icon/back_button.png');
const whiteIcon = require('../../assets/icon/icon_apps_white.png');
const coloredIcon = require('../../assets/icon/icon_apps_default.png');

function Header({type, title}) {
  function getIconApps() {
    switch (type) {
      case 'boarding':
        return whiteIcon;
      default:
        return coloredIcon;
    }
  }
  function getTitleColor() {
    switch (type) {
      case 'boarding':
        return {color: '#fff'};
      default:
        return {};
    }
  }

  function renderRight() {
    if (type === 'boarding') {
      return null;
    }
    return (
      <View style={styles.ctnBack}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={styles.backWrapper}>
          <Image source={backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  function getTitle() {
    if (title) {
      return <Text style={[styles.txtTitle]}>{title}</Text>;
    }
    return (
      <Text style={[styles.txtTitle, getTitleColor()]}>NFT of the Day</Text>
    );
  }

  function getContent() {
    if (title) {
      return (
        <View style={styles.ctnTitle}>
          <Text style={[styles.txtWithTitle]}>{title}</Text>
        </View>
      );
    }
    return (
      <View style={styles.ctnTitle}>
        <Image source={getIconApps()} style={styles.ethRedStyle} />
        <Text style={[styles.txtTitle, getTitleColor()]}>NFT of the Day</Text>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {renderRight()}
      {getContent()}
    </View>
  );
}
export default Header;
