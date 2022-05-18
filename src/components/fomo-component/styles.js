import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnFomo: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icnFomo: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: 'contain',
  },
  txtTitle: {
    fontFamily: fonts.MontserratBold,
    color: colors.dark,
    fontSize: moderateScale(32),
  },
  txtRed: {
    color: colors.red,
  },
  txtDesc: {
    fontSize: moderateScale(24),
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    marginTop: moderateScale(16),
    lineHeight: moderateScale(32),
  },
  notificationBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
    fontSize: moderateScale(13),
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
  ctnText: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: moderateScale(310),
    marginTop: moderateScale(12),
    // paddingHorizontal: moderateScale(10),
  },
});
