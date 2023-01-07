import ProductDTO from "@/entities/dto/product.dto";
import { validate } from "class-validator";
import { Request, Response } from "express";

import { ProductRepository } from "./../repositories/productRepository";

class ProductController {
    private productRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    getAll = async (_: Request, resp: Response): Promise<Response> => {
        const products = await this.productRepository.getAll();
        return resp.status(200).send({
            success: true,
            data: products,
        });
    };

    getById = async (req: Request, resp: Response): Promise<Response> => {
        const id: number = +req.params.id;

        const product = await this.productRepository.getById(id);

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
    };

    create = async (req: Request, resp: Response): Promise<Response> => {
        const { name, description } = req.body;

        const productDto = new ProductDTO();
        productDto.name = name;
        productDto.description = description;

        const errors = await validate(productDto);

        if (errors.length > 0) {
            return resp.status(422).send({ errors });
        }

        try {
            const productSaved = await this.productRepository.save(productDto);

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
    };

    update = async (req: Request, resp: Response): Promise<Response> => {
        const { name, description } = req.body;
        const id: number = +req.params.id;

        let product;
        try {
            product = await this.productRepository.findOrFail(id);
        } catch (error) {
            return resp.status(404).send({
                success: false,
                message: `Produto não encontrado com id ${id}`,
            });
        }

        if (product) {
            const productDto = new ProductDTO();
            productDto.name = name;
            productDto.description = description;

            const errors = await validate(productDto);

            if (errors.length > 0) {
                return resp.status(422).send({ errors });
            }
        }

        try {
            const productSaved = await this.productRepository.save(product);

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
    };

    delete = async (req: Request, resp: Response): Promise<Response> => {
        const id: number = +req.params.id;

        try {
            await this.productRepository.findOrFail(id);
        } catch (error) {
            return resp.status(404).send({
                success: false,
                message: `Produto não encontrado com id ${id}`,
            });
        }

        try {
            await this.productRepository.delete(id);
            return resp.status(204).send({});
        } catch (error) {
            return resp.status(400).send({
                success: false,
                message: `Ocorreu um erro ao tentar deletar o produto de id ${id}`,
            });
        }
    };
}

export default new ProductController();
