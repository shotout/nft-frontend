import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottieWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(280),
  },
  txtLoader: {
    fontSize: moderateScale(14),
    color: colors.dark,
    fontFamily: fonts.MontserratSemiBold,
    top: moderateScale(-34),
  },
  txtPercentage: {
    color: '#BFB9D7',
    fontSize: moderateScale(150),
    fontFamily: fonts.MontserratBold,
    top: moderateScale(20),
  },
  percent: {
    fontSize: moderateScale(40),
  },
});
