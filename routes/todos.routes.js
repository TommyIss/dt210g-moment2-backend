let TodosController = require('../controllers/todos.controller');

async function TodosRoutes(fastify, options) {
    
    fastify.get('/create-table-todos', (req, reply) => TodosController.createNewTable(fastify, req, reply));

    fastify.get('/todos', (req, reply) => TodosController.getTodos(fastify, req, reply));

    fastify.get('/todos/:id', (req, reply) => TodosController.getTodo(fastify, req, reply));

    fastify.post('/todos', (req, reply) => TodosController.addNewTodo(fastify, req, reply));

    fastify.put('/todos/:id', (req, reply) => TodosController.editTodo(fastify, req, reply));

    fastify.delete('/todos/:id', (req, reply) => TodosController.removeTodo(fastify, req, reply));
}

module.exports = TodosRoutes;