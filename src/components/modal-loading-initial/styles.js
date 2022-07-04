import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: '43%',
  },
  lottieWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(260),
  },
  txtLoader: {
    fontSize: moderateScale(16),
    color: colors.dark,
    fontFamily: fonts.MontserratSemiBold,
    top: moderateScale(-4),
    textAlign: 'center',
  },
  txtPercentage: {
    color: '#BFB9D7',
    fontSize: moderateScale(200),
    fontFamily: fonts.MontserratBold,
    top: moderateScale(20),
    right: moderateScale(-16),
  },
  percent: {
    fontSize: moderateScale(30),
    right: 0,
  },
  lottieStyle: {},
});
