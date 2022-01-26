const database = require('./database');

async function getVoucherByName(name){
    const sql = `
        SELECT 
            *
        FROM 
            voucher
        WHERE 
            name = :name
        `;
    const binds = {
        name:name
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getVoucherById(id){
    const sql = `
        SELECT 
            *
        FROM 
            voucher
        WHERE 
            id = :id
        `;
    const binds = {
        id:id
    }
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports = {
    getVoucherByName,
    getVoucherById
}