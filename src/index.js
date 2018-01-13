// @flow
import React from "react"
import { render } from "react-dom"
import Calc from "./Calc"

const root = document.getElementById("root")
if (!root) {
    throw new Error("Error could not find root element")
}

render(<Calc />, root)
