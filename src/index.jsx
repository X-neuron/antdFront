// react 18
// import * as ReactDOMClient from 'react-dom/client';
// react 17
import ReactDom from 'react-dom';
import { Suspense } from "react";
import PageLoading from "@/components/PageLoading";
// import { start } from "qiankun";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { start } from "qiankun";
import App from "./app";
import 'antd/dist/antd.variable.min.css';

// 真实线上环境 请注释掉mock
import runMock from "@/mock";

runMock();

const initalContainer = document.getElementById("root");

// react 18
// const root =  ReactDOMClient.createRoot(initalContainer);
// root.render(
//   <RecoilRoot>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </RecoilRoot>,
// );

ReactDom.render(
  <RecoilRoot>
    <BrowserRouter>
      <Suspense fallback={<PageLoading />} >
        <App />
      </Suspense>
    </BrowserRouter>
  </RecoilRoot>,
  initalContainer,
);

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
