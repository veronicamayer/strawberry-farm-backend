const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 1818;

app.use(cors());
app.use(bodyParser.json());

let utilization = 0;
let maxCapacity = 100;
let price = 0.3;
let revenue = 0;

app.get("/", (req, res) => {
    res.json({
        utilization,
        maxCapacity,
        price,
        revenue,
    });
});

app.post("/update-utilization", async (req, res) => {
    const { increment } = req.body;
    utilization += increment;
    res.json({ message: "Utilization updated successfully" });
});

app.post("/sell-all", async (req, res) => {
    revenue = revenue + req.body.utilization * price; // calculate the revenue
    utilization = 0; // reset the utilization to 0
    res.json({ revenue }); // send the revenue back to the client
});

app.post("/reset-revenue", async (req, res) => {
    revenue = 0;
    res.json({ revenue });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
