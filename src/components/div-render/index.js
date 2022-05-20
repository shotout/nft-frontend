import React from 'react';
import {domNodeToHTMLString} from 'react-native-render-html';
import RenderAsset from './RenderAsset';

export default function DivRender({TDefaultRenderer, ...props}) {
  const html = React.useMemo(
    () => domNodeToHTMLString(props.tnode.domNode),
    [props.tnode],
  );

  const isDivAsset = html.includes('<div>Asset#');

  if (isDivAsset) {
    const regex = /(<([^>]+)>)/gi;
    const replaceHTML = html.replace(regex, '');
    const getIdContent = replaceHTML.split('#').pop();
    return <RenderAsset id={getIdContent} />;
  }
  return <TDefaultRenderer {...props} />;
}
