import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const handIcon = require('../../assets/icon/tutorial_icon.png');

function NFTWelcomeCard({shutOffTutorial}) {
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnCard}>
        <View style={styles.txtWrapper}>
          <Text style={styles.txtTitle}>Get started asap</Text>
          <Text style={styles.txtExplore}>Explore</Text>
          <Text style={styles.txtDesc}>
            Each day we release a new “card” about an NFT project. To view the
            extended article simply click on the card or on the button below.
          </Text>
          <Text style={[styles.txtExplore, styles.mgTop16]}>Discover</Text>
          <Text style={styles.txtDesc}>
            To explore previous projects simply swipe the current card away.
          </Text>
        </View>
        <Image source={handIcon} style={styles.handIconStyle} />
      </View>
      <View style={styles.ctnBottomButton}>
        <TouchableOpacity
          onPress={() => {
            shutOffTutorial();
          }}
          style={styles.ctnBtn}>
          <Text style={styles.txtBtn}>Got it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NFTWelcomeCard;
