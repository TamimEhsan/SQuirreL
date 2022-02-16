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
            id,name,discount,cap,to_char(validity,'YYYY-MM-DD') AS VALIDITY
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

async function createVoucher(name,discount,validity,cap){
    const sql = `
        INSERT INTO voucher(name,discount,validity,cap)
        VALUES(UPPER(:name),:discount,TO_DATE(:validity,'YYYY-MM-DD'),:cap)
    `;
    const binds = {
        name,discount,validity,cap
    }
    await database.execute(sql, binds, database.options);
    return ;
}
async function getAllVoucher(){
    const sql = `
        SELECT id,name,discount,cap,to_char(validity,'YYYY-MM-DD') AS VALIDITY
        FROM voucher
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function updateVoucher(id,name,discount,validity,cap){
    const sql = `
        UPDATE voucher
        SET name = :name, discount = :discount, validity = TO_DATE(:validity,'YYYY-MM-DD'), cap = :cap
        WHERE id = :id
    `;
    const binds = {
        id,name,discount,validity,cap
    }
    await database.execute(sql, binds, database.options);
    return ;
}

module.exports = {
    getVoucherByName,
    getVoucherById,
    createVoucher,
    getAllVoucher,
    updateVoucher
}