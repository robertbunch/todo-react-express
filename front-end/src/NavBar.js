import React, { Component } from 'react'
import { connect } from 'react-redux';

class NavBar extends Component{
	render(){
		console.log(this.props.todoState)
		return(
			<nav className="light-blue lighten-1" role="navigation">
				<div className="nav-wrapper container"><a id="logo-container" href="/" className="brand-logo">AWS Check List</a>
					<ul className="right">
						<li className="todo-menu-item">Done<span className="red-number">{this.props.todoState.finished}</span></li>
						<li className="todo-menu-item">Today<span className="red-number">{this.props.todoState.dueToday}</span></li>
					</ul>
				</div>
			</nav>
		)
	}
}



function mapStateToProps(state){
	// state = RootReducer
	return{
		todoState: state.todoState
	}
}

export default connect(mapStateToProps)(NavBar);
