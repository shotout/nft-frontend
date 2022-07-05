import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: '30%',
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
    textAlign: 'center',
  },
  txtPercentage: {
    color: '#BFB9D7',
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(200),
    top: moderateScale(20),
    right: moderateScale(-16),
  },
  percent: {
    fontSize: moderateScale(30),
    color: '#BFB9D7',
    fontFamily: fonts.MontserratBold,
    bottom: moderateScale(24),
    marginLeft: moderateScale(8),
  },
  lottieStyle: {},
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  ctnTextLoader: {
    width: '100%',
    top: moderateScale(28),
    minHeight: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
