// An action is a JavaScript function that returns
// an object. That object MUST have at 
// least a property of "type"

import axios from 'axios';

export default function(){
	var axiosPromise = axios({
		url: `${window.apiAddress}/getTasks?api_key=gsdf89usf8u9uvsoijsfbdkl34tgrev`,
		method: "GET",
	});
	// our redux-promise middleware will kick in
	// because the payload value is a promise
	// redux-promise will hold up the dispatch
	// until it resolves
	return{
		type: "GET_TODO",
		payload: axiosPromise
	}
}
