const database = require('./database');


// function to get id from email
async function getAllPublishers(){
    const sql = `
        SELECT 
            *
        FROM 
            publisher
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getPublisherByID(ID){
    const sql = `
        SELECT 
            *
        FROM 
            publisher
        WHERE 
            ID = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllPublishers,
    getPublisherByID
}