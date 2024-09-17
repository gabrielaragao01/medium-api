import dotenv from 'dotenv';
import express from 'express';
import './src/database';
import PostRoutes from './src/routes/postRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import UserRoutes from './src/routes/userRoutes';
import cors from 'cors';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }
    routes() {
        const userRoutes = new UserRoutes();  // Instancie a classe UserRoutes
        const postRoutes = new PostRoutes(); // Instanciando PostRoutes com 'new'

        this.app.use('/', userRoutes.setup());
        this.app.use('/tokens/', tokenRoutes)
        this.app.use('/posts/', postRoutes.setup())
    }
    setup() {
        this.middlewares();
        this.routes();
    };
}

export default new App().app