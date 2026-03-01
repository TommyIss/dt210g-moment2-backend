/** Moment 2 för kursen DT210G, Fördjupad frontend utveckling */

let fastify = require('fastify')({
    logger: true
});
let mysql = require('@fastify/mysql');
require('dotenv').config();
let cors = require('@fastify/cors');
let port = process.env.PORT | 3000;
let host = '0.0.0.0';
let todosRoutes= require('./routes/todos.routes');

// Anslutnings konfigurationer till databasen
fastify.register(mysql, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    promise: true,
    multipleStatements: true
});

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Routes
fastify.get('/', (req, reply) => {
    reply.send({message: 'Välkomment till webbtjänst för Moment 2 i kursen DT210G, Fördjupad frontend-utveckling'});
});

fastify.register(todosRoutes);

// Starta servern
fastify.listen({ port: port, host: host }, (err, adress) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    } else {
        console.log('Server körs på adress: ' + adress);
    }
})