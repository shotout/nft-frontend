import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone, isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    paddingTop: isIphoneXorAbove() ? moderateScale(40) : undefined,
  },
  ctnClose: {
    paddingVertical: moderateScale(20),
  },
  ctnSocial: {
    marginTop: moderateScale(30),
    borderBottomColor: colors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    marginBottom: moderateScale(12),
    paddingBottom: moderateScale(4),
    alignSelf: 'flex-start',
    paddingRight: moderateScale(20),
  },
  txtTitleSocial: {
    fontFamily: fonts.MontserratSemiBold,
  },
  ctnMenu: {
    paddingVertical: moderateScale(4),
  },
  txtMenu: {
    color: colors.dark,
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratRegular,
  },
  socialIconStyle: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',
    marginLeft: moderateScale(6),
    top: moderateScale(1),
  },
  topWrapper: {
    flex: 1,
  },
  ctBanner: {
    width: '90%',
    aspectRatio: 1 / 1,
    marginBottom: windowHeight > 700 ? moderateScale(40) : 0,
    marginTop: moderateScale(40),
    paddingHorizontal: moderateScale(10),
  },
  bannerStyle: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
  scrollCtn: {
    flexGrow: 1,
  },
  ctnHorizontal: {
    paddingHorizontal: moderateScale(20),
  },
});
