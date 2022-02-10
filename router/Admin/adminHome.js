// libraries
const express = require('express');
const DB_admin_stats = require('../../Database/DB-admin-stats-api');


// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{

    if( req.admin == null )
        return res.redirect('/admin/login');

    const monthlyStatsResult = await DB_admin_stats.getMonthlyStats();
    const yearlyStatsResult = await DB_admin_stats.getYearlyStats();
    const monthlyEarningsResult = await DB_admin_stats.getLastMonthEarnings();
    const yearlyEarningsResult = await DB_admin_stats.getLastYearEarnings();

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminHome',
        monthlyStat:monthlyStatsResult[0],
        yearlyStat:yearlyStatsResult[0],
        monthlyEarnings:monthlyEarningsResult,
        yearlyEarnings:yearlyEarningsResult
    });

});

module.exports = router;