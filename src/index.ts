import express from "express";
import dotenv from "dotenv";

dotenv.config();
import "./connection";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, resp) => {
    resp.send("Server up");
});

app.listen(PORT, () => {
    console.log(`Server runnig in port ${PORT}`);
});
