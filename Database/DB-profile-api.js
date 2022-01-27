const database = require('./database');

async function getProfile(userId){
    const sql = `
        SELECT 
            *
        FROM 
            app_user
        WHERE 
            id = :userId
        `;
    const binds = {
        userId:userId
    }
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateProfile(id,name,dob,phone,image){
    const sql = `
        UPDATE app_user SET
        NAME = :name, DOB = :dob, PHONE = :phone, IMAGE = :image
        WHERE ID = :id
    `;
    const binds = {
        id:id,
        name:name,
        dob:dob,
        phone:phone,
        image:image
    }
    await database.execute(sql, binds, database.options);
    return;
}
module.exports = {
    getProfile,
    updateProfile
}