import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnCard: {
    margin: moderateScale(20),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
    paddingBottom: moderateScale(8),
  },
  ctnItem: {
    marginBottom: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: moderateScale(16),
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
    marginBottom: moderateScale(2),
  },
  txtDesc: {
    fontSize: moderateScale(12),
    // color: colors.dark,
    fontFamily: fonts.MontserratRegular,
  },
  ctnLeft: {
    flex: 1,
    paddingRight: moderateScale(20),
  },
  forwardStyle: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',
    // marginLeft: moderateScale(16),
  },
  ctnScrollStyle: {
    flexGrow: 1,
  },
  btnStyle: {
    marginBottom: isIphoneXorAbove() ? moderateScale(28) : moderateScale(20),
  },
});
