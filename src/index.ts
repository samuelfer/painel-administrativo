import "module-alias/register";
import "@/database/connection";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "@/routes";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.get("/", (req, resp) => {
    resp.send("Server up");
});

app.listen(PORT, () => {
    console.log(`Server runnig in port ${PORT}`);
});
