import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnSlider: {
    width: '100%',
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(30),
  },
  ctnCollection: {
    marginHorizontal: moderateScale(20),
    aspectRatio: 1 / 1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgCollection: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
  ctnContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    paddingBottom: moderateScale(80),
    marginTop: moderateScale(20),
  },
  ctnTitle: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: moderateScale(28),
    fontFamily: fonts.MontserratBold,
    color: colors.dark,
  },
  verifiedIconStyle: {
    width: moderateScale(28),
    height: moderateScale(28),
    resizeMode: 'contain',
    marginLeft: moderateScale(8),
    bottom: moderateScale(-2),
  },
  descContentWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: moderateScale(12),
  },
  ctnSubContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContent: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  starIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  privateStarIcon: {
    width: moderateScale(50),
    height: moderateScale(50),
    top: moderateScale(-8),
    right: moderateScale(-6),
    marginLeft: moderateScale(-20),
  },
  ctnIconTab: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30 / 2),
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
  },
  contentWrapper: {
    marginLeft: moderateScale(9),
  },
  txtTopContent: {
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(12),
  },
  txtSubContent: {
    color: colors.dark,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  ctnDescription: {
    padding: moderateScale(20),
    paddingTop: 0,
  },
  txtDescription: {
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  ctnTime: {
    paddingVertical: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    borderRadius: moderateScale(30),
  },
  timeWrapper: {
    marginHorizontal: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTitle: {
    color: '#fff',
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
  },
  timeDesc: {
    color: '#fff',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    marginTop: moderateScale(4),
  },
  ctnRaffle: {
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  txtRaffle: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(22),
    marginBottom: moderateScale(8),
  },
  ctnCommunity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  icnCommunity: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  socialIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  txtCommunity: {
    color: colors.dark,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(8),
  },
  ctnGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: moderateScale(80),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  ctnScroll: {
    flexGrow: 1,
  },
  dotWrapper: {
    position: 'absolute',
    bottom: moderateScale(-20),
    alignSelf: 'center',
    width: '100%',
  },
  dotContainerStyle: {
    marginHorizontal: moderateScale(2),
  },
  inactiveDotStyle: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: '#cfcfcf',
  },
  dotStyle: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#fff',
  },
  txtExpired: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratSemiBold,
    textAlign: 'center',
  },
  txtHype: {
    color: colors.red,
    fontFamily: fonts.MontserratBold,
  },
  ctnLink: {
    marginTop: moderateScale(6),
  },
  ctnSvg: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  ctnAsset: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  imgContentStyle: {
    width: '100%',
    height: '100%',
  },
});
