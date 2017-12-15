// EXPRESS SERVER
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var config = require('../config/config')
var connection = mysql.createConnection(config.db)

connection.connect();


function validateKey(key){
	console.log(key)
	return new Promise((resolve, reject)=>{
		connection.query('SELECT * FROM api_keys WHERE api_key="'+key+'"',(error,results)=>{
			console.log(results.length)
			if (error) throw error;
			if(results.length == 0){
				resolve(false);
			}else{
				resolve(true);
			}
		});
	});
}

// Setup a route to handle React's first request
router.get('/getTasks', function(req, res, next) {
	// Removed isKeyValid so get is easier to test.
	// var isKeyValid = validateKey(req.query.api_key);
	// console.log(req.query.api_key)
	// isKeyValid.then((bool)=>{
	// 	if(bool == true){
			connection.query('SELECT * FROM tasks', (error, results)=>{
				if (error) throw error;
				res.json(results);
			})
		// }else{
		// 	res.json({msg:"badKey"})
		// }
	// });
});

router.post('/updateTask',(req, res)=>{
	const targetId = req.body.taskData.id;
	const taskName = req.body.taskData.taskName;
	const taskDate = req.body.taskData.taskDate;
	connection.query('UPDATE tasks SET task_name = ?, task_date = ? WHERE id=?',[taskName, taskDate, targetId],(error, results, fields)=>{
		console.log(results)
		if(error){
			res.json({
				msg: "error",
				error: error
			})
		}else{
			res.json({
				msg: "updated"
			});
		}
	})	
});

router.get('/getTask/:id', (req,res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`,(error,results)=>{
		if(results.length == 0){
			res.json({msg:"noResult"})
		}else{
			res.json(results[0])
		}
	});
});

router.post('/completeTask',(req, res)=>{
	var targetId = req.body.targetId;
	connection.query('UPDATE tasks SET finished = NOT finished WHERE id=?',[targetId],(error, results, fields)=>{
		if(error){
			res.json(error);
		}else{
			res.json({
				msg: "success"
			});
		}
	})
});

router.post('/deleteTask', (req,res)=>{
	connection.query('DELETE FROM tasks WHERE id = '+req.body.taskId,(error, results)=>{
		if(error){
			res.json(error);
		}else{
			res.json({
				msg: "success"
			});
		}
	});
});

router.post('/addTask', (req,res)=>{
	var newTask = req.body.taskName;
	var newTaskDate = req.body.taskDate;
	connection.query('INSERT INTO tasks (task_name, task_date) VALUES (?, ?)', [newTask,newTaskDate], (error, results)=>{
		if (error){
			res.json(error)
		}else{
			res.json({
				msg: "success"
			});
		}	
	})
});


module.exports = router;
