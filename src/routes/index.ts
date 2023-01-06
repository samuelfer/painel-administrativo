import { Request, Response, Router } from "express";
import ProductController from "@/controllers/ProductController";

const routes = Router();

routes.get("/api/products", ProductController.getAll);
routes.get("/api/products/:id", ProductController.getById);
routes.post("/api/products", ProductController.create);
routes.put("/api/products/:id", ProductController.update);
routes.delete("/api/products/:id", ProductController.delete);

routes.get("*", (_: Request, resp: Response) => {
    resp.status(404).send({
        error: "Not Found",
    });
});

export default routes;
