import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../../components/button';
import Header from '../../components/header';
import {navigate} from '../../helpers/navigationRef';
import styles from './styles';

const backgroundImage = require('../../assets/icon/boarding_bg.png');
const notificationIcon = require('../../assets/icon/notification.png');

const nftImage =
  'https://dappradar.com/nft-metadata-image?format=preview&filePath=ethereum/0x60e4d786628fea6478f785a6d7e704777c86a7c6/4849.png';

export default function BoardingPage() {
  function notificationBar() {
    return (
      <View style={styles.notificationBar}>
        <View style={styles.ctnNotification}>
          <Image source={notificationIcon} style={styles.notificationStyle} />
        </View>
        <View style={styles.ctnNotifItem}>
          <Text style={styles.txtNotif}>NFT Raffle is Live</Text>
          <Text style={styles.txtDescNotif}>
            Win 1 of 10 exlusive MekaVerse NFTs. Opt in before all slots are
            gone!
          </Text>
        </View>
        <View style={styles.rightNotif}>
          <Text style={styles.txtTime}>now</Text>
          <Image source={{uri: nftImage}} style={styles.rightIcon} />
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={styles.ctnWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.txtContent}>Never miss another</Text>
          <Text style={[styles.txtContent, styles.txtRed]}>Airdrop</Text>
        </View>
        {/* {notificationBar()} */}
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={styles.btnWrapper}>
        <Button
          type="white-button"
          label="Get Started"
          onPress={() => {
            navigate('Register');
          }}
        />
        <TouchableOpacity
          style={styles.ctnSignIn}
          onPress={() => {
            navigate('Signin');
          }}>
          <Text style={styles.txtSignIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <ImageBackground source={backgroundImage} style={styles.bgImageStyle}>
        <Header type="boarding" />
        {renderContent()}
        {renderButton()}
      </ImageBackground>
    </View>
  );
}
