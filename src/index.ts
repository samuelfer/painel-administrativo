import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
import "./connection";
import ProductController from "./controllers/ProductController";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/products", ProductController.getAll);
app.get("/api/products/:id", ProductController.getById);
app.post("/api/products", ProductController.create);
app.put("/api/products/:id", ProductController.update);
app.delete("/api/products/:id", ProductController.delete);

app.get("/", (req, resp) => {
    resp.send("Server up");
});

app.listen(PORT, () => {
    console.log(`Server runnig in port ${PORT}`);
});
