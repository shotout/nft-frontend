import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
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
    marginTop: moderateScale(30),
  },
  txtDesc: {
    color: colors.dark,
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratSemiBold,
    lineHeight: moderateScale(24),
  },
});
