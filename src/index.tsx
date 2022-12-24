import { start } from "qiankun";
// react 17
import React,{ Suspense } from "react";
// import ReactDom from "react-dom";
// react 18
import * as ReactDOMClient from 'react-dom/client';
import { PageLoading } from "@ant-design/pro-components";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
// 真实线上环境 请注释掉mock
import runMock from "@/mock";

import App from "./app";

runMock();

const initalContainer = document.getElementById("root") as Element;

// react 18
const root =  ReactDOMClient.createRoot(initalContainer);
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Suspense fallback={<PageLoading />} >
        <App />
      </Suspense>
    </BrowserRouter>
  </RecoilRoot>,
);

// ReactDom.render(
//   <RecoilRoot>
//     <BrowserRouter>
//       <Suspense fallback={<PageLoading />} >
//         <App />
//       </Suspense>
//     </BrowserRouter>
//   </RecoilRoot>,
//   initalContainer,
// );

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

start();
