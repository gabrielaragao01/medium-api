import dotenv from 'dotenv';
import express from 'express';
import './src/database';
import PostRoutes from './src/routes/postRoutes';
import AuthRoutes from './src/routes/authRoutes';
import UserRoutes from './src/routes/userRoutes';
import cors from 'cors';
import AuthMiddleware from './src/middlewares/auth';

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
        const authRoutes = new AuthRoutes();

        this.app.use('/', userRoutes.setup());
        this.app.use('/auth', authRoutes.setup())
        this.app.use('/posts', AuthMiddleware.isAuthorized, postRoutes.setup())
    }
    setup() {
        this.middlewares();
        this.routes();
    };
}

export default new App().app
