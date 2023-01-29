import React, {Component} from "react";
import Test from "./Test";
import Historie from "./Historie";
import Vysledek from "./Vysledek";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container bg-gray-200 rounded-xl shadow border p-8 m-10">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <h1 className="text-3xl font-bold underline">This is the home page</h1>
                        </Route>
                        <Route exact path="/test" component={Test}/>
                        <Route exact path="/test/vysledek" component={Vysledek}/>
                        <Route path="/historie" component={Historie}/>
                    </Switch>
                </Router>
            </div>)
    }
}