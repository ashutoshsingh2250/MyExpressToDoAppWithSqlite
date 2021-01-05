var db = require('../db/db.js');

var listTasks = (req, res) => {
	db.all('SELECT * FROM todos', (err, data) => {
		if (err) {
			console.error('Error listing tasks');
			res.json({
				"success": false
			})
		} else {
			res.json({
				"success": true,
				"tasks": data
			})
		}
	})
}

let updateTask = (req,res)=>{
  let name =  req.query.name;
  let status = req.query.status;
  db.run('UPDATE todos SET status=? where name=?',[status,name],(err)=>{
	  if(err){
		  console.log("Update Errorr ",err);
		  res.json({
			  "success":false
		  })
	  }else{
		  res.json({
			  "success":true,
			  "message":'Update successfully'
		  })
	  }
  })
}
let deleteTask = (req,res)=>{
  let name = req.query.name;
  db.run('Delete From todos where name=?',[name],(err)=>{
	  if(err){
		  console.log("Delete Error ",err);
		  res.json({
			  "success":false
		  })
	  }else{
		  res.json({
			  "success":true,
			  "message":"Delete Successfully"
		  })
	  }
  })
}
var createTask = (req, res) => {
	
const { name } = req.body;
	db.run('INSERT INTO todos (name, status) VALUES (?, ?)', [name, 'yet to be done'], (err) => {
		if (err) {
			console.error('Error inserting task');
			res.json({
				"success": false
			})
		} else {
			res.json({
				"success": true
			})
		}
	})
}

module.exports.listTasks = listTasks;
module.exports.createTask = createTask;
module.exports.deleteTask = deleteTask;
module.exports.updateTask = updateTask;