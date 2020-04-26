import React, { useRef, useLayoutEffect } from 'react';
import { loadMicroApp } from 'qiankun';
import { isUrl } from '@/utils/is';
// import { useMount } from '@umijs/hooks';
import { customAlphabet } from 'nanoid';
import NotFound from '@/component/NotFound';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

const MicroApp = ({ entry }) => {
  const container = useRef(null);
  const id = nanoid(10);
  useLayoutEffect(() => {
    loadMicroApp({
      name: `app${id}`,
      entry,
      container: `#${id}`,
    })
  }, []);

  if (isUrl(entry)) { return (<NotFound />) }
  return (
    <div ref={container} id={id} />
  )
}

export default MicroApp;
