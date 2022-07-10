import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {fonts} from '../../shared/styling';
import styles from './styles';

function HTMRenderer({content, tagsStyles = {}, renderers = {}}) {
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
          h1: styles.h1Style,
          h2: styles.h2Style,
          h3: styles.h3Style,
          h4: styles.h4Style,
          h5: styles.h5Style,
          ul: styles.ulStyle,
          li: styles.liStyle,
          ...tagsStyles,
        }}
        renderers={renderers}
      />
    </View>
  );
}

export default HTMRenderer;
