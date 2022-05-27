import {StyleSheet, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

const isAndroid = Platform.OS === 'android';

export default StyleSheet.create({
  ctnTitle: {
    marginHorizontal: moderateScale(20),
    // paddingTop: moderateScale(12),
  },
  txtTitle: {
    color: colors.dark,
    fontSize: moderateScale(28),
    fontFamily: fonts.MontserratSemiBold,
  },
  txtDayTitle: {
    color: colors.dark,
    fontSize: moderateScale(30),
    fontFamily: fonts.MontserratBold,
  },
  txtName: {
    color: colors.dark,
    fontSize: moderateScale(18),
    fontFamily: fonts.MontserratRegular,
  },
  ctnScroll: {
    paddingBottom: moderateScale(20),
  },
  ctnRoot: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  ctnMain: {
    flex: 1,
    backgroundColor: 'red',
  },
  cardWrapper: {
    position: 'relative',
  },
  overalyWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingRight: moderateScale(20),
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(126),
    marginTop: moderateScale(12),
  },
  overlay: {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    borderRadius: moderateScale(30),
    marginTop: moderateScale(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  mgMin4: {
    marginTop: moderateScale(22),
    // backgroundColor: 'blue',
  },
  mgMin8: {
    width: '100%',
    height: '100%',
    marginTop: moderateScale(26),
    // backgroundColor: 'yellow',
  },
  carouselWrapper: {
    elevation: isAndroid ? 10 : undefined,
    zIndex: 10,
  },
  ctnLoader: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
