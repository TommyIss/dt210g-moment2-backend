/** Model för Todo */

async function createTable(mysql) {
    let sql = `
        DROP TABLE IF EXISTS todos;
        CREATE TABLE todos(
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            status ENUM('Ej påbörjad', 'Pågående', 'Avklarad') NOT NULL DEFAULT 'Ej påbörjad',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;

    let [rows] = await mysql.query(sql);

    return rows;
}

async function getAllTodos(mysql) {
    let sql = `SELECT * FROM todos`;
    let [rows] = await mysql.query(sql);

    return rows;
}

async function getTodoById(mysql, id) {
    let sql = `SELECT * FROM todos WHERE id=?`;

    let [rows] = await mysql.query(sql, [id]);

    return rows[0];
}

async function addTodo(mysql, todo) {
    let { title, description, status } = todo;

    let sql = `INSERT INTO todos(title, description, status)VALUES(?, ?, ?);`;

    let [result] = await mysql.query(sql, [title, description, status]);
    
    return { id: result.insertId, ...todo};
}

async function updateTodo(mysql, id, todo) {
    let { title, description, status } = todo;

    let sql = `UPDATE todos SET title=?, description=?, status=? WHERE id=?;`;

    let [result] = await mysql.query(sql, [title, description, status, id]);

    return result;
    
}

async function deleteTodo(mysql, id) {
    let sql = `DELETE FROM todos WHERE id=?`;

    let [result] = await mysql.query(sql, [id]);

    return result;
}

module.exports = { createTable, getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo };