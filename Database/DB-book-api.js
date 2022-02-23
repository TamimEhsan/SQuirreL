const database = require('./database');


// function to get id from email
async function getAllBooks(offset,limit){
    console.log(offset,limit)
    const sql = `
        SELECT 
            *
        FROM 
            Book
        ORDER BY name
        OFFSET :offset ROWS 
        FETCH NEXT :limit ROWS ONLY
        `;
    const binds = {
        offset,limit
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getAllBooksCount(){
    const sql = `
        SELECT 
            COUNT(*) AS CNT
        FROM 
            Book
        `;
    const binds = {
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getBookByID(ID){
    const sql = `
        SELECT
            book.id,book.name,book.PRICE,book.LANGUAGE,book.IMAGE,book.EDITION,book.ISBN,book.PAGE,book.PUBLISHING_YEAR, BOOK.STAR AS STARS, BOOK.REVIEW_COUNT, Book.genre, Book.stock,
            author.id AS author_id,author.name AS author_name,author.description AS author_description, author.image AS author_image,
            publisher.id as publisher_id,publisher.name AS publisher_name
        FROM
            book
        LEFT JOIN rates ON rates.BOOK_ID = book.id
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

async function getBookByAuthorID(ID,offset,limit){
    const sql = `
        SELECT 
            book.*
        FROM book
        JOIN author ON author.id = book.author_id
        WHERE 
            book.author_id = :id
        ORDER BY book.name
        OFFSET :offset ROWS 
        FETCH NEXT :limit ROWS ONLY
        `;
    const binds = {
        id:ID,offset,limit
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getBookByAuthorIDCount(ID){
    const sql = `
        SELECT 
            COUNT(*) AS CNT
        FROM 
            book
        JOIN author ON author.id = book.author_id
        WHERE 
            book.author_id = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getBooksByPublisherID(ID,offset,limit){
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
        ORDER BY book.name
        OFFSET :offset ROWS 
        FETCH NEXT :limit ROWS ONLY
        `;
    const binds = {
        id:ID,offset,limit
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getBookByPublisherIDCount(ID){
    const sql = `
        SELECT 
            COUNT(*) AS CNT
        FROM 
            book
        JOIN publisher ON publisher.id = book.publisher_id
        WHERE 
            book.publisher_id = :id
        `;
    const binds = {
        id:ID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function searchBooks(keyword,offset,limit){
    const sql = `
        SELECT
            B.ID,B.NAME,B.IMAGE,B.STOCK,B.PRICE,B.STAR,B.REVIEW_COUNT,
            A.NAME AS author_name
        FROM BOOK B
        JOIN AUTHOR A on B.AUTHOR_ID = A.ID
        JOIN PUBLISHER P on B.PUBLISHER_ID = P.ID
        WHERE (( LOWER(B.NAME) LIKE '%'||LOWER(:keyword)||'%') OR ( LOWER(A.NAME) LIKE '%'||LOWER(:keyword)||'%') OR ( LOWER(P.NAME) LIKE '%'||LOWER(:keyword)||'%') OR ( LOWER(B.GENRE) LIKE '%'||LOWER(:keyword)||'%'))
        ORDER BY name
        OFFSET :offset ROWS 
        FETCH NEXT :limit ROWS ONLY
    `;
    const binds = {
        keyword:keyword,
        offset,limit
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function searchBooksCount(keyword){
    const sql = `
        SELECT
           COUNT(*) AS CNT
        FROM BOOK B
        JOIN AUTHOR A on B.AUTHOR_ID = A.ID
        JOIN PUBLISHER P on B.PUBLISHER_ID = P.ID
        WHERE (( LOWER(B.NAME) LIKE '%'||:keyword||'%') OR ( LOWER(A.NAME) LIKE '%'||:keyword||'%') OR ( LOWER(P.NAME) LIKE '%'||:keyword||'%'))
    `;
    const binds = {
        keyword:keyword
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function editBook(id,image,page,year,price,edition,stock,genre){
    const sql = `
        UPDATE BOOK
        SET image = :image, page = :page, publishing_year = :year, price = :price, edition = :edition, stock = :stock,genre = :genre
        WHERE id = :id
    `
    const binds = {
        id:id,
        image:image,
        page:page,
        year:year,
        price:price,
        edition:edition,
        stock:stock,
        genre:genre
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function addBook(name,author_id,pub_id,image,language,isbn,page,year,price,edition,stock,genre){
    const sql = `
        INSERT INTO book(author_id,publisher_id,publishing_year,price,language,image,name,isbn,page,edition,stock,genre)
        VALUES(:author_id,:pub_id,:year,:price,:language,:image,:name,:isbn,:page,:edition,:stock,:genre)
    `;
    const binds = {
        name,author_id,pub_id,image,language,isbn,page,year,price,edition,stock,genre
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function getNewBooks(){
    const sql = `
        SELECT 
            *
        FROM 
            Book
        ORDER BY ID DESC
        FETCH FIRST 10 ROWS ONLY
    `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}


module.exports = {
    getAllBooks,
    getAllBooksCount,
    getBookByID,
    getBookByAuthorID,
    getBookByAuthorIDCount,
    getBooksByPublisherID,
    getBookByPublisherIDCount,
    searchBooks,
    searchBooksCount,
    editBook,
    addBook,
    getNewBooks
}