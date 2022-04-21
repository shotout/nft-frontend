import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import styles from './styles';

const backIcon = require('../../assets/icon/forward_icon.png');

const defaultImage =
  'https://dappradar.com/nft-metadata-image?format=preview&filePath=ethereum/0x60e4d786628fea6478f785a6d7e704777c86a7c6/4849.png';

export default function WatchList() {
  return (
    <View style={styles.ctnRoot}>
      <Header title="Watchlist" />
      <FlatList
        contentContainerStyle={styles.ctnScroll}
        data={['a', 'b', 'c', 'd']}
        renderItem={() => (
          <View style={styles.ctnItem}>
            <View style={styles.ctnImage}>
              <Image source={{uri: defaultImage}} style={styles.imgNft} />
            </View>
            <View style={styles.centerItem}>
              <Text style={styles.txtTitle}>Burnin Bunny</Text>
              <Text style={styles.txtDesc}>
                Lorem ipsum sit dolor amet lorem .
              </Text>
            </View>
            <Image source={backIcon} style={styles.forwardIcon} />
          </View>
        )}
        keyExtractor={item => item}
      />
    </View>
  );
}
