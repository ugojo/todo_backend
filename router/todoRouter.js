const express = require("express");
const {getTodos, getTodo, createTodo, updateTodo, deleteTodo} = require("../controller/todoController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();


router.use(requireAuth)

router.get('/', getTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)






module.exports = router;