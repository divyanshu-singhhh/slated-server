const express = require("express");

const genderRouter = require("./routers/gender");
const datesRouter = require("./routers/dates");

const app = express();

app.use(express.json());
app.use(genderRouter);
app.use(datesRouter);

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App is running on port " + port);
});
