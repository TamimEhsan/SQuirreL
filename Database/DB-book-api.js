const database = require('./database');


// function to get id from email
async function getAllBooks(){
    const sql = `
        SELECT 
            *
        FROM 
            Book
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getBookByID(ID){
    const sql = `
        SELECT 
            book.*, 
            author.id AS author_id,author.name AS author_name,author.description AS author_description, author.image AS author_image,
            publisher.name AS publisher_name
        FROM 
            book
        
        JOIN author ON author.id = book.author_id
        JOIN publisher ON publisher.id = book.publisher_id
        WHERE 
            book.id = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBookByAuthorID(ID){
    const sql = `
        SELECT 
            book.*, 
            author.id AS author_id,author.name AS author_name,author.description AS author_description, author.image AS author_image,
            publisher.name AS publisher_name
        FROM 
            book
        
        JOIN author ON author.id = book.author_id
        JOIN publisher ON publisher.id = book.publisher_id
        WHERE 
            book.author_id = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBooksByPublisherID(ID){
    const sql = `
        SELECT 
            book.*, 
            author.id AS author_id,author.name AS author_name,author.description AS author_description, author.image AS author_image,
            publisher.name AS publisher_name
        FROM 
            book
        
        JOIN author ON author.id = book.author_id
        JOIN publisher ON publisher.id = book.publisher_id
        WHERE 
            book.publisher_id = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

module.exports = {
    getAllBooks,
    getBookByID,
    getBookByAuthorID,
    getBooksByPublisherID
}