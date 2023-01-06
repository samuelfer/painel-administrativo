import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "painel_admin",
    synchronize: true,
    logging: true,
    entities: [__dirname + "/../**/*.entity.ts"],
    subscribers: [],
    migrations: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Connected successfull");
    })
    .catch((error) => console.log(error));

export default AppDataSource;
