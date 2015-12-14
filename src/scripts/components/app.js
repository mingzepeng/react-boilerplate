import React from 'react'
var img = require('../../images/logo.png')
var cover = require('../../images/cover.jpg')
export default class App extends React.Component {
	render() {
		return (
			<div className='app'>
				Hello,please enjoy it
				<img src={img} alt=""/>
				<img src={cover} alt=""/>
			</div>
		)
	}
}
