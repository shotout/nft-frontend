import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  descContentWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: moderateScale(12),
  },
  ctnSubContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContent: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  starIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  privateStarIcon: {
    width: moderateScale(50),
    height: moderateScale(50),
    top: moderateScale(-8),
    right: moderateScale(-6),
    marginLeft: moderateScale(-20),
  },
  ctnIconTab: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30 / 2),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    marginLeft: moderateScale(9),
  },
  txtTopContent: {
    color: colors.dark,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(12),
  },
  txtSubContent: {
    color: colors.dark,
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  ctnSvg: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
