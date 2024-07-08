const express = require('express');
const router = express.Router();
const Task= require('../models/task')
const User = require('../models/user');
const { jwtAuthMiddleware,generateToken} = require('../jwt');

//Create Task
router.post('/create', jwtAuthMiddleware,async (req, res) =>{
    try{
        const {title,description}=req.body
        const {id}=req.headers
        const newTask= new Task({
            title:title,
            description:description
        })
        const response = await newTask.save()
        const taskId = response._id
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId}})
         console.log("Task is created.")
         res.status(200).json({message: 'Task has been created.'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Get all Tasks
router.get('/all', jwtAuthMiddleware,async (req, res) => {
    try {
        const {id} = req.headers
        const userData= await User.findById(id).populate({
            path:"tasks",
            options:{sort:{createdAt: -1}},
        });
        // Return the list of candidates
        res.status(200).json({data:userData});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Delete a task
router.delete('/remove/:id', jwtAuthMiddleware,async (req, res) => {
    try {
         const {id} = req.params
         const userId=req.headers.id 
         await Task.findByIdAndDelete(id)
         await User.findByIdAndUpdate(userId,{$pull:{tasks: id}})
         // Return the list of candidates
         res.status(200).json({message:"Task has been deleted."});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update a task
router.put('/update/:id', jwtAuthMiddleware,async (req, res) => {
    try {
         const {id} = req.params
         const {title,description}= req.body
         await Task.findByIdAndUpdate(id,{title:title,description:description})
         // Return the list of candidates
         res.status(200).json({message:"Task has been updated."});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//update to Important Task
router.put('/update/important/:id', jwtAuthMiddleware,async (req, res) => {
    try {
         const {id} = req.params
         const TaskData=  await Task.findById(id)
         const importantTask = TaskData.important
         await Task.findByIdAndUpdate(id,{important: !importantTask})
         // Return the list of candidates
         res.status(200).json({message:"Task has been updated."});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update to Complete Tasks
router.put('/update/complete/:id', jwtAuthMiddleware,async (req, res) => {
    try {
         const {id} = req.params
         const TaskData=  await Task.findById(id)
         const completeTask =await  TaskData.complete
         await Task.findByIdAndUpdate(id,{complete: !completeTask})
         // Return the list of candidates
         res.status(200).json({message:"Task has been updated."});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get Important Task
router.get('/all/important', jwtAuthMiddleware,async (req, res) => {
    try {
        const {id} = req.headers
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{important:true},
            options:{sort:{createdAt: -1}},
        });
        const ImpTasks= Data.tasks
        // Return the list of candidates
        res.status(200).json({data:ImpTasks});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Get Complete Tasks
router.get('/all/complete', jwtAuthMiddleware,async (req, res) => {
    try {
        const {id} = req.headers
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{complete:true},
            options:{sort:{createdAt: -1}},
        });
        const CompTasks= Data.tasks
        // Return the list of candidates
        res.status(200).json({data:CompTasks});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
//Get Incomplete Tasks
router.get('/all/incomplete', jwtAuthMiddleware,async (req, res) => {
    try {
        const {id} = req.headers
        const Data= await User.findById(id).populate({
            path:"tasks",
            match:{complete:false},
            options:{sort:{createdAt: -1}},
        });
        const CompTasks= Data.tasks
        // Return the list of candidates
        res.status(200).json({data:CompTasks});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
