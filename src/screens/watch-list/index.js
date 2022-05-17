import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/header';
import HTMRenderer from '../../components/html-renderer';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate} from '../../helpers/navigationRef';
import {listWatchlist} from '../../helpers/requests';
import {URL_WEBSITE} from '../../helpers/static';
import styles from './styles';
import states from './states';

const backIcon = require('../../assets/icon/forward_icon.png');

function WatchList() {
  const [isLoading, setLoading] = useState(true);
  const [listData, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listWatchlist();
      setLoading(false);
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
      <Header title="Hypelist" />
      <FlatList
        contentContainerStyle={styles.ctnScroll}
        data={listData}
        renderItem={({item}) => {
          const handleRedirectProduct = () => {
            navigate('DetailProduct', {
              id: item.product.uuid,
              isFavorite: true,
              handleRefresh: fetchData,
              exp_promo: item.product.nft_exp_promo,
            });
          };
          return (
            <View style={styles.ctnItem}>
              <TouchableWithoutFeedback onPress={handleRedirectProduct}>
                <View style={styles.ctnImage}>
                  <Image
                    source={{
                      uri: `${URL_WEBSITE}${item.product.collections[0].image}`,
                    }}
                    style={styles.imgNft}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleRedirectProduct}>
                <View style={styles.centerItem}>
                  <Text style={styles.txtTitle}>{item.product.nft_title}</Text>
                  <HTMRenderer
                    tagsStyles={{
                      p: styles.txtDesc,
                    }}
                    content={
                      item.product.nft_description.length > 100
                        ? `${item.product.nft_description.substring(0, 45)}...`
                        : item.product.nft_description
                    }
                  />
                </View>
              </TouchableWithoutFeedback>
              <Image source={backIcon} style={styles.forwardIcon} />
            </View>
          );
        }}
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

export default connect(states)(WatchList);
