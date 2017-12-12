// 3rd party modules
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Custom modules
import Home from './Home';
import Delete from './Delete';
import Edit from './Edit';
import NavBar from './NavBar';

class ToDo extends Component {
  render() {
    return(
      <Router>
        <div className="to-do-app">
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/task/delete/:taskId" component={Delete} />
          <Route path="/task/edit/:taskId" component={Edit} />
        </div>
      </Router>
    )
  }
}

export default ToDo;
