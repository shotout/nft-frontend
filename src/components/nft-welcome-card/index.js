import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const handIcon = require('../../assets/icon/tutorial_icon.png');

function NFTWelcomeCard({shutOffTutorial}) {
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnCard}>
        <LinearGradient
          colors={['rgba(119, 121, 168,0.95)', 'rgba(142, 0, 59,1)']}
          style={styles.bgStyle}
        />
        <View style={styles.txtWrapper}>
          <Text style={styles.txtTitle}>Get started asap</Text>
          <Text style={styles.txtExplore}>NO FOMO</Text>
          <Text style={styles.txtDesc}>
            Lean back and relax, no need to ape in anymore. We do the research
            for you! Stay up-to-date on the most promising NFT projects by
            reading our one article every day.
          </Text>
          <Text style={[styles.txtExplore, styles.mgTop16]}>NO FUD</Text>
          <Text style={styles.txtDesc}>
            Our team of crypto veterans gives each project a thorough
            investigation before we write about it.
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
