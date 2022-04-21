import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnTitle: {
    marginHorizontal: moderateScale(20),
    // paddingTop: moderateScale(12),
  },
  txtTitle: {
    color: colors.dark,
    fontSize: moderateScale(28),
    fontFamily: fonts.MontserratSemiBold,
  },
  txtDayTitle: {
    color: colors.dark,
    fontSize: moderateScale(30),
    fontFamily: fonts.MontserratBold,
  },
  ctnScroll: {
    paddingBottom: moderateScale(20),
  },
  ctnRoot: {
    backgroundColor: '#fff',
  },
});
