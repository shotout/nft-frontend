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
    lineHeight: moderateScale(22),
    fontWeight: isIphone ? undefined : 'normal',
  },
  h2Style: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(22),
    marginBottom: moderateScale(0),
  },
});
