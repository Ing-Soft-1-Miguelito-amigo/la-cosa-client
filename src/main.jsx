import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { Provider } from 'react-redux';
import { store } from "./redux/store";

const domNode = document.getElementById("root");
const root = ReactDOM.createRoot(domNode);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)