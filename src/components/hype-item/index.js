import React from 'react';
import {View, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {navigate} from '../../helpers/navigationRef';
import {URL_WEBSITE} from '../../helpers/static';
import HTMRenderer from '../html-renderer';
import styles from './styles';

const backIcon = require('../../assets/icon/forward_icon.png');

export default function HypeItem({item, fetchData}) {
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
}
