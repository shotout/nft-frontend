import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    marginBottom: moderateScale(80),
  },
  ctnCard: {
    borderWidth: moderateScale(12),
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: moderateScale(30),
    position: 'relative',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30),
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  txtTitle: {
    color: colors.dark,
    fontSize: moderateScale(28),
    fontFamily: fonts.MontserratBold,
    textAlign: 'center',
  },
  txtExplore: {
    color: colors.dark,
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratBold,
    marginTop: moderateScale(12),
  },
  txtDesc: {
    color: colors.dark,
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratSemiBold,
    lineHeight: moderateScale(24),
    marginTop: moderateScale(6),
  },
  txtWrapper: {
    alignSelf: 'center',
    padding: moderateScale(20),
  },
  mgTop16: {
    marginTop: moderateScale(24),
  },
  handIconStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: moderateScale(20),
  },
  ctnBottomButton: {
    marginBottom: moderateScale(-8),
    position: 'absolute',
    bottom: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ctnBtn: {
    backgroundColor: colors.dark,
    height: moderateScale(48),
    borderRadius: moderateScale(48 / 2.5),
    paddingHorizontal: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratSemiBold,
  },
  bgStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(18),
  },
});
