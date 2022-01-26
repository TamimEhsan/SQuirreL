const database = require('./database');


async function insertReview(userId,bookId,star,review){
    const sql = `
        INSERT INTO RATES(user_id,book_id,stars,review)
        VALUES(:userId,:bookId,:star,:review)
    `;
    const binds = {
        userId,bookId,star,review
    }
    await database.execute(sql, binds, database.options);
    return;
}

async function getAllReviewsByBook(bookId){
    const sql = `
        SELECT 
            rates.*, app_user.name
        FROM 
            rates
        JOIN app_user ON rates.user_id = app_user.id
        WHERE 
            book_id = :bookId
        `;
    const binds = {
        bookId:bookId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllReviewsByUser(userId){
    const sql = `
        SELECT 
            *
        FROM 
            rates
        WHERE 
            user_id = :userId
        `;
    const binds = {
        userId:userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function hasBookOrdered(userId,bookId){
    const sql = `
        SELECT picked.id FROM picked
        JOIN cart ON cart.id = picked.cart_id and cart.user_id = :userId
        JOIN book_order on book_order.cart_id = cart.id and book_order.state = 5
        WHERE book_id = :bookId
    `
    const binds = {
        userId:userId,
        bookId:bookId
    }
    if( (await database.execute(sql, binds, database.options)).rows.length === 0 ){
        return false
    }else{
        return true;
    }
}

async function hasReviewdBook(userId,bookId){
    const sql = `
        SELECT * FROM RATES
        WHERE user_id = :userId AND book_id = :bookId
    `;
    const binds = {
        userId:userId,
        bookId:bookId
    }
    const result = (await database.execute(sql, binds, database.options)).rows;
    if( result.length === 0 ){
        return false
    }else{
        return true;
    }
}
module.exports = {
    insertReview,
    getAllReviewsByBook,
    getAllReviewsByUser,
    hasBookOrdered,
    hasReviewdBook
}