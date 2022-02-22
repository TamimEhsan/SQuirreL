const database = require('./database');


// function to get id from email
async function createOrderFromCart(userId,voucherId,name,phone1,phone2,address,pick){

    const sql = `
        BEGIN
            CREATE_ORDER(:userId,:voucherId,:name,:phone1,:phone2,:address,:pick);
        END;
    `
    const binds = {
        userId,voucherId,name,phone1,phone2,address,pick
    }
    await database.execute(sql, binds, database.options);
    return ;
}


async function getAllOrderByUserId(userId){
    const sql = `
        SELECT 
            BOOK_ORDER.*
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id and cart.user_id = :userId
        ORDER BY book_order.ID DESC
        `;
    const binds = {
        userId:userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllOrderByStatus(userId,status){
    const sql = `
        SELECT 
            BOOK_ORDER.*
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id and cart.user_id = :userId
        WHERE STATE = :status
        ORDER BY book_order.created_at DESC
        `;
    const binds = {
        userId:userId,
        status:status
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getOrderById(userId,orderId){
    const sql = `
        SELECT 
           BOOK_ORDER.*
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
async function getOrderByIdAdmin(orderId){
    const sql = `
        SELECT 
           BOOK_ORDER.*
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id
        where book_order.id = :orderId
        `;
    const binds = {
        orderId:orderId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getOrderByCartId(userId,cartId){
    const sql = `
        SELECT 
           BOOK_ORDER.*
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id and cart.user_id = :userId
        WHERE book_order.cart_id = :cartId
        `;
    const binds = {
        userId:userId,
        cartId:cartId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getAllUncompleteOrder(){
    const sql = `
        SELECT 
            book_order.*,app_user.name
        FROM 
            book_order
        JOIN cart ON cart.id = book_order.cart_id 
        JOIN app_user ON app_user.id = cart.user_id 
        WHERE book_order.state<5
        ORDER BY book_order.created_at DESC
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;

}
async function updateOrderState(order_id,state){
    const sql = `
      UPDATE book_order 
      SET state = :state
      WHERE id = :id  
    `;
    const binds = {
        id:order_id,
        state:state
    }
    await database.execute(sql, binds, database.options);
    return;
}
module.exports = {
    createOrderFromCart,
    getAllOrderByUserId,
    getOrderById,
    getAllOrderByStatus,
    getAllUncompleteOrder,
    updateOrderState,
    getOrderByIdAdmin,
    getOrderByCartId
}