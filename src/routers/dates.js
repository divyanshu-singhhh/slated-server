const express = require("express");
const axios = require('axios');
const moment = require('moment');
const CsvParser = require("json2csv").Parser;

const router = new express.Router();

router.get("/api/dates", async (req, res) => {
    try {
        let queryDate = moment(req.query.date, "DD/MM/YYYY");
        let weekStart = queryDate.clone().startOf('week');

        let days = [];
        for (i = 0; i <= 6; i++) {

            days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd"));

        };
        res.status(201).send(days);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/api/datescsv", async (req, res) => {
    try {
        let queryDate = moment(req.query.date, "DD/MM/YYYY");
        let weekStart = queryDate.clone().startOf('week');

        const csvFields = ["Date", "Day", "Month", "Year"];
        const csvParser = new CsvParser({ csvFields });
        let csvDateData = [];
        for (i = 0; i <= 6; i++) {
            let day = moment(weekStart).add(i, 'days');
            csvDateData.push({Date: day.format("DD/MM/YYYY") , Day: day.format('dddd'), Month: day.format('MMMM'), Year: day.format('YYYY')})
        };

        const csvData = csvParser.parse(csvDateData);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=dates.csv");
        res.status(201).send(csvData);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});



module.exports = router;
