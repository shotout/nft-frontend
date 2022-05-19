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
import {SvgUri, SvgXml} from 'react-native-svg';
import {connect} from 'react-redux';
import {hexToRgbA} from '../../helpers/hexToRgba';
import {navigate} from '../../helpers/navigationRef';
import {addWatchlist, removeWatchlist} from '../../helpers/requests';
import {URL_WEBSITE} from '../../helpers/static';
import {useCountdown} from '../../hooks/useCountdown';
import {colors} from '../../shared/styling';
import styles from './styles';
import Flame from '../../assets/icon/svg/Flame';
import HTMRenderer from '../html-renderer';
import states from './states';
import dispatcher from './dispatcher';
import verifiedIcon from '../../assets/icon/verified.svg';

// const verifiedIcon = require('../../assets/icon/verified.png');
const groupIcon = require('../../assets/icon/group_icon.png');

const hypeIcon = require('../../assets/icon/hype_white.png');

function NFTCard({
  item,
  isActive,
  handleRefresh,
  selectAmountHype,
  setHypeList,
  listHype,
}) {
  const [loadingFavorite, setFavorite] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item.watch_list);
  const [days, hours, minutes, seconds] = useCountdown(item.nft_exp_promo);
  const storedData = selectAmountHype(item.uuid);
  const [svgContent, setSvgContent] = useState(
    `${URL_WEBSITE}${item.blockchain?.vektor}`,
  );

  const handleHypeList = value => {
    const restructureData = listHype.map(content => {
      if (content.idProject === item.uuid) {
        return {
          ...content,
          currentAmount: value,
        };
      }
      return content;
    });
    setHypeList(restructureData);
  };

  const handleFavorite = async () => {
    try {
      setFavorite(true);
      if (isFavorite) {
        await removeWatchlist(item.uuid);
        handleHypeList((storedData?.currentAmount || 0) - 1);
      } else {
        await addWatchlist(item.uuid);
        handleHypeList((storedData?.currentAmount || 0) + 1);
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
      isFavorite,
      handleRefresh,
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
          <View style={styles.rowTitle}>
            <Text
              style={[
                styles.txtTitle,
                {color: item?.preferance?.headline_color || undefined},
              ]}>
              {item.nft_title}
            </Text>
            {item.is_verified === 1 && (
              <View style={styles.verifiedStyle}>
                <SvgXml
                  xml={verifiedIcon}
                  width="100%"
                  height="100%"
                  fill={item?.preferance?.badge_color}
                  color={item?.preferance?.badge_color}
                />
              </View>
            )}
          </View>
          <View style={styles.ctnRow}>
            <LinearGradient
              colors={colorGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.ctnVerified, styles.noBorder]}>
              {/* <Image
                source={{uri: `${URL_WEBSITE}${item.blockchain?.vektor}`}}
                style={styles.cardanoIcon}
              /> */}
              {item.blockchain?.vektor && (
                <View style={styles.ctnSvg}>
                  <SvgUri
                    // onError={() => {
                    //   setSvgContent(
                    //     'https://cryptologos.cc/logos/solana-sol-logo.svg',
                    //   );
                    // }}
                    uri={svgContent}
                    width="100%"
                    height="100%"
                    fill="#fff"
                    color="#fff"
                  />
                </View>
              )}
              <Text style={styles.txtVerified}>{item.blockchain?.name}</Text>
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
    // console.log('Check item:', item);
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
              <Text style={styles.txtSubContent}>
                {storedData?.currentAmount || 0}
              </Text>
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
            {/* <Image
              source={{uri: `${URL_WEBSITE}${item.blockchain?.vektor}`}}
              style={styles.iconContent}
            /> */}
            {item.blockchain?.vektor && (
              <View style={styles.ctnSvgContent}>
                <SvgUri
                  // onError={() => {
                  //   setSvgContent(
                  //     'https://cryptologos.cc/logos/solana-sol-logo.svg',
                  //   );
                  // }}
                  uri={svgContent}
                  width="100%"
                  height="100%"
                  fill="#fff"
                  color="#fff"
                />
              </View>
            )}
            <View style={styles.contentWrapper}>
              <Text style={styles.txtTopContent}>Price</Text>
              <Text style={styles.txtSubContent}>{`${item.nft_price} ${
                item.blockchain?.abbreviation || ''
              }`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ctnDesc}>
          <HTMRenderer
            tagsStyles={{
              p: styles.pStyle,
            }}
            content={item.nft_description}
          />
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
                <Flame color={isFavorite ? colors.red : colors.white} />
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

export default connect(states, dispatcher)(NFTCard);
