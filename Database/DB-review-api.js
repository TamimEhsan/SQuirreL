const database = require('./database');


async function insertReview(userId, bookId, star, review) {
    const sql = `
        BEGIN
            REVIEW_BOOK(:bookId,:userId,:star,:review);
        END;
    `;
    const binds = {
        userId, bookId, star, review
    }
    await database.execute(sql, binds, database.options);
    return;
}

async function editReview(userId, bookId, reviewId, star, review) {
    const sql = `
        UPDATE RATES
        SET review = :review, stars = :star
        WHERE user_id = :userId AND id = :reviewId AND book_id = :bookId
    `;
    const binds = {
        reviewId, userId, bookId, star, review
    }
    await database.execute(sql, binds, database.options);
    return;
}

async function getAllReviewsByBook(bookId) {
    const sql = `
        SELECT 
            rates.*, app_user.name,app_user.image
        FROM 
            rates
        JOIN app_user ON rates.user_id = app_user.id
        WHERE 
            book_id = :bookId
        `;
    const binds = {
        bookId: bookId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllReviewsByUser(userId) {
    const sql = `
        SELECT 
            rates.*,
            book.id AS book_id,book.name AS book_name,book.image,
            author.name AS author_name
        FROM 
            rates
        JOIN book ON book.id = rates.book_id
        JOIN author ON author.id = book.author_id
        WHERE 
            user_id = :userId
        `;
    const binds = {
        userId: userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllUnreviewedBooksByUser(userId) {
    const sql = `
        ( SELECT UNIQUE
            book.id AS book_id,book.name AS book_name,book.image,
            author.name AS author_name
        FROM BOOK
        JOIN author on BOOK.AUTHOR_ID = AUTHOR.id
        JOIN PICKED ON PICKED.BOOK_ID = book.ID
        JOIN cart ON cart.id = picked.cart_id and cart.user_id = :userId
        JOIN book_order on book_order.cart_id = cart.id and book_order.state = 5 )
        MINUS
        (
            SELECT
            book.id AS book_id,book.name AS book_name,book.image,
            author.name AS author_name
        FROM
            rates
        JOIN book ON book.id = rates.book_id
        JOIN author ON author.id = book.author_id
        WHERE
            user_id = :userId)
        `;
    const binds = {
        userId: userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function hasBookOrdered(userId, bookId) {
    const sql = `
        SELECT picked.id FROM picked
        JOIN cart ON cart.id = picked.cart_id and cart.user_id = :userId
        JOIN book_order on book_order.cart_id = cart.id and book_order.state = 5
        WHERE book_id = :bookId
    `
    const binds = {
        userId: userId,
        bookId: bookId
    }
    if ((await database.execute(sql, binds, database.options)).rows.length === 0) {
        return false
    } else {
        return true;
    }
}

async function hasReviewdBook(userId, bookId) {
    const sql = `
        SELECT * FROM RATES
        WHERE user_id = :userId AND book_id = :bookId
    `;
    const binds = {
        userId: userId,
        bookId: bookId
    }
    const result = (await database.execute(sql, binds, database.options)).rows;
    if (result.length === 0) {
        return false
    } else {
        return true;
    }
}

module.exports = {
    insertReview,
    editReview,
    getAllReviewsByBook,
    getAllReviewsByUser,
    hasBookOrdered,
    hasReviewdBook,
    getAllUnreviewedBooksByUser
}