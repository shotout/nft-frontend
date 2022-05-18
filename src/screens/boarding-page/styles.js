import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  getDimensionHeight,
  getDimensionWidth,
} from '../../helpers/getDimensions';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ctnWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: moderateScale(200),
    paddingHorizontal: moderateScale(20),
  },
  txtContent: {
    fontFamily: fonts.MontserratSemiBold,
    color: colors.white,
    fontSize: moderateScale(46),
  },
  txtRed: {
    color: colors.red,
    fontFamily: fonts.MontserratBold,
  },
  ctnSignIn: {
    paddingBottom: moderateScale(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSignIn: {
    color: colors.white,
    fontFamily: fonts.MontserratRegular,
    textDecorationLine: 'underline',
    fontSize: moderateScale(14),
  },
  notificationBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: moderateScale(30),
  },
  ctnNotification: {
    width: moderateScale(50),
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(4),
    marginRight: moderateScale(12),
    alignSelf: 'center',
  },
  notificationStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  ctnNotifItem: {
    flex: 1,
  },
  txtNotif: {
    fontFamily: fonts.MontserratSemiBold,
    color: '#000',
    fontSize: moderateScale(16),
  },
  txtDescNotif: {
    color: '#000',
    fontFamily: fonts.MontserratRegular,
  },
  rightIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    // aspectRatio: 1 / 1,
    borderRadius: moderateScale(12),
    marginTop: moderateScale(8),
  },
  rightNotif: {
    marginLeft: moderateScale(12),
    // justifyContent: 'center',
    alignItems: 'center',
  },
  txtTime: {
    fontFamily: fonts.MontserratRegular,
  },
  videoRootStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: getDimensionWidth(1),
    height: getDimensionHeight(1),
  },
});
