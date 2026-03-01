let TodoModel = require('../models/todos.model');

async function createNewTable(fastify, req, reply) {
    try {
        let rows = await TodoModel.createTable(fastify.mysql);

        return reply.code(201).send({message: 'Tabellen Todos har skapats!' });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt serverfel uppstått!',
            error: err.message
        });
        
    }
}

async function getTodos(fastify, req, reply) {
    try {
        let rows = await TodoModel.getAllTodos(fastify.mysql);

        if(!rows || rows.length === 0) {
            return reply.code(404).send({ message: 'Inga todos i listan!'});
        }

        return reply.code(200).send({ todos: rows });
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt fel uppstått!',
            error: err.message
        });
    }
}

async function getTodo(fastify, req, reply) {
    try {

        let row = await TodoModel.getTodoById(fastify.mysql, req.params.id);

        if(!row) {
            return reply.code(404).send({ message: 'Todo finns inte listan!'});
        }

        return reply.code(200).send({ todo: row });
        
    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt fel uppstått!',
            error: err.message
        });
    }
}

async function addNewTodo(fastify, req, reply) {
    try {
        let { title, description, status } = req.body;

        let allowedStatus = ['Ej påbörjad', 'Pågående', 'Avklarad'];

        let error = {
            message: '',
            details: '',
            http_response: {

            }
        }

        if(!title) {
            error.message = 'Titeln saknas!';
            error.details = 'Du måste fylla titeln!';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if(!description) {
            error.message = 'Beskrivning saknas!';
            error.details = 'Du måste beskriva din todo!';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if(!status || !allowedStatus.includes(status)) {
            error.message = 'Ogiltig status!';
            error.details = 'Status måste vara: Ej påbörjad, Pågående eller avklarad.';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        }

        let todo = await TodoModel.addTodo(fastify.mysql, req.body);

        return reply.code(201).send({
            message: 'Todo är tillagd',
            todo: todo
        });

    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt fel uppstått!',
            error: err.message
        });
    }
}

async function editTodo(fastify, req, reply) {
    try {
        let { title, description, status } = req.body;
        let id = req.params.id;

        let allowedStatus = ['Ej påbörjad', 'Pågående', 'Avklarad'];

        let error = {
            message: '',
            details: '',
            http_response: {

            }
        }

        if(!title) {
            error.message = 'Titeln saknas!';
            error.details = 'Du måste fylla titeln!';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if(!description) {
            error.message = 'Beskrivning saknas!';
            error.details = 'Du måste beskriva din todo!';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });

        } else if(!status || !allowedStatus.includes(status)) {
            error.message = 'Ogiltig status!';
            error.details = 'Status måste vara: Ej påbörjad, Pågående eller avklarad.';
            error.http_response.message = 'Bad request';
            error.http_response.code = 400;

            return reply.code(400).send({ error });
        }

        let result = await TodoModel.updateTodo(fastify.mysql, id, req.body);

        if(result.affectedRows === 0) {
            return reply.code(404).send({ message: 'Ingen todo hittades med det id:et'});
        }

        return reply.code(200).send({ message: `Todo med id: ${id} har uppdaterats`});

    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt fel uppstått!',
            error: err.message
        });
    }
}

async function removeTodo(fastify, req, reply) {
    try {
        let id = req.params.id;

        let result = await TodoModel.deleteTodo(fastify.mysql, id);

        if(result.affectedRows === 0) {
            return reply.code(404).send({ message: 'Ingen todo hittades'});
        }

        return reply.code(200).send({ message: `Todo med id:${id} har raderats!`});

    } catch (err) {
        fastify.log.error(err);
        return reply.code(500).send({
            message: 'Ett internt fel uppstått!',
            error: err.message
        });
    }
}

module.exports = { createNewTable, getTodos, getTodo, addNewTodo, editTodo, removeTodo };