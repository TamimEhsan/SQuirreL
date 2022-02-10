const database = require('./database');

async function getMonthlyStats(){
    const sql = `
        select SUM(p.AMOUNT) as total_books_sold, sum(b.PRICE*p.AMOUNT) as total_earned_money
        from picked p
        join book b on(p.BOOK_ID = b.id)
        JOIN BOOK_ORDER BO ON p.CART_ID = bo.CART_ID
        where months_between(sysdate, p.CREATED_AT) <= 1 AND to_char(sysdate,'MM') = to_char(p.CREATED_AT,'MM')
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getYearlyStats(id){
    const sql = `
       select SUM(p.AMOUNT) as total_books_sold, sum(b.PRICE*p.AMOUNT) as total_earned_money
        from picked p
        join book b on(p.BOOK_ID = b.id)
        JOIN BOOK_ORDER BO ON p.CART_ID = bo.CART_ID
        where to_char(sysdate,'YY') = to_char(p.CREATED_AT,'YY')
        `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}

async function getLastMonthEarnings(){
    const sql=`
        select sum(b.price) as total_earned,to_char(p.CREATED_AT,'MON') AS MONTH, to_char(p.CREATED_AT,'DD') as Day
        from picked p
        join book b on (p.BOOK_ID = b.id)
        JOIN BOOK_ORDER BO on p.CART_ID = bo.CART_ID
        where trunc(sysdate - p.CREATED_AT) <= 30
        group by to_char(p.CREATED_AT,'DD'),to_char(p.CREATED_AT,'MM'),to_char(p.CREATED_AT,'MON')
        ORDER BY to_char(p.CREATED_AT,'MM'),to_char(p.CREATED_AT,'DD')
    `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
async function getLastYearEarnings(){
    const sql=`
        select sum(b.price) as total_earned, to_char(p.CREATED_AT,'MON') as month
        from picked p
        join book b on (p.BOOK_ID = b.id)
        JOIN BOOK_ORDER BO on p.CART_ID = bo.CART_ID
        where months_between(sysdate, p.CREATED_AT) <= 12
        group by trunc(months_between(sysdate, p.CREATED_AT)),to_char(p.CREATED_AT,'MON'),to_char(p.CREATED_AT,'MM')
        order by to_char(p.CREATED_AT,'MM') 
    `;
    const binds = {}
    return (await database.execute(sql, binds, database.options)).rows;
}
module.exports = {
    getMonthlyStats,
    getYearlyStats,
    getLastMonthEarnings,
    getLastYearEarnings
}