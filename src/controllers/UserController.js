// import User from '../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// class UserController {
//     // Função de login
//     async login(req, res) {
//         try {
//             const { email, password } = req.body;

//             // 1. Buscar o usuário pelo e-mail
//             const user = await User.findOne({ where: { email } });
//             if (!user) {
//                 return res.status(401).json({ errors: ['Usuário não encontrado'] });
//             }

//             // 2. Verificar se a senha está correta
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (!isPasswordValid) {
//                 return res.status(401).json({ errors: ['Senha inválida'] });
//             }

//             // 3. Gerar um token JWT
//             const token = jwt.sign(
//                 { id: user.id, email: user.email },
//                 process.env.JWT_SECRET, // Certifique-se de definir esta variável no .env
//                 { expiresIn: '1d' } // Token expira em 1 dia
//             );

//             // 4. Retornar o token e informações básicas do usuário
//             return res.json({
//                 user: {
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                 },
//                 token,
//             });

//         } catch (e) {
//             return res.status(500).json({
//                 errors: [e.message || 'Ocorreu um erro inesperado'],
//             });
//         }
//     }

//     // Função para criar usuário já existente
//     async create(req, res) {
//         try {
//             const novoUser = await User.create(req.body);
//             return res.json(novoUser);
//         } catch (e) {
//             const errorMessages = e.errors ? e.errors.map((err) => err.message) : [e.message];
//             return res.status(400).json({ errors: errorMessages });
//         }
//     }

//     // Função para atualizar usuário já existente
//     async update(req, res) {
//         try {
//             if (!req.params.id) {
//                 return res.status(400).json({
//                     errors: ['ID é necessário'],
//                 });
//             }

//             const user = await User.findByPk(req.params.id);
//             if (!user) {
//                 return res.status(404).json({
//                     errors: ['Usuário não encontrado'],
//                 });
//             }

//             const novosDados = await user.update(req.body);
//             return res.json(novosDados);
//         } catch (e) {
//             return res.status(500).json({
//                 errors: [e.message || 'Ocorreu um erro inesperado'],
//             });
//         }
//     }

//     // Função para deletar usuário
//     async delete(req, res) {
//         try {
//             if (!req.params.id) {
//                 return res.status(400).json({
//                     errors: ['ID é necessário'],
//                 });
//             }

//             const user = await User.findByPk(req.params.id);
//             if (!user) {
//                 return res.status(404).json({
//                     errors: ['Usuário não encontrado'],
//                 });
//             }

//             await user.destroy();
//             return res.status(204).send();
//         } catch (e) {
//             return res.status(500).json({
//                 errors: [e.message || 'Ocorreu um erro inesperado'],
//             });
//         }
//     }
// }

// export default new UserController();

import UserService from "../services/UserService";
import BaseController from "./BaseController";

export default class UserController extends BaseController{
    constructor() {
        super();

        this.UserService = new UserService()

        this.bindActions(['create', 'update', 'delete']);
    }
    async create(req, res) {
        try {
            const user = await this.UserService.create(req.body);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
    async update(req, res) {
        const authenticatedUser = req.auth.id;

        try {
            const user = await this.UserService.update(req.body, authenticatedUser);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
    async delete(req, res) {
        const authenticatedUser = req.auth.id;

        try {
            const user = await this.UserService.delete(authenticatedUser);
            this.successHandler(user, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
}
