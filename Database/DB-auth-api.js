const database = require('./database');



// function to get id from email
async function getUserIDByEmail(email){
    const sql = `
        SELECT 
            ID
        FROM 
            APP_USER
        WHERE 
            EMAIL = :email
        `;
    const binds = {
        email : email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

// function to creat new user
// user should have handle, email, pass, dob
// {id} will be returned
async function createNewUser(user){
    const sql = `
        INSERT INTO
            APP_USER(NAME,EMAIL, PASSWORD,ADDRESS)
        VALUES 
            (:name,:email,:password,:address)
    `;
    const binds = {
        name: user.name,
        email :user.email,
        password: user.password,
        address: "user.address",
    }
    return await database.execute(sql, binds, {});
}

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email){
    const sql = `
        SELECT 
            ID,
            NAME,
            PASSWORD
        FROM
            APP_USER
        WHERE
            EMAIL = :email
    `;
    const binds = {
        email: email
    }

    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLoginInfoByID(id){
    const sql = `
        SELECT 
            ID,
            NAME,
            PASSWORD,
            EMAIL,
            IMAGE
        FROM
            APP_USER
        WHERE
            ID = :id
    `;
    const binds = {
        id: id
    }

    return (await database.execute(sql, binds, database.options)).rows;
}
/*
// set new token in user table
// empty rows are returned
async function updateUserTokenById(id, token){
    const sql = `
        UPDATE
            USER_ACCOUNT
        SET
            LOGIN_TOKEN = :token
        WHERE
            ID = :id
    `;
    const binds = {
        id: id,
        token: token
    };
    
    await database.execute(sql, binds, database.options);
    return;
}
/*
// return user prompt (handle, login_token, msgCount) from id
async function getUserPromptById(id){
    const sql = `
        SELECT
            U.HANDLE,
            U.LOGIN_TOKEN,
            U.RATING,
            R.COLOR,
            (SELECT
                COUNT(*)
            FROM
                MESSAGE
            WHERE
                TO_USER_ID = :id AND
                TIME_READ = NULL
            ) AS "MESSAGE_COUNT"
        FROM
            USER_CONTESTANT_VIEW "U" JOIN
            RANK "R" ON (U.RANK_ID = R.ID)
        WHERE
            U.ID = :id
    `;
    const binds = {
        id: id
    }
    
    return (await database.execute(sql, binds, database.options)).rows;
}

async function updateLoginTimeById(id, time){
    const sql = `
        UPDATE
            USER_ACCOUNT
        SET
            LOGIN_TIME = :time
        WHERE
            ID = :id
    `;
    const binds = {
        id: id,
        time: time
    };
    await database.execute(sql, binds, database.options);
    return;
}
*/

module.exports = {
    getUserIDByEmail,
    createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByID,
  // updateUserTokenById,
   // getUserPromptById,
   // updateLoginTimeById
}