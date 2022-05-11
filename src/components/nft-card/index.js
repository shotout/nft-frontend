import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {hexToRgbA} from '../../helpers/hexToRgba';
import {navigate} from '../../helpers/navigationRef';
import {addWatchlist, removeWatchlist} from '../../helpers/requests';
import {URL_WEBSITE} from '../../helpers/static';
import {useCountdown} from '../../hooks/useCountdown';
import {colors} from '../../shared/styling';
import styles from './styles';

const verifiedIcon = require('../../assets/icon/verified.png');
const groupIcon = require('../../assets/icon/group_icon.png');

const starsIcon = require('../../assets/icon/stars.png');
const hypeIcon = require('../../assets/icon/hype_white.png');

export default function NFTCard({item, isActive}) {
  const [loadingFavorite, setFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item.watch_list);
  const [days, hours, minutes, seconds] = useCountdown(item.nft_exp_promo);

  const handleFavorite = async () => {
    try {
      setFavorite(true);
      if (isFavorite) {
        await removeWatchlist(item.uuid);
      } else {
        await addWatchlist(item.uuid);
      }
      setIsFavorite(!isFavorite);
      setFavorite(false);
    } catch (err) {
      setFavorite(false);
    }
  };

  const navigateDetailProduct = () => {
    navigate('DetailProduct', {
      id: item.uuid,
      exp_promo: item.nft_exp_promo,
    });
  };

  const colorGradient = [
    item.preferance.gradient1_color,
    item.preferance.gradient2_color,
  ];

  function renderImage() {
    return (
      <ImageBackground
        source={{uri: `${URL_WEBSITE}${item.collections[0].image}`}}
        style={styles.nftContentStyle}>
        <View style={styles.ctnTitle}>
          <Text style={styles.txtTitle}>{item.nft_title}</Text>
          <View style={styles.ctnRow}>
            {item.is_verified === 1 && (
              <View style={styles.ctnVerified}>
                <Image source={verifiedIcon} style={styles.verifiedStyle} />
                <Text style={styles.txtVerified}>Verified</Text>
              </View>
            )}
            <LinearGradient
              colors={colorGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.ctnVerified, styles.noBorder]}>
              <Image
                source={{uri: `${URL_WEBSITE}${item.blockchain.vektor}`}}
                style={styles.cardanoIcon}
              />
              <Text style={styles.txtVerified}>{item.blockchain.name}</Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }

  function renderTime() {
    if (days + hours + minutes + seconds <= 0) {
      return (
        <LinearGradient
          colors={colorGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.ctnTime}>
          <Text style={styles.txtExpired}>Expired</Text>
        </LinearGradient>
      );
    }
    return (
      <LinearGradient
        colors={colorGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.ctnTime}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{days}</Text>
          <Text style={styles.timeDesc}>Day</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{hours}</Text>
          <Text style={styles.timeDesc}>Hrs</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{minutes}</Text>
          <Text style={styles.timeDesc}>Min</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{seconds}</Text>
          <Text style={styles.timeDesc}>Sec</Text>
        </View>
      </LinearGradient>
    );
  }

  function renderContent() {
    return (
      <View
        style={[
          styles.ctnContent,
          {backgroundColor: item.preferance.background_color},
        ]}>
        <View style={styles.descContentWrapper}>
          <View style={styles.ctnSubContent}>
            <Image source={hypeIcon} style={styles.iconHype} />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Hype</Text>
              <Text style={styles.txtSubContent}>{item.nft_type}</Text>
            </View>
          </View>
          <View style={styles.ctnSubContent}>
            <Image source={groupIcon} style={styles.iconContent} />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Amount</Text>
              <Text style={styles.txtSubContent}>{item.nft_amount}</Text>
            </View>
          </View>
          <View style={styles.ctnSubContent}>
            <Image
              source={{uri: `${URL_WEBSITE}${item.blockchain.vektor}`}}
              style={styles.iconContent}
            />
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Price</Text>
              <Text style={styles.txtSubContent}>{`${item.nft_price}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ctnDesc}>
          <Text style={styles.txtDesc}>{item.nft_description}</Text>
        </View>

        <LinearGradient
          style={styles.ctnButtonStyle}
          colors={[
            hexToRgbA(item.preferance.background_color, 0),
            hexToRgbA(item.preferance.background_color, 1),
          ]}
        />
      </View>
    );
  }

  function renderBottom() {
    if (isActive) {
      return (
        <View style={styles.ctnBottomButton}>
          <TouchableOpacity
            onPress={navigateDetailProduct}
            style={[
              styles.ctnBtn,
              {backgroundColor: item.preferance.main_color},
            ]}>
            <Text style={styles.txtBtn}>Discover</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={handleFavorite}>
            <View style={styles.ctnLove}>
              {loadingFavorite ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Image source={hypeIcon} style={styles.hypeIconStyle} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.ctnRoot}>
      <TouchableWithoutFeedback onPress={navigateDetailProduct}>
        <View style={styles.ctnCard}>
          {renderImage()}
          {renderTime()}
          {renderContent()}
          {renderBottom()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
