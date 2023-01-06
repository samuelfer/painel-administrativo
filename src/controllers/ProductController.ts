import { Product } from "@/entities/product.entity";
import { Request, Response } from "express";
import AppDataSource from "@/connection";
import { validate } from "class-validator";

class ProductController {
    async getAll(req: Request, resp: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find();
        return resp.status(200).send({
            success: true,
            data: products,
        });
    }

    async getById(req: Request, resp: Response): Promise<Response> {
        const id: number = +req.params.id;

        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            return resp.status(404).send({
                success: false,
                message: `Produto não encontrado com id ${id}`,
                data: product,
            });
        }
        return resp.status(200).send({
            success: true,
            data: product,
        });
    }

    async create(req: Request, resp: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product);
        const { name, description } = req.body;

        const product = new Product();
        product.name = name;
        product.description = description;

        const errors = await validate(product);

        if (errors.length > 0) {
            return resp.status(422).send({ errors });
        }

        try {
            const productSaved = await productRepository.save(product);

            return resp.status(201).send({
                success: true,
                data: productSaved,
            });
        } catch (error) {
            return resp.status(500).send({
                success: false,
                message: `Ocorreu um erro ao tentar cadastrar o produto`,
            });
        }
    }

    async update(req: Request, resp: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product);

        const { name, description } = req.body;
        const id: number = +req.params.id;

        let product;
        try {
            product = await productRepository.findOneByOrFail({ id });
        } catch (error) {
            return resp.status(404).send({
                success: false,
                message: `Produto não encontrado com id ${id}`,
            });
        }

        product.name = name;
        product.description = description;

        const errors = await validate(product);

        if (errors.length > 0) {
            return resp.status(422).send({ errors });
        }

        try {
            const productSaved = await productRepository.save(product);

            return resp.status(200).send({
                success: true,
                data: productSaved,
            });
        } catch (error) {
            return resp.status(500).send({
                success: false,
                message: `Ocorreu um erro ao tentar atualizar o produto de id ${id}`,
            });
        }
    }

    async delete(req: Request, resp: Response): Promise<Response> {
        const productRepository = AppDataSource.getRepository(Product);
        const id: number = +req.params.id;

        try {
            await productRepository.findOneByOrFail({ id });
        } catch (error) {
            return resp.status(404).send({
                success: false,
                message: `Produto não encontrado com id ${id}`,
            });
        }

        try {
            await productRepository.delete(id);
            return resp.status(204).send({});
        } catch (error) {
            return resp.status(400).send({
                success: false,
                message: `Ocorreu um erro ao tentar deletar o produto de id ${id}`,
            });
        }
    }
}

export default new ProductController();
