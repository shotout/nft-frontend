import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnScroll: {
    paddingTop: moderateScale(20),
  },
  ctnEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    color: colors.dark,
    marginTop: moderateScale(10),
  },
  ctnInfo: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
  },
  txtInfo: {
    textAlign: 'center',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
  },
});
