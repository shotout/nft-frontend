import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone, isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

const getHeaderHeight = () => {
  if (Platform.isPad) {
    return moderateScale(60);
  }
  if (isIphoneXorAbove()) {
    return moderateScale(80);
  }
  if (isIphone) {
    return moderateScale(90);
  }
  return moderateScale(50);
};

export default StyleSheet.create({
  ctnRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    height: getHeaderHeight(),
    paddingTop: isIphoneXorAbove() ? moderateScale(40) : undefined,
  },
  shadowHeader: {
    // backgroundColor: 'red',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ctnBack: {
    position: 'absolute',
    left: moderateScale(20),
    top: isIphoneXorAbove() ? moderateScale(40) : undefined,
    zIndex: 9999,
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
  menuStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
  ctnTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  ethRedStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(12),
  },
  txtTitle: {
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    fontSize: moderateScale(14),
  },
  txtSkip: {
    fontFamily: fonts.MontserratRegular,
    color: colors.dark,
    fontSize: moderateScale(14),
  },
  txtWithTitle: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(18),
    color: colors.dark,
    textDecorationLine: 'underline',
  },
  ctnWatchlist: {
    position: 'absolute',
    right: moderateScale(20),
    top: isIphoneXorAbove() ? moderateScale(48) : undefined,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnShare: {
    marginRight: moderateScale(14),
  },
  hypeIconStyle: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
});
