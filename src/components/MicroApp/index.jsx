import { useRef } from "react";
import { loadMicroApp } from "qiankun";
import { useMount, useUnmount } from "ahooks";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

const MicroApp = function({ entry, fullPath }) {
  const container = useRef(null);
  const containerID = useRef(nanoid(10));
  // const id = nanoid(10);
  const microApp = useRef(null);
  useMount(() => {
    microApp.current = loadMicroApp(
      {
        name: `app${containerID.current}`,
        entry,
        // container: `#${id}`,
        props: {
          basePath: fullPath,
        },
        container: `#${containerID.current}`,
      },
      {
        sandbox: { strictStyleIsolation: true },
        singular: false,
      },
    );
  });

  useUnmount(() => {
    microApp.current.getStatus() === "MOUNTED" ? microApp.current.unmount() : 0;
  });
  // if (isUrl(entry)) { return (<NotFound />) }
  return <div ref={container} id={containerID.current} />;
}

export default MicroApp;
