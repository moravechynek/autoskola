import React from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";


export default function App(){
    return (
        <div>
            <Nav />
            <Home />
            <Footer />
        </div>
    );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);