import * as express from 'express'
import TodoController from '../controllers/TodoController'

const router = express.Router()
router.post('/todos', TodoController.create)
router.get('/todos', TodoController.find)
router.get('/todos/:id', TodoController.findById)
router.put('/todos/:id', TodoController.update)
router.delete('/todos/:id', TodoController.delete)

export default router