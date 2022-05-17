import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(18),
    marginTop: moderateScale(2),
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
  },
  ctnTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtWrapper: {
    flex: 1,
    paddingRight: moderateScale(12),
  },
  txtTitle: {
    fontFamily: fonts.MontserratBold,
    color: colors.dark,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  ctnAnswer: {
    flex: 1,
    marginTop: moderateScale(12),
  },
  txtAnswer: {
    fontSize: moderateScale(14),
    color: colors.grayText,
    fontFamily: fonts.MontserratRegular,
    lineHeight: moderateScale(22),
    marginTop: moderateScale(0),
    marginBottom: moderateScale(10),
  },
});
