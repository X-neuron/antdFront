import { useMount, useUnmount } from "ahooks";
import { customAlphabet } from "nanoid";
import type { MicroApp as MicroApp4Qiankun } from "qiankun";
import { loadMicroApp } from "qiankun";
import React, { useRef } from "react";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

interface Props {
  entry: string;
  fullPath: string;
}

const MicroApp: React.FC<Props> = ({ entry, fullPath }) => {
  const container = useRef(null);
  const containerID = useRef<string>(nanoid());
  const microApp = useRef<MicroApp4Qiankun | null>(null);

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
    if ((microApp.current as MicroApp4Qiankun).getStatus() === "MOUNTED") {
      return (microApp.current as MicroApp4Qiankun).unmount();
    }
    return 0;
  });

  // if (isUrl(entry)) { return (<NotFound />) }
  return <div ref={container} id={containerID.current} />;
};

export default MicroApp;
