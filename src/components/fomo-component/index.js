import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';

const fomoIcon = require('../../assets/icon/fomo_icon.png');
const nftImage = require('../../assets/icon/media_boarding.png');
const notificationIcon = require('../../assets/icon/notification.png');

export default function FomoComponent({ctnStyle}) {
  function notificationBar() {
    return (
      <View style={styles.notificationBar}>
        <View style={styles.ctnNotification}>
          <Image source={notificationIcon} style={styles.notificationStyle} />
        </View>
        <View style={styles.ctnNotifItem}>
          <Text style={styles.txtNotif}>NFT Raffle is Live 🚀</Text>
          <Text style={styles.txtDescNotif}>
            Win 1 of 10 exclusive Monkeys NFTs. Opt in before all slots are
            gone!
          </Text>
        </View>
        <View style={styles.rightNotif}>
          <Text style={styles.txtTime}>now</Text>
          <Image source={nftImage} style={styles.rightIcon} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.ctnFomo, ctnStyle]}>
      <Image source={fomoIcon} style={styles.icnFomo} />
      <View style={styles.ctnText}>
        <Text style={styles.txtTitle}>
          No need to <Text style={styles.txtRed}>FOMO</Text>
          {'\n'}
          Be one of the <Text style={styles.txtRed}>first</Text>
        </Text>
        <Text style={styles.txtDesc}>
          Enable notifications!{'\n'}This time you won’t miss out on the next
          big thing.
        </Text>
      </View>
      {notificationBar()}
    </View>
  );
}
