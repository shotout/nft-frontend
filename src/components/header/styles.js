import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(60),
  },
  ctnBack: {
    position: 'absolute',
    left: moderateScale(20),
  },
  backWrapper: {
    width: moderateScale(80),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  ctnTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  ethRedStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: 'contain',
  },
  txtTitle: {
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    fontSize: moderateScale(14),
  },
});
