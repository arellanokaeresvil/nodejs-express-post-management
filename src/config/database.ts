import {DataSource} from 'typeorm'

const AppDataSource = new DataSource({
    type: process.env.DB_CONNECTION || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "test",

    synchronize: false,
    logging: false,
    entities: [],
    // subscribers: [],
    // migrations: [],
})

export default AppDataSource
