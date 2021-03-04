import ReactDom from "react-dom";

// import { start } from "qiankun";
import App from "./app";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
// 生产环境 请注释掉mock
// import mock from "./mock";

// mock();

const initalContainer = document.getElementById("root");


ReactDom.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  initalContainer
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
      }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
      });
  });
}

// start();

