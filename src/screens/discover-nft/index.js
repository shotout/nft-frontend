import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../components/header';
import NFTCard from '../../components/nft-card';
import styles from './styles';

export default function DiscoverNFT() {
  function renderTitle() {
    return (
      <View style={styles.ctnTitle}>
        <Text style={styles.txtTitle}>Here is our pick</Text>
        <Text style={styles.txtDayTitle}>for today.</Text>
      </View>
    );
  }

  return (
    <View styles={styles.ctnRoot}>
      <Header type="drawer" />
      <ScrollView
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}>
        {renderTitle()}
        <NFTCard />
      </ScrollView>
    </View>
  );
}
