import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  itemWrapper: {
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(28),
    paddingBottom: moderateScale(12),
    borderRadius: moderateScale(20),
  },
  txtTitle: {
    textAlign: 'center',
    color: colors.dark,
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
  },
  txtSubmit: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: colors.red,
    fontFamily: fonts.MontserratSemiBold,
  },
  ratingStyle: {
    marginTop: moderateScale(20),
  },
  ratingImageStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
    marginTop: moderateScale(20),
  },
  ctnIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnClose: {
    position: 'absolute',
    top: moderateScale(24),
    right: moderateScale(20),
  },
  btnStyle: {
    width: '100%',
  },
  headerImageStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
    marginBottom: moderateScale(20),
  },
});
