import React from "react";
import {render} from "react-dom";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import Test from "./Test";
import Vysledek from "./Vysledek";
import Historie from "./Historie";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Training from "./Training";


export default function App() {
    return (
        <>
            <Nav/>
            <div className="container px-4">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/test" component={Test}/>
                        <Route exact path="/test/vysledek" component={Vysledek}/>
                        <Route exact path="/trenink" component={Training}/>
                        <Route path="/historie" component={Historie}/>
                    </Switch>
                </Router>
            </div>
            <Footer/>
        </>
    );
}
const appDiv = document.getElementById("app");
render(<App/>, appDiv);