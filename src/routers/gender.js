const express = require("express");
const axios = require('axios');

const router = new express.Router();

router.get("/api/gender", async (req, res) => {
    try {
        let gender = await axios.get(`https://api.genderize.io/?name=${req.query.name}`);
        res.status(201).send(gender.data);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;
