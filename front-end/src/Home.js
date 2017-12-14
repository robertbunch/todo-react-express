import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import { bindActionCreators } from 'redux';
import getToDoAction from './actions/getToDoAction';
import formatDate from './utilities/formatDate';

class Home extends Component{
	constructor(props) {
		super(props);
		// Make sure custom methods uses the class "this"
		this.addNewTask = this.addNewTask.bind(this)
		this.checkCompleted = this.checkCompleted.bind(this)
	}

	componentWillReceiveNewProps(newprops){
		console.log(newprops);
	}

	componentDidMount() {
		// run the action to get task list in the Reducer
		this.props.getToDoAction();
	}

	addNewTask(event){
		event.preventDefault();
		var newTask = document.getElementById('new-task').value;
		var newTaskDate = document.getElementById('new-task-date').value;

		axios({
			method: "POST",
			url: `${window.apiAddress}/addTask?api_key=gsdf89usf8u9uvsoijsfbdkl34tgrev`,
			data: {
				taskName: newTask,
				taskDate: newTaskDate
			}
		}).then(()=>{
			this.props.getToDoAction();
		})		
	}

	checkCompleted(targetId){
		axios({
			method: "POST",
			url: `${window.apiAddress}/completeTask?api_key=gsdf89usf8u9uvsoijsfbdkl34tgrev`,
			data: {
				targetId: targetId
			}
		}).then(()=>{
			this.props.getToDoAction();
		})			
	}



	render(){
		var taskArray = this.props.todoState.taskList.map((task,index)=>{
			var inlineStyle = {}
			var finished = 0;
			if (task.finished === 1){
				inlineStyle = {
					"textDecoration": "line-through",
					"color": "black"
				}
				finished = true;
			}
			// push an li tag onto our array for each element in the state var
			return(
				<tr key={index}>
					<td>
						<input 
							type="checkbox" 
							checked={finished} 
							className="circle-check" 
							//Shut the linter up because of materialize.js
							onChange={()=>{}}
						/>
						<label 
							htmlFor="circle-check" 
							onClick={()=>{
								this.checkCompleted(task.id)
							}} 
						/>
					</td>
					<td><Link style={inlineStyle} to={`/task/get/${task.id}`}>{task.task_name}</Link></td>
					<td>{formatDate(task.task_date)}</td>
					<td><Link to={`/task/delete/${task.id}`}>Delete</Link></td>
					<td><Link to={`/task/edit/${task.id}`}>Edit</Link></td>
				</tr>)
		}); //End of map

		return(
			<div>
				<HomeHeader />
				<div className="container">
					<div className="row">
						<div className="col s6 offset-s3 center">
							<form onSubmit={this.addNewTask} className="add-box">
								<input type="text" id="new-task" placeholder="New Task..."/>
								<input type="date" id="new-task-date" />
								<button type="submit" className="btn btn-primary">Add Task</button>
							</form>
						</div>
					</div>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Status</th>
								<th>Task</th>
								<th>Due Date</th>
								<th>Delete</th>
								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
								{taskArray}
							</tbody>
					</table>
					</div>
			</div>
		)
	}

}

function mapStateToProps(state){
	// state = RootReducer
	return{
		// key = this.props.KEY will be accesible to this component
		// value = property of RootReducer
		todoState: state.todoState
	}
}

function mapDispatchToProps(dispatch){
	// dispatch is teh thing that takes any action
	// and sends it out to all teh reducers	
	return bindActionCreators({
		getToDoAction: getToDoAction
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
