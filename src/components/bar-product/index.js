import React from 'react';
import {View, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import styles from './styles';
import states from './states';
import Flame from '../../assets/icon/svg/Flame';
import {colors} from '../../shared/styling';
import {useHypeFlame} from '../../hooks/useHypeFlame';
import {URL_WEBSITE} from '../../helpers/static';

const groupIcon = require('../../assets/icon/user_group.png');
const hypeGif = require('../../assets/icon/flame.gif');

function BarProduct({detail, listHype, hypeAmount}) {
  const selectAmountHype = id => {
    const getItem = listHype.find(item => item.idProject === id);
    // console.log('Cehck value getItem', getItem);
    return getItem;
  };

  const storedData = selectAmountHype(detail.uuid);
  const isHypeFlameActive = storedData?.dateAdded
    ? Date.now() - storedData.dateAdded > 60
    : false;
  const {hypeValue} = useHypeFlame(storedData, hypeAmount);

  return (
    <View style={styles.descContentWrapper}>
      <View style={styles.ctnSubContent}>
        {isHypeFlameActive ? (
          <Image source={hypeGif} style={styles.privateStarIcon} />
        ) : (
          <View style={styles.ctnIconTab}>
            <Flame
              width={moderateScale(15)}
              height={moderateScale(17)}
              color={colors.red}
            />
          </View>
        )}
        <View style={styles.contentWrapper}>
          <Text style={styles.txtTopContent}>Hype</Text>
          <Text
            style={[
              styles.txtSubContent,
              isHypeFlameActive ? styles.txtHype : {},
            ]}>
            {hypeValue}
          </Text>
        </View>
      </View>
      <View style={styles.ctnSubContent}>
        <View style={styles.ctnIconTab}>
          <Image source={groupIcon} style={styles.iconContent} />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.txtTopContent}>Amount</Text>
          <Text style={styles.txtSubContent}>{detail.nft_amount}</Text>
        </View>
      </View>
      <View style={styles.ctnSubContent}>
        <View style={styles.ctnIconTab}>
          {/* <Image
            source={{uri: `${URL_WEBSITE}${detail.blockchain.vektor}`}}
            style={styles.iconContent}
          /> */}
          <View style={styles.ctnSvg}>
            <SvgUri
              width="100%"
              height="100%"
              uri={`${URL_WEBSITE}${detail.blockchain.vektor}`}
              fill={detail.preferance.main_color}
              color={detail.preferance.main_color}
            />
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.txtTopContent}>Price</Text>
          <Text style={styles.txtSubContent}>{`${detail.nft_price} ${
            detail.blockchain?.abbreviation || ''
          }`}</Text>
        </View>
      </View>
    </View>
  );
}
export default connect(states)(BarProduct);
