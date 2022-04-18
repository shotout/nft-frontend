import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
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
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratRegular,
  },
  socialIconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginLeft: moderateScale(6),
  },
});
