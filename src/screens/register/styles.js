import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnTop: {
    flex: 1,
  },
  ctnDesc: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(6),
  },
  txtDesc: {
    color: colors.dark,
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratSemiBold,
    lineHeight: moderateScale(24),
  },
  cntWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(40),
  },
  ctnWallet: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(40),
  },
  icnWallet: {
    margin: moderateScale(2),
    width: moderateScale(58),
    height: moderateScale(58),
    borderRadius: moderateScale(58 / 2),
    marginBottom: moderateScale(8),
    // overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(1),
  },
  walletIcoStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(48 / 2),
    marginBottom: moderateScale(8),
    resizeMode: 'contain',
    top: moderateScale(4),
  },
  txtWallet: {
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
  },
  bgWallet: {
    backgroundColor: colors.gray,
    borderRadius: moderateScale(48 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnBanner: {
    width: '100%',
    aspectRatio: 281 / 315,
    // backgroundColor: 'red',
  },
  bannerStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  redBorder: {
    borderColor: colors.red,
    borderWidth: moderateScale(2),
  },
  ctnDescDone: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(30),
  },
  txtDescDone: {
    color: colors.dark,
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratSemiBold,
    lineHeight: moderateScale(24),
  },
  btnStyle: {
    marginBottom: isIphoneXorAbove() ? moderateScale(42) : moderateScale(20),
  },
  pdBtmNormal: {
    marginBottom: 0,
  },
  btnNoThanks: {
    paddingTop: moderateScale(16),
    paddingBottom: isIphoneXorAbove() ? moderateScale(42) : moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  txtNothanks: {
    textAlign: 'center',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
  },
  ctnReceiveEmail: {
    paddingHorizontal: moderateScale(32),
    flexDirection: 'row',
    marginTop: moderateScale(28),
    alignItems: 'center',
  },
  ctnCheckbox: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1.2),
    borderRadius: moderateScale(8),
  },
  ctnTextEmail: {
    marginLeft: moderateScale(12),
    // flexWrap: 'wrap',
    // backgroundColor: 'red',
    flex: 1,
  },
  txtEmail: {
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    flexShrink: 1,
  },
  ctnProgress: {
    marginHorizontal: moderateScale(20),
  },
  progressStyle: {
    width: '100%',
    resizeMode: 'contain',
  },
});
