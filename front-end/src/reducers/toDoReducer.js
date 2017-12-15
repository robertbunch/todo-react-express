// A reducer is a FUNCTION that returns a peice of state

// get util function
import formatDate from '../utilities/formatDate';

var defaultState = {
	taskList:[],
	finished: 0,
	toDo: 0,
}
export default function(state = defaultState, action){
	if(action.type === 'GET_TODO'){
		var newState = {...state};
		newState.finished = 0;
		newState.dueToday = 0;
		newState.taskList = action.payload.data;
		newState.taskList.forEach((task)=>{
			if(task.finished === 1){
				newState.finished++;
			}
			if(task.finished === 0){
				// if(formatDate(task.task_date))
				var taskDate = (formatDate(task.task_date));
				var today = formatDate(new Date());
				if (taskDate === today){
					newState.dueToday++;
				}
			}
		})
		return newState;
	}else{
		return state;
	}	
}