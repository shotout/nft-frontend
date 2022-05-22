import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: moderateScale(20),
    marginTop: moderateScale(2),
    marginBottom: moderateScale(18),
    borderRadius: moderateScale(50),
  },
  ctnImage: {
    width: moderateScale(60),
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(60 / 2),
    overflow: 'hidden',
    marginRight: moderateScale(16),
  },
  centerItem: {
    flex: 1,
  },
  imgNft: {
    flex: 1,
    resizeMode: 'cover',
  },
  txtTitle: {
    fontFamily: fonts.MontserratBold,
    color: colors.dark,
    fontSize: moderateScale(16),
  },
  txtDesc: {
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(12),
    marginTop: moderateScale(2),
    marginBottom: 0,
    lineHeight: moderateScale(18),
  },
  forwardIcon: {
    width: moderateScale(28),
    height: moderateScale(28),
    resizeMode: 'contain',
    marginLeft: moderateScale(16),
  },
});
