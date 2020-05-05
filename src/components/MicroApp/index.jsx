import React, { useRef } from 'react';
import { loadMicroApp } from 'qiankun';
import { useMount, useUnmount } from '@umijs/hooks';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

const MicroApp = ({ entry, params }) => {
  const container = useRef(null);
  const id = nanoid(10);
  const microApp = useRef(null);

  useMount(() => {
    microApp.current = loadMicroApp({
      name: `app${id}`,
      entry,
      container: `#${id}`,
    }, {
      sandbox: { strictStyleIsolation: true },
      singular: false
    });
  });

  useUnmount(() => {
    microApp.current ? microApp.current.unmount() : 0;
  })
  // if (isUrl(entry)) { return (<NotFound />) }
  return (
    <div ref={container} id={id} />
  )
}

export default MicroApp;
