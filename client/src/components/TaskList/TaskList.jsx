import React, { useState,useEffect  } from "react";
import classes from "./TaskList.module.scss";
import TaskItem from "./TaskItem";
import toast from "react-hot-toast";
import axios from "axios";

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setisAddingNew] = useState(false);
  /*Whenever we are adding new data we'll make a true,when we'll close the data we'll make false above one e.g */
  const [newTask, setNewTask] = useState('');

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/task/mytask');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } 
    catch (error) {
     console.log(error) 
    }
  };

  useEffect(() => {
    getTasks();
  },[]);


  /*Proccess of adding New task while clicking */
  // path: 1)addNewTask create function => 2)create UI Part Belew The Add new Button and call this addNewTask on submit curly brases =>3) whenever we click add New btn it will show the form so for that : we need to call event Listners on one addNewbtn and call here belew to make this true use !isAddingNew true for flip =>4)come back to our addNewTask function and work on :: check more than 0 or not if it's show msg if it's not go further and call backend

  const addNewBtn = ()=>{
  /*To show the form we need to setisAddingNew true only */
  // setisAddingNew(true)
  setisAddingNew(!isAddingNew)
  }

 
  const addNewTask = async (e) => {
    e.preventDefault();
    if(newTask.length <= 0){
      toast.error("Task is empty");
      return;
    }
    try {
    const { data } = await axios.post("/api/task", {
      title: newTask,
    })
    toast.success("New task Created")
    setisAddingNew(false) //which 'll habitually close this form
    setNewTask(''); //setNewTaks will be empty which is initially value;

    // after successfully created task i will add this into setTaskList for updating ...taskList(it spread all the taskList which is already there) befoure this I should add my newTask list in form of obje {...data}
    setTaskList([{...data}, ...taskList]);
    }catch (error) {
     console.log(error); 
    }
  };


  /* This is form TaskItem go taskItem route and see Id */
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/task/${id}`);
      toast.success("Task successfully deleted");
      /*after successfully delted task we need remove from our taskList into our states so for that we need filter which says accept delete all thing properly run go @w3school and explore filter */
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className={classes.topBar}>
        <button type='button' onClick={addNewBtn} className={classes.addNew}>
          Add New
        </button>
      </div>
      {/*
      1)1st Querry if the valuse isAddingNew is true I'll actually show the form. 
      2)2nd Querry Whenever we will change the input value It will also change the value of newTask value */}
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask} >
          <input type='text'
           value={newTask}
           onChange={(e)=> setNewTask(e.target.value)}
           placeholder= "Task Required" />
           <button type="submit">Add</button>
        </form>
      )}

      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
               key={task._id}
               task={task}
                deleteTask={deleteTask}/>
            ))}
          </tbody>
        </table>
      ) : (
        "No task found, Create Task"
      )}
    </div>
  );
};

export default TaskList;
