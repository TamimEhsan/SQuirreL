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

async function updatePublisher(id,name,image,description){
    const sql = `
        UPDATE publisher
        SET name = :name, image = :image
        WHERE id = :id
    `;
    const binds = {
        id,name,image
    }
    await  database.execute(sql, binds, database.options);
    return;
}
async function addPublisher(name,image){
    const sql = `
        INSERT INTO publisher(name,image)
        VALUES(:name,:image)
    `;
    const binds = {
        name,image
    }
    await  database.execute(sql, binds, database.options);
    return;
}

module.exports = {
    getAllPublishers,
    getPublisherByID,
    updatePublisher,
    addPublisher
}