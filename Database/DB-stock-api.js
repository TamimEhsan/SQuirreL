const database = require('./database');
// function to get id from email
async function getAllShortStockBooks(offset,limit){
    console.log(offset,limit)
    const sql = `
        SELECT *
        FROM Book
        WHERE stock < 50
        ORDER BY name
        OFFSET :offset ROWS 
        FETCH NEXT :limit ROWS ONLY
        `;
    const binds = {
        offset,limit
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllShortStockBooksCount(){
    const sql = `
        SELECT COUNT(*) AS CNT
        FROM Book
        WHERE stock < 50
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateStock(bookId,stock){
    const sql = `
        UPDATE BOOK
        SET stock = :stock
        WHERE ID = :bookId
        `;
    const binds = {
        bookId,stock
    }
    await database.execute(sql, binds, database.options);
    return ;
}

module.exports = {
    getAllShortStockBooks,
    getAllShortStockBooksCount,
    updateStock
}