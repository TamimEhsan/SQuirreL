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

async function getAllByUser(user_id){
    const sql = `
        SELECT 
            book.name as book_name,book.id as book_id,book.price, book.image,
            author.name as author_name
        FROM wish_list
        JOIN book ON wish_list.book_id = book.id
        JOIN author ON author.id = book.author_id
        WHERE user_id = :user_id
    `;
    const binds = {
        user_id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function addToWishlist(user_id,book_id){
    const sql = `
        INSERT INTO wish_list(user_id,book_id)
        VALUES(:user_id,:book_id)
    `;
    const binds = {
        user_id,book_id
    }
    await database.execute(sql, binds, database.options);
    return;
}

async function hasAdded(user_id,book_id){
    const sql = `
        SELECT * FROM wish_list
        WHERE user_id = :user_id AND book_id = :book_id
    `;
    const binds = {
        user_id,book_id
    }
    return ((await database.execute(sql, binds, database.options)).rows.length>0);
}
async function removeFromList(user_id,book_id){
    const sql = `
        DELETE FROM wish_list
        WHERE user_id = :user_id AND book_id = :book_id
    `;
    const binds = {
        user_id,book_id
    }
    await database.execute(sql, binds, database.options);
    return;
}
module.exports = {
    getAllByUser,
    addToWishlist,
    hasAdded,
    removeFromList
}