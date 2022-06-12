import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import {goBack, navigate} from '../../helpers/navigationRef';
import {colors} from '../../shared/styling';
import Flame from '../../assets/icon/svg/Flame';

const backIcon = require('../../assets/icon/back_button.png');
const backWhite = require('../../assets/icon/back_button_white.png');
const menuIcon = require('../../assets/icon/menu_bar.png');
const whiteIcon = require('../../assets/icon/icon_apps_white.png');
const coloredIcon = require('../../assets/icon/icon_apps_default.png');
const hypeShadow = require('../../assets/icon/hype_with_shadow.png');
const hypeWhite = require('../../assets/icon/hype_white.png');

function Header({
  type,
  title,
  onPressDrawer,
  backPress,
  hideLeft,
  onShare,
  loadingFavorite,
  isFavorite,
  handleFavorite,
  callbackRefresh,
  onSkip,
}) {
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
  function getShadow() {
    switch (type) {
      case 'boarding':
        return null;
      case 'detail-product':
        return null;
      default:
        return styles.shadowHeader;
    }
  }

  function renderRight() {
    if (type === 'detail-product') {
      return (
        <View style={styles.ctnWatchlist}>
          <TouchableOpacity style={styles.ctnShare} onPress={onShare}>
            <Feather
              name="share-2"
              color={colors.white}
              size={moderateScale(21)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite}>
            {loadingFavorite ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Flame
                width="20"
                height="25"
                color={isFavorite ? colors.red : colors.white}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    }
    if (type === 'drawer') {
      return (
        <TouchableOpacity
          style={styles.ctnWatchlist}
          onPress={() => {
            navigate('Watchlist', {callbackRefresh});
          }}>
          <Image source={hypeShadow} style={styles.hypeIconStyle} />
        </TouchableOpacity>
      );
    }
    if (type === 'skip-right-text') {
      return (
        <TouchableOpacity style={styles.ctnWatchlist} onPress={onSkip}>
          <Text style={styles.txtSkip}>Skip</Text>
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
          <Image
            source={type === 'detail-product' ? backWhite : backIcon}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function getContent() {
    if (type === 'detail-product') {
      return null;
    }
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
        <Text style={[styles.txtTitle, getTitleColor()]}>NFT Daily</Text>
      </View>
    );
  }

  return (
    <View style={[styles.ctnRoot, getShadow()]}>
      <StatusBar
        barStyle={type === 'boarding' ? 'light-content' : 'dark-content'}
        backgroundColor={type === 'boarding' ? '#000' : '#fff'}
      />
      {getContent()}
      {renderLeft()}
      {renderRight()}
    </View>
  );
}
export default Header;
