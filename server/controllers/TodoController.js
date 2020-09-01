const {Todo} = require('../models')

class TodoController {
    static createTodo(req, res) {
        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(todoObj)
        .then(todo => {
            return res.status(201).json(todo)
        })
        .catch(err => {
            if (err.errors) {
                let msg = []
                for (let i = 0; i < err.errors.length; i++) {
                    msg.push(err.errors[i].message)
                }
                return res.status(400).json({msg: 'Validation Error'})
            } else {
                return res.status(500).json(err)
            }
        })
    }

    static showTodo(req, res) {
        Todo.findAll()
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    }

    static showTodoById(req, res) {
        Todo.findByPk(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({message: 'Todo Not Found'})
            } else {
                return res.status(200).json(todo)
            }
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    }

    static updateTodo(req, res) {
        let todoUpdate = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(todoUpdate, {where: {id: req.params.id}})
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(err => {
            if (err.errors) {
                let msg = []
                for (let i = 0; i < err.errors.length; i++) {
                    msg.push(err.errors[i].message)
                }
                return res.status(400).json({msg: 'Validation Error'})
            } else {
                return res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where: {id:req.params.id}
        })
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(err => {
            return res.status(404).json(err)
        })
    }
}

module.exports = TodoController