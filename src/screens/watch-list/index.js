import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import {listWatchlist} from '../../helpers/requests';
import {URL_WEBSITE} from '../../helpers/static';
import styles from './styles';

const backIcon = require('../../assets/icon/forward_icon.png');

export default function WatchList() {
  const [isLoading, setLoading] = useState(true);
  const [listData, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listWatchlist();
      setLoading(false);
      console.log('Check res.data.data:', res.data.data);
      setData(res.data.data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.ctnRoot}>
      <Header title="Watchlist" />
      <FlatList
        contentContainerStyle={styles.ctnScroll}
        data={listData}
        renderItem={({item}) => (
          <View style={styles.ctnItem}>
            <View style={styles.ctnImage}>
              <Image
                source={{
                  uri: `${URL_WEBSITE}${item.product.collections[0].image}`,
                }}
                style={styles.imgNft}
              />
            </View>
            <View style={styles.centerItem}>
              <Text style={styles.txtTitle}>{item.product.nft_title}</Text>
              <Text
                style={styles.txtDesc}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.product.nft_description}
              </Text>
            </View>
            <Image source={backIcon} style={styles.forwardIcon} />
          </View>
        )}
        keyExtractor={item => item}
        ListFooterComponent={() => {
          if (isLoading) {
            return <LoadingIndicator fullscreen stylesRoot={{marginTop: 20}} />;
          }
          return null;
        }}
      />
    </View>
  );
}
