const database = require('./database');

async function getMostSoldBooksOfLastMonth(){
    const sql = `
        select p.BOOK_ID as book_id, B.name AS BOOK_NAME ,B.price, B.image,A.name AS AUTHOR_NAME, SUM(AMOUNT) AS SOLD
        from PICKED p
        JOIN BOOK B on p.BOOK_ID = B.ID
        JOIN AUTHOR A on B.AUTHOR_ID = A.ID
        where months_between(sysdate, p.CREATED_AT) <= 1
        group by A.name, B.name, B.price, B.image, p.BOOK_ID
        order by SUM(AMOUNT) desc
        fetch first 10 rows only
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getRecentlySoldBooks(){
    const sql = `
        select distinct(p.BOOK_ID) as book_id, B.name AS Book_name,B.price,B.image, A.name AS Author_Name
        from picked p
        JOIN BOOK B on B.ID = p.BOOK_ID
        JOIN AUTHOR A ON B.AUTHOR_ID = A.ID
        JOIN CART C2 on C2.ID = p.CART_ID
        JOIN BOOK_ORDER BO on C2.ID = BO.CART_ID
        order by p.CREATED_AT desc
        fetch first 10 rows only
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAuhtorsWithMostSoldBooksByMonth(){
    const sql=`
        select a.id as author_id, a.name as author_name, SUM(p.AMOUNT) AS BOOKS_SOLD
        from picked p
        JOIN CART C2 on C2.ID = p.CART_ID
        JOIN BOOK_ORDER ON C2.ID = BOOK_ORDER.CART_ID
        join BOOK b on (p.BOOK_ID = b.ID)
        join author a on (b.AUTHOR_ID = a.ID)
        where months_between(sysdate, p.CREATED_AT) <= 1
        group by a.ID, a.NAME
        order by SUM(p.AMOUNT) desc
        fetch first 10 rows only
    `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getTopSoldBooksByAuthor(authorId){
    const sql=`
        select b.ID AS BOOK_ID,b.NAME AS BOOK_NAME,b.IMAGE,b.PRICE,a.id as author_id, a.name as author_name, SUM(p.AMOUNT) AS BOOKS_SOLD
        from picked p
        JOIN CART C2 on C2.ID = p.CART_ID
        JOIN BOOK_ORDER ON C2.ID = BOOK_ORDER.CART_ID
        JOIN BOOK b on (p.BOOK_ID = b.ID)
        JOIN author a on (b.AUTHOR_ID = a.ID) AND a.ID = :authorId
        group by a.ID, a.NAME,b.ID,b.NAME,b.IMAGE,b.PRICE
        order by SUM(p.AMOUNT) desc
        fetch first 10 rows only
    `;
    const binds = {
        authorId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getMostReviewedBooksByMonth(){
    const sql=`
        select count(*) AS REVIEW_COUNT, b.ID AS BOOK_ID,b.NAME AS BOOK_NAME,b.IMAGE,b.PRICE,a.id as author_id, a.name as author_name
        from RATES
        JOIN BOOK B on RATES.BOOK_ID = B.ID
        JOIN AUTHOR A on B.AUTHOR_ID = A.ID
        where months_between(sysdate, CREATED_AT) <= 1
        group by  a.id, b.NAME, b.IMAGE, b.PRICE, b.ID, a.name
        order by count(*) desc
        FETCH FIRST 10 ROWS ONLY
    `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports = {
    getMostReviewedBooksByMonth,
    getAuhtorsWithMostSoldBooksByMonth,
    getMostSoldBooksOfLastMonth,
    getRecentlySoldBooks,
    getTopSoldBooksByAuthor
}