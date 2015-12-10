require("../styles/style.css")
require('es6-promise').polyfill() //promise polyfill
import ReactDom from 'react-dom'
import React from 'react'
import App from './components/app'

if (__DEBUG__ === true) {
	console.log('this is debug model')
};

ReactDom.render(<App/>, document.querySelector('#root'));
