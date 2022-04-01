import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnInput: {
    height: moderateScale(48),
    borderBottomWidth: moderateScale(1),
    borderColor: colors.red,
    marginHorizontal: moderateScale(20),
    marginTop: '35%',
  },
  inputStyle: {
    flex: 1,
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
  },
});
