import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnTitle: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(12),
  },
  txtTitle: {
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(28),
  },
});
