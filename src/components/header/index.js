import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {goBack, navigate} from '../../helpers/navigationRef';
import {colors} from '../../shared/styling';

const backIcon = require('../../assets/icon/back_button.png');
const menuIcon = require('../../assets/icon/menu_bar.png');
const whiteIcon = require('../../assets/icon/icon_apps_white.png');
const coloredIcon = require('../../assets/icon/icon_apps_default.png');

function Header({type, title, onPressDrawer, backPress, hideLeft}) {
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
    if (type === 'drawer') {
      return (
        <TouchableOpacity
          style={styles.ctnWatchlist}
          onPress={() => {
            navigate('Watchlist');
          }}>
          <Feather name="heart" color={colors.dark} size={24} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  function renderLeft() {
    if (type === 'boarding' || hideLeft) {
      return null;
    }
    if (type === 'drawer') {
      return (
        <View style={styles.ctnBack}>
          <TouchableOpacity onPress={onPressDrawer} style={styles.backWrapper}>
            <Image source={menuIcon} style={styles.menuStyle} />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.ctnBack}>
        <TouchableOpacity
          onPress={() => {
            if (typeof backPress === 'function') {
              backPress();
            } else {
              goBack();
            }
          }}
          style={styles.backWrapper}>
          <Image source={backIcon} style={styles.backIconStyle} />
        </TouchableOpacity>
      </View>
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
    <View style={[styles.ctnRoot, type !== 'boarding' && styles.shadowHeader]}>
      {renderLeft()}
      {getContent()}
      {renderRight()}
    </View>
  );
}
export default Header;
