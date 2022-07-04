import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnCollection: {
    marginHorizontal: moderateScale(20),
    aspectRatio: 1 / 1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    overflow: 'hidden',
  },
  imgCollection: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
  ctnLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtLoading: {
    fontFamily: fonts.MontserratSemiBold,
    color: '#000',
    fontSize: moderateScale(14),
    marginTop: moderateScale(8),
    paddingBottom: moderateScale(40),
    textAlign: 'center',
  },
});
