import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import LoadingIndicator from '../loading-indicator';

export default function RenderAsset({id}) {
  const [loadingAsset, setLoadingAsset] = useState(true);
  const [urlAsset, setUrlAsset] = useState(null);

  const fetchAsset = () => {
    const URL = `https://cdn.contentful.com/spaces/iekxawt54bzj/environments/master/assets/${id}`;
    const params = {
      access_token: 'PnEziYatZ-FrHJ-vus9Uxry0gJNXMU2g0dd-EB2xKOQ',
    };
    axios.get(URL, {params}).then(response => {
      setUrlAsset(`https:${response.data.fields.file.url}`);
      setLoadingAsset(false);
    });
  };

  useEffect(() => {
    fetchAsset();
  }, []);

  if (loadingAsset) {
    return (
      <View style={{width: 100, height: 100, alignSelf: 'center'}}>
        <LoadingIndicator fullscreen />
      </View>
    );
  }
  return (
    <Image
      source={{uri: urlAsset}}
      style={{
        width: '100%',
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
        borderRadius: moderateScale(20),
      }}
    />
  );
}
