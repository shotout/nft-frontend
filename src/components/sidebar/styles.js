import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone, isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: isIphoneXorAbove() ? moderateScale(40) : undefined,
  },
  ctnClose: {
    paddingVertical: moderateScale(20),
  },
  ctnSocial: {
    marginTop: moderateScale(40),
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
    width: '100%',
    paddingBottom: isIphone ? moderateScale(40) : 0,
  },
  bannerStyle: {
    width: moderateScale(220),
    height: moderateScale(220),
    resizeMode: 'contain',
  },
});
