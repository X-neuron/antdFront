import { start } from "qiankun";
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// 真实线上环境 请注释掉mock
import runMock from "@/mock";

import App from "./app";

runMock();

const initalContainer = document.getElementById("root");

ReactDom.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
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
