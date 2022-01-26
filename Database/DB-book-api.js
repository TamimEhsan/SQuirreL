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
            book.id,book.name,book.PRICE,book.LANGUAGE,book.IMAGE,book.EDITION,book.ISBN,book.PAGE,book.PUBLISHING_YEAR,
            COUNT(rates.stars) AS REVIEW_COUNT, NVL(SUM(rates.stars),0) AS STARS,
            author.id AS author_id,author.name AS author_name,author.description AS author_description, author.image AS author_image,
            publisher.name AS publisher_name
        FROM
            book
        LEFT JOIN rates ON rates.BOOK_ID = book.id
        JOIN author ON author.id = book.author_id
        JOIN publisher ON publisher.id = book.publisher_id
        WHERE
            book.id = :id
        GROUP BY
                 book.id,book.name,book.PRICE,book.LANGUAGE,book.IMAGE,book.EDITION,book.ISBN,book.PAGE, book.PUBLISHING_YEAR,
                 author.id, author.name, author.description, author.image,
                 publisher.name
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