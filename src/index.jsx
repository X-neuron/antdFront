import ReactDom from "react-dom";

// import { start } from "qiankun";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { start } from "qiankun";
import App from "./app";

// 真实线上环境 请注释掉mock
import runMock from "@/mock";

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
