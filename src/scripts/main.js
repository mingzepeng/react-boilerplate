require("../styles/style.css")
require('es6-promise').polyfill() //promise polyfill
import ReactDom from 'react-dom'
import React from 'react'
import App from './components/app'

ReactDom.render(<App/>, document.querySelector('#root'));
