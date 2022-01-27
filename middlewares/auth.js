// libraries
const jwt = require('jsonwebtoken');

// my modules
const DB_auth = require('../Database/DB-auth-api');

function auth(req, res, next){
    req.user = null;
    // check if user has cookie token
    if(req.cookies.sessionToken){
        let token = req.cookies.sessionToken;
        // verify token was made by server
        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) =>{
            if(err){
                console.log("ERROR at verifying token: " + err.message);
                next();
            } else {
                // get user prompt (id, handle, message count) from id
                const decodedId = decoded.id;
                let results = await DB_auth.getLoginInfoByID(decodedId);

                // if no such user or token doesn't match, do nothing
               if(results.length == 0){
                    //console.log('auth: invalid cookie');
                }/* else if(results[0].LOGIN_TOKEN != token){
                    //console.log('auth: invalid token');
                } */else{
                    // set prompt in reqest object
                    let time = new Date();
                  //  await DB_auth.updateLoginTimeById(decodedId, time);

                    req.user = {
                        id: decodedId,
                        EMAIL: results[0].EMAIL,
                        NAME: results[0].NAME,
                        IMAGE:results[0].IMAGE
                    }
                }
                next();
            }
        });
    } else {
        next();
    }   
}

module.exports = auth;