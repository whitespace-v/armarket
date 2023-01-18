import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import App from "./App";
import {setupStore} from "./store/store";
import Item from "./Pages/Item/Item";
import Auth from "./Pages/Auth/Auth";
import SignUp from "./Pages/Auth/SignUp";
import Privacy from "./Pages/Privacy/Privacy";
import About from "./Pages/About/About";
import Contacts from "./Pages/Contacts/Contacts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <Routes>
                <Route path="shop" element={<App/>}/>
                <Route path="auth" element={<Auth/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="item/:id" element={<Item/>}/>
                <Route path="privacy" element={<Privacy/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="contacts" element={<Contacts/>}/>
                <Route path="*" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);
