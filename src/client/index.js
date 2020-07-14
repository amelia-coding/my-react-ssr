import { loadableReady } from "@loadable/component";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import createStore from "../store/index";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || undefined;
const store = createStore(preloadedState);

loadableReady().then(() => {
  // hydrate复用服务端渲染api
  ReactDom.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("app")
  );
});
