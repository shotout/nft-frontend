import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    // flex: 1,
    position: 'relative',
    // backgroundColor: 'red',
    // minHeight: 60,
  },
  pStyle: {
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(24),
    fontWeight: isIphone ? undefined : 'normal',
    marginTop: 0,
    marginBottom: moderateScale(20),
  },
  h1Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(24),
    marginBottom: moderateScale(0),
  },
  h2Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(22),
    marginBottom: moderateScale(0),
  },
  h3Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    marginBottom: moderateScale(0),
  },
  h4Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(18),
    marginBottom: moderateScale(0),
  },
  h5Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
    marginBottom: moderateScale(0),
  },
  ulStyle: {
    paddingLeft: moderateScale(10),
    alignItems: 'center',
    lineHeight: moderateScale(24),
  },
  liStyle: {
    paddingLeft: moderateScale(4),
  },
});
