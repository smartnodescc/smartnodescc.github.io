// @flow
import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./Header"
import Home from "./Home"
import Calc from "./Calc"
import NotFound from "./NotFound"

const root = document.getElementById("root")
if (!root) {
    throw new Error("Error could not find root element")
}

render(
    <Router>
        <div className="container">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/calc" component={Calc} />
                <Route path="/" component={NotFound} />
            </Switch>

            <hr />

            <footer className="footer">
                <p>
                    <a href="http://smartnodes.cc">SmartNodes.cc</a> services provided by{" "}
                    <a href="https://forum.smartcash.cc/u/nflaw">nflaw</a> | Donate: SP8AVfZkThkPtf8WBfqnEmYi27FjHguJTB{" "}
                    <br /> GFX by <strong>trance929</strong> and <strong>camakin</strong> | Built and hosted on{" "}
                    <a href="https://github.com/smartnodescc">Github (open source project)</a>
                </p>
            </footer>
        </div>
    </Router>,
    root
)
