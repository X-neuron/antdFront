import React, { useRef } from 'react';
import { loadMicroApp } from 'qiankun';
// import { isUrl } from '@/utils/is';
import { useMount, useUnmount } from '@umijs/hooks';
import { customAlphabet } from 'nanoid';
// import NotFound from '@/component/NotFound';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10);

const MicroApp = ({ entry }) => {
  const container = useRef(null);
  const id = nanoid(10);
  const microApp = useRef(null);
  // const documentVisibility = useDocumentVisibility()

  // useEffect(() => {
  //   const microApp = loadMicroApp({
  //     name: `app${id}`,
  //     entry,
  //     container: `#${id}`,
  //   });

  //   return () => microApp.unmount();
  // }, [entry, id]);

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
