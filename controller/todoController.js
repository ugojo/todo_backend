const Todo = require("../model/todoModel")
const mongoose = require("mongoose")



//GET ALL TODO
const getTodos = async (req, res)=>{

    const user_id = req.user._id
    const todo = await Todo.find({user_id}).sort({createdAt: -1})

    res.status(200).json(todo)

}

//GET SINGLE TODO
const getTodo= async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({msg : "todo id not found"})
    }
    const todo = await Todo.findById({_id:id})

    if(!todo){
        return res.status(404).json({msg: "Todo not found"})
    }

    res.status(200).json(todo)
}

//CREATE A TODO LIST
const createTodo= async (req, res)=>{
    try {
        const user_id = req.user._id
        const {title, category, priority, description, complete} = req.body

        const todo = await Todo.create({title, category, priority, description, complete, user_id})

       res.status(200).json(todo)

    } catch (error) {
        res.status(400).json({error: error.msg})
        console.log(error);
    }
}

//UPDATE TODO LIST
const updateTodo= async (req, res)=>{
   
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        
        return res.status(404).json({msg: "No todo found"})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, { ...req.body})

    if(!todo){
        return res.status(400).json({msg: "Error updating todo"})
    }

    res.status(200).json(todo)

}

//DELETE TODO LIST
const deleteTodo= async (req, res)=>{
    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        
        return res.status(404).json({msg: "No todo found"})
    }

    const todo = await Todo.findOneAndDelete({_id: id})
    
    if (!todo) {
        return res.status(400).json({msg: "Error deleting todo"})
    }

    res.status(200).json(todo)
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}