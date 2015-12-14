import React from 'react'
var img = require('../../images/logo.png')
var cover = require('../../images/cover.jpg')
export default class App extends React.Component {
	render() {
		return (
			<div className='app'>
				Hello,please enjoy it
				<p>
					<img src={img} alt=""/>
				</p>
				<p>
					<img width="400px" height="400px" src={cover} alt=""/>
				</p>
			</div>
		)
	}
}
