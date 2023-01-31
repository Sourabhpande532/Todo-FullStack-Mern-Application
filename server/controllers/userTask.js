import Task from "../models/task.js";
import createError from "../utils/createError.js";

export const createTask = async(req,res,next)=>{
const newTask = new Task({
title: req.body.title,
user: req.user.id,
completed: req.body.completed,  
});
try {
const newUserTask = await newTask.save();
return res.status(201).json(newUserTask);   
} catch (error) {
  return next(error)  
}
}

export const getAllTaskUCreated = async(req,res,next)=>{
    try {
     const allTask = await Task.find({});
     return res.status(200).json(allTask)   
    } 
    catch (error) {
     return next(error)  
    }
}

/* what is moto of this class getCurrentUserTask is just to show you created or not task or show some [] when show this when you not created anytask */
export const getCurrentUserTask = async(req,res,next)=>{
  try {
  const currentTask = await Task.find({user: req.user.id})
  return res.status(201).json(currentTask)  
  } catch (error) {
    return next(error)
  }
}

/* @startegies */
export const upadateTask = async(req,res,next)=>{
try {
const task = await Task.findById(req.params.taskId).exec();
console.log(task)
if(!task) return next(createError({status:404, message:"user Not found"}));
if(task.user.toString() !== req.user.id) return next(createError({status:401, message: "It's not your user"}));
/* task.user.toString() is coming from task which is already in string formate i.e toString() user & req.user.id is come from payload */
const upadateIt = await Task.findByIdAndUpdate(req.params.taskId,{
  title: req.body.title,
  completed: req.body.completed,
},{new:true})
return res.status(200).json(upadateIt)  
} catch (error) {
   return next(error);
}
}

export const deleteTask = async(req,res,next)=>{
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if(!task) return next(createError({status:404, message:"user not foun"}));
    if(task.user.toString() !== req.user.id) return next(createError({
      status:401, message: "It's not your task"
    }));
    await Task.findByIdAndDelete(req.params.taskId);
    return res.status(200).json("Task deleted successfully") 
  }catch (error) {
   return  next(error)
  }

}

export const deleteAll = async(req,res,next)=>{
  try {
    await Task.deleteMany({ user: req.user.id });
    return res.json('All Todo Deleted Successfully');
  } catch (err) {
    return next(err);
  }
}