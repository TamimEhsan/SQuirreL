const database = require('./database');


// function to get id from email
async function getAllAuthors(){
    const sql = `
        SELECT 
            *
        FROM 
            author
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAuthorByID(ID){
    const sql = `
        SELECT 
            *
        FROM 
            author
        WHERE 
            ID = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function updateAuthor(id,name,image,description){
    const sql = `
        UPDATE AUTHOR
        SET name = :name, image = :image,description = :description
        WHERE id = :id
    `;
    const binds = {
        id,name,image,description
    }
    await  database.execute(sql, binds, database.options);
    return;
}
async function addAuthor(name,image,description){
    const sql = `
        INSERT INTO author(name,password,image,description)
        VALUES(:name,:name,:image,:description)
    `;
    const binds = {
        name,image,description
    }
    await  database.execute(sql, binds, database.options);
    return;
}
module.exports = {
    getAllAuthors,
    getAuthorByID,
    updateAuthor,
    addAuthor
}