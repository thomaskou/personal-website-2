import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./services/redux";

ReactDOM.render(
    <Provider store={store}>
		<App/>
    </Provider>,
    document.getElementById("root")
);
