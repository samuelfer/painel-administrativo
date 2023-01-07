import AppDataSource from "@/database/connection";
import ProductDTO from "@/entities/dto/product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
    private repository: Repository<Product>;

    constructor() {
        this.repository = AppDataSource.getRepository(Product);
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<Product | null> {
        return await this.repository.findOneBy({ id });
    }

    async findOrFail(id: number): Promise<Product> {
        return await this.repository.findOneByOrFail({ id });
    }

    async save(productDTO: ProductDTO): Promise<Product> {
        const product = new Product();
        product.name = productDTO.name;
        product.description = productDTO.description;

        return await this.repository.save(product);
    }

    async delete(id: number) {
        await this.repository.delete({ id });
    }
}
