import React, {Component} from "react";
import Test from "./Test";
import Historie from "./Historie";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default class Home extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <p>This is the home page</p>
                        </Route>
                        <Route path="/test" component={Test} />
                        <Route path="/historie" component={Historie} />
                    </Switch>
                </Router>
            </div>)
    }
}