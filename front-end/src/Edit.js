import React, {Component} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Edit extends Component{
	constructor(props) {
		super(props);
		this.updateTask = this.updateTask.bind(this);
	}

	componentDidMount() {
		// No need to use state to manage this form
		// Too many conflicts trying to control/uncontrol
		const taskId = this.props.match.params.taskId;
		axios.get(`${window.apiAddress}/getTask/${taskId}`)
		.then((taskData)=>{
			const taskName = taskData.data.task_name;
			const taskDate = taskData.data.task_date.slice(0,10);
			document.getElementById('new-task').value = taskName;
			document.getElementById('new-task-date').value = taskDate;
		});
	};

	updateTask(e){
		e.preventDefault();
		const taskData = {
			id: this.props.match.params.taskId,
			taskName: document.getElementById('new-task').value,
			taskDate: document.getElementById('new-task-date').value
		}
		axios({
			method: "POST",
			url: `http://localhost:3000/updateTask`,
			data: {
				taskData
			}
		}).then((response)=>{
			console.log(response.data)
			if(response.data.msg === "updated"){
				this.props.history.push('/');
			}
		})
	}

	render(){
		return(
			<div className="container edit">
				<div className="row">
					<div className="col m6 offset-m3 s10 offset-s1">
						<form onSubmit={this.updateTask} className="add-box">
							<input type="text" id="new-task" />
							<input type="date" id="new-task-date" />
							<div className="center">
								<button type="submit" className="btn light-blue lighten-1">Update</button>
								<Link to="/" className="btn red">Cancel</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}

}

export default Edit;