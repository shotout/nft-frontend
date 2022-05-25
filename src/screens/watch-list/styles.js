import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ctnScroll: {
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  ctnEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    color: colors.dark,
    marginTop: moderateScale(10),
  },
  ctnInfo: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    position: 'absolute',
    bottom: isIphoneXorAbove() ? moderateScale(20) : 0,
    width: '100%',
  },
  txtInfo: {
    textAlign: 'center',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(14),
    fontStyle: 'italic',
  },
  ctnHidden: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.pink,
    marginHorizontal: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingRight: moderateScale(40),
    marginTop: moderateScale(2),
    marginBottom: moderateScale(18),
    borderRadius: moderateScale(50),
    height: moderateScale(100),
  },
});
