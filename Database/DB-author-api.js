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

module.exports = {
    getAllAuthors,
    getAuthorByID
}