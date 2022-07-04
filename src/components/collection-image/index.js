import React, {useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import styles from './styles';

const loadingImage = require('../../assets/icon/load_image_loading.json');

export default function CollectionImage({imageUrl}) {
  const [isLoading, setLoading] = useState(false);

  function renderLoader() {
    if (isLoading) {
      return (
        <View style={styles.ctnLoading}>
          <LottieView
            source={loadingImage}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
          <Text style={styles.txtLoading}>Loading content...</Text>
        </View>
      );
    }
    return null;
  }
  return (
    <View style={styles.ctnCollection}>
      <FastImage
        source={{
          uri: imageUrl,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        onProgress={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        style={styles.imgCollection}
      />
      {renderLoader()}
    </View>
  );
}
