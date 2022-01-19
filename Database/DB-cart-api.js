const database = require('./database');


// function to get id from email
async function getAllCarts(userID){
    const sql = `
        SELECT 
            *
        FROM 
            cart
        WHERE user_id = :userID
        `;
    const binds = {
        userID:userID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getItemsInCart(userId){
    const sql =`
        SELECT * FROM picked
        JOIN app_user ON app_user.cart_id = picked.cart_id and app_user.id = :userId
    `;
    const binds = {
        userId:userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getCartByID(userID,cartID){
    const sql = `
        SELECT 
            *
        FROM 
            cart
        WHERE user_id = :userID and id = :cartID
        `;
    const binds = {
        id:cartID,
        userID:userID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getRecentCart(userID){
    const sql = `
        SELECT * FROM cart 
        WHERE user_id = :userID
        ORDER BY created_at
    `
    const binds = {
        userID:userID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function addNewCart(userID){
    const sql = `
        INSERT INTO cart(user_id) VALUES(:userID)
    `;
    const binds = {
        userID:userID
    }
    await database.execute(sql, binds, database.options);
    const cartResult = await getRecentCart(userID);
    const cartID = cartResult[0].ID;
    const sql2 = `
        UPDATE APP_USER SET cart_id = :cartID WHERE id = :userID
    `
    const binds2 = {
        cartID:cartID,
        userID:userID
    };
    const updateResult = await database.execute(sql2, binds2, database.options)
    return;
}
async function checkCart(userID,bookID){
    const sql = `
        SELECT picked.ID
        FROM picked
        JOIN app_user ON picked.cart_id = app_user.cart_id and app_user.id = :userID
        WHERE picked.book_id = :bookID
    `
    const binds = {
        userID:userID,
        bookID:bookID
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function addToCart(userID,bookID){
    const sql = `
        INSERT INTO picked(cart_id,book_id) VALUES( (select cart_id from app_user WHERE id = :userID),:bookID )
    `;
    const binds = {
        userID:userID,
        bookID:bookID
    }
    const updateResult = await database.execute(sql, binds, database.options);
    return;

}
module.exports = {
    getAllCarts,
    getCartByID,
    addNewCart,
    addToCart,
    checkCart,
    getItemsInCart
}