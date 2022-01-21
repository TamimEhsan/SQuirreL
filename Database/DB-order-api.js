const database = require('./database');


// function to get id from email
async function createOrderFromCart(cartId,voucherId,total_price,total_item,name,phone1,phone2,address,pick){
    const sql = `
        INSERT INTO book_order(cart_id,voucher_id,total_price,total_item,name,phone1,phone2,address,pick,state) VALUES(:cartId,:voucherId,:total_price,:total_item,:name,:phone1,:phone2,:address,:pick,1)
        `;
    const binds = {
        cartId,voucherId,total_price,total_item,name,phone1,phone2,address,pick
    }
    return (await database.execute(sql, binds, database.options)).rows;
}


async function getAllOrder(userId){
    const sql = `
        SELECT 
            *
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id and cart.user_id = :userId
        `;
    const binds = {
        userId:userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getOrderById(userId,orderId){
    console.log(userId,"kenovi",orderId);
    const sql = `
        SELECT 
            *
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id and cart.user_id = :userId
        WHERE book_order.id = :orderId
        `;
    const binds = {
        userId:userId,
        orderId:orderId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports = {
    createOrderFromCart,
    getAllOrder,
    getOrderById
}