import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  mainWrapper: {
    marginTop: '35%',
    marginHorizontal: moderateScale(20),
  },
  ctnInput: {
    height: moderateScale(48),
    borderBottomWidth: moderateScale(1),
    borderColor: colors.red,
  },
  inputStyle: {
    flex: 1,
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    fontSize: moderateScale(14),
  },
  txtLimit: {
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    paddingTop: moderateScale(8),
    fontSize: moderateScale(12),
  },
  txtRed: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.red,
    paddingTop: moderateScale(8),
    fontSize: moderateScale(11),
  },
});
