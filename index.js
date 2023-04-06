const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();
const PORT = 1818;

app.use(cors());
app.use(bodyParser.json());

const readData = async () => {
    try {
        const data = await fs.promises.readFile("data.json");
        const parsedData = JSON.parse(data);
        utilization = parsedData.utilization;
        maxCapacity = parsedData.maxCapacity;
        price = parsedData.price;
        revenue = parsedData.revenue;
        console.log("Data loaded successfully");
    } catch (error) {
        console.log(error);
    }
};

const saveData = async () => {
    try {
        const data = JSON.stringify({
            utilization,
            maxCapacity,
            price,
            revenue,
        });
        await fs.writeFile("data.json", data);
        console.log("Data saved successfully");
    } catch (error) {
        console.log("Error saving data: ", error);
    }
};

app.get("/", (req, res) => {
    res.json({
        utilization,
        maxCapacity,
        price,
        revenue,
    });
});

app.post("/update-utilization", (req, res) => {
    const { increment } = req.body;
    utilization += increment;
    saveData();
    res.json({ message: "Utilization updated successfully" });
});

app.post("/sell-all", (req, res) => {
    revenue = revenue + req.body.utilization * price; // calculate the revenue
    utilization = 0; // reset the utilization to 0;
    saveData();
    res.json({ revenue }); // send the revenue back to the client
});

app.post("/reset-revenue", (req, res) => {
    revenue = 0;
    saveData();
    res.json({ revenue });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
