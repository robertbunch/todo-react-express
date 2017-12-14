// Each reducer contains a peice of state.
// The root reducer contains all the reducers.
// I.e., the root reducer contains ALL peices of state,
// or the entire application state.

// In order to get all the "little" reducers or peices of state
// into one big, "root" reducer, we need the combineReducers method from redux
import { combineReducers } from 'redux';

// Import each individual reducer to hand to combineReducers
// First: AuthReducer
import toDoReducer from './toDoReducer';

// combineReducers takes an object as an arg
// that arg has key:value pair = stateName: reducerFunction
// the reducerFunction will return a value
const rootReducer = combineReducers({
	todoState: toDoReducer
})

export default rootReducer;