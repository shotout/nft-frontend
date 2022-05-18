import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdBnmNotification: {
    marginBottom: 0,
  },
  btnNoThanks: {
    paddingTop: moderateScale(16),
    paddingBottom: isIphoneXorAbove() ? moderateScale(28) : moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  txtNothanks: {
    textAlign: 'center',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
  },
});
