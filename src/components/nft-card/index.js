import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

const contentNFT = require('../../assets/icon/dummy/nft.jpeg');
const verifiedIcon = require('../../assets/icon/verified.png');
const adaIcon = require('../../assets/icon/dummy/ada.png');
const groupIcon = require('../../assets/icon/group_icon.png');

const starsIcon = require('../../assets/icon/stars.png');

export default function NFTCard() {
  function renderImage() {
    return (
      <ImageBackground source={contentNFT} style={styles.nftContentStyle}>
        <View style={styles.ctnTitle}>
          <Text style={styles.txtTitle}>Bearded Ape</Text>
          <View style={styles.ctnRow}>
            <View style={styles.ctnVerified}>
              <Image source={verifiedIcon} style={styles.verifiedStyle} />
              <Text style={styles.txtVerified}>Verified</Text>
            </View>
            <LinearGradient
              colors={['#9B628D', '#BF9098']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.ctnVerified, styles.noBorder]}>
              <Image source={adaIcon} style={styles.cardanoIcon} />
              <Text style={styles.txtVerified}>Cardano</Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }

  function renderTime() {
    return (
      <LinearGradient
        colors={['#9B628D', '#BF9098']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.ctnTime}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>1</Text>
          <Text style={styles.timeDesc}>Day</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>14</Text>
          <Text style={styles.timeDesc}>Hrs</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>56</Text>
          <Text style={styles.timeDesc}>Min</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>05</Text>
          <Text style={styles.timeDesc}>Sec</Text>
        </View>
      </LinearGradient>
    );
  }

  function renderContent() {
    return (
      <View style={styles.ctnContent}>
        <View style={styles.descContentWrapper}>
          <View style={styles.ctnSubContent}>
            <Image source={starsIcon} style={styles.iconContent} />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Type</Text>
              <Text style={styles.txtSubContent}>Art</Text>
            </View>
          </View>
          <View style={styles.ctnSubContent}>
            <Image source={groupIcon} style={styles.iconContent} />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Amount</Text>
              <Text style={styles.txtSubContent}>35</Text>
            </View>
          </View>
          <View style={styles.ctnSubContent}>
            <Image source={starsIcon} style={styles.iconContent} />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Price</Text>
              <Text style={styles.txtSubContent}>500 ADA</Text>
            </View>
          </View>
        </View>
        <View style={styles.ctnDesc}>
          <Text style={styles.txtDesc}>
            Lorem ipsum sit dolor amet lorem ipsum sit dolor amet lorem ipsum
            sit doloer amet lorem ipsum sit doloer amet lorem ipsum sit doloer
            amet lorem ipsum sit doloer amet lorem ipsum sit doloer amet lorem
            ipsum sit doloer amet lorem ipsum sit doloer amet lorem ipsum sit
            doloer amet lorem ipsum.
          </Text>
        </View>

        <LinearGradient
          style={styles.ctnButtonStyle}
          colors={['rgba(115, 97, 152, 0.1)', 'rgba(85, 74, 114, 1)']}
        />
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnCard}>
        {renderImage()}
        {renderTime()}
        {renderContent()}
        <View style={styles.ctnBottomButton}>
          <TouchableOpacity style={styles.ctnBtn}>
            <Text style={styles.txtBtn}>Discover</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback>
            <View style={styles.ctnLove}>
              <Feather name="heart" color="#fff" size={24} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
