import React from "react";
import { render } from "react-dom";
import Test from "./Test";
import Nav from './Nav'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default function App(){
    return (
        <div>
            <Nav />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <p>This is the home page</p>
                    </Route>
                    <Route path="/test" component={Test} />
                </Switch>
            </Router>
        </div>
    );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);