import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {fonts} from '../../shared/styling';
import styles from './styles';

function HTMRenderer({content, tagsStyles = {}}) {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.ctnRoot}>
      <RenderHtml
        systemFonts={[
          ...defaultSystemFonts,
          fonts.MontserratRegular,
          fonts.MontserratBold,
          fonts.MontserratSemiBold,
          fonts.MontserratBlack,
          fonts.MontserratLight,
        ]}
        baseStyle={styles.pStyle}
        contentWidth={width}
        source={{html: content}}
        tagsStyles={{
          p: styles.pStyle,
          h2: styles.h2Style,
          ...tagsStyles,
        }}
      />
    </View>
  );
}

export default HTMRenderer;
