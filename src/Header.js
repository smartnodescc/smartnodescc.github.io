import React from "react"
import { withRouter } from "react-router"

const isActive = (pathname, route, exact) => {
    if (exact) {
        return pathname === route ? "active" : undefined
    }
    return pathname.includes(route) ? "active" : undefined
}

const Header = ({ location }) => (
    <div className="header clearfix">
        <nav>
            <ul className="nav nav-pills pull-right">
                <li role="presentation" className={isActive(location.pathname, "/", true)}>
                    <a href="/">Home</a>
                </li>
                <li role="presentation" className={isActive(location.pathname, "calc")}>
                    <a href="/calc">Calculator</a>
                </li>
            </ul>
        </nav>

        <a href="http://smartnodes.cc">
            <img src="/img/smartnodes.png" alt="SmartNodes.cc Logo" />
        </a>
    </div>
)

export default withRouter(Header)
