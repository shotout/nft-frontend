import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    paddingBottom: isIphoneXorAbove() ? moderateScale(30) : moderateScale(20),
    marginTop: moderateScale(20),
  },
  backIconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    margin: moderateScale(20),
    resizeMode: 'contain',
  },
  ctnAnimation: {
    width: '100%',
    height: moderateScale(140),
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(12),
    color: colors.dark,
  },
  txtDesc: {
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(12),
    lineHeight: moderateScale(22),
    color: colors.dark,
  },
  ctnBack: {
    position: 'absolute',
    top: moderateScale(0),
    left: moderateScale(0),
  },
  topContainer: {
    flex: 1,
  },
});
