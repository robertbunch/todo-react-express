import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import HomeHeader from './HomeHeader'

class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskList: []
		}
		// Make sure custom methods uses the class "this"
		this.addNewTask = this.addNewTask.bind(this)
		this.checkCompleted = this.checkCompleted.bind(this)
	}

	componentWillReceiveNewProps(newprops){
		console.log(newprops);
	}

	componentDidMount() {
	// axios request to var declared in index.html
	// ... that's where Express is listening
	axios.get(`${window.apiAddress}/getTasks?apiKey=gsdf89usf8u9uvsoijsfbdkl34tgrev`)
	.then((tasksFromApi)=>{
		// log the JSON response from Express
		console.log(tasksFromApi)
		this.setState({
		taskList: tasksFromApi.data
		})
	});
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
		}).then((tasksArray)=>{
			this.setState({
			taskList: tasksArray.data
			})
		})		
	}

	checkCompleted(targetId){
		console.log(targetId)
		axios({
			method: "POST",
			url: `${window.apiAddress}/completeTask?api_key=gsdf89usf8u9uvsoijsfbdkl34tgrev`,
			data: {
				targetId: targetId
			}
		}).then((tasksArray)=>{
			console.log(tasksArray)
			this.setState({
			taskList: tasksArray.data
			})
		})			
	}

	formatDate(date){
		// We get back a mysql date, need to convert it
		// to a JS date then format
		var dateObj = new Date(date);
		if(dateObj == 'Invalid Date'){
			return 'Invalid Date'
		}
		var formattedDate = `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
		return formattedDate
	}

	render(){
		console.log(this.state.taskList);
		var taskArray = this.state.taskList.map((task,index)=>{
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
					<td>{this.formatDate(task.task_date)}</td>
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

export default Home;