// import Post from '../models/Post';
// import PostLike from '../models/PostLike';
// import { Op } from 'sequelize'; 

// class PostController {
//   async create(req, res) {
//     try {
//       const { userId } = req.user; // O usuário deve estar autenticado
//       const { titulo, texto, resumo, available_at } = req.body;

//       if (!titulo || !texto || !resumo || !available_at) {
//         return res.status(400).json({ errors: ['Campos obrigatórios não preenchidos.'] });
//       }

//       const post = await Post.create({
//         usuario_id: userId,
//         titulo,
//         texto,
//         resumo,
//         available_at,
//         total_likes: 0, // Inicialmente sem likes
//       });

//       return res.status(201).json(post);
//     } catch (e) {
//       return res.status(400).json({ errors: e.errors.map(err => err.message) });
//     }
//   }
//   async list(req, res) {
//     try {
//       const { page = 1, limit = 5 } = req.query;
//       const offset = (page - 1) * limit;

//       const posts = await Post.findAll({
//         attributes: ['id', 'usuario_id', 'titulo', 'texto', 'resumo', 'available_at'],
//         where: {
//           available_at: {
//             [Op.lte]: new Date(), // Posts disponíveis até agora
//           },
//         },
//         order: [['available_at', 'DESC']],
//         limit,
//         offset,
//       });

//       const postsWithLikes = await Promise.all(posts.map(async post => {
//         const totalLikes = await PostLike.count({ where: { post_id: post.id, is_deleted: false } });
//         const canRemove = req.user ? post.usuario_id === req.user.id : false;
//         const canEdit = req.user ? post.usuario_id === req.user.id : false;

//         return {
//           ...post.toJSON(),
//           total_likes: totalLikes,
//           allowRemove: canRemove,
//           allowEdit: canEdit,
//         };
//       }));

//       return res.json(postsWithLikes);
//     } catch (e) {
//       return res.status(400).json({ errors: e.errors.map(err => err.message) });
//     }
//   }
//   async listById(req, res) {
//     try {
//       const { id } = req.params;

//       const post = await Post.findByPk(id);

//       if (!post) {
//         return res.status(404).json({ errors: ['Post não encontrado.'] });
//       }

//       const totalLikes = await PostLike.count({ where: { post_id: id, is_deleted: false } });
//       const canRemove = req.user ? post.usuario_id === req.user.id : false;
//       const canEdit = req.user ? post.usuario_id === req.user.id : false;

//       return res.json({
//         ...post.toJSON(),
//         total_likes: totalLikes,
//         allowRemove: canRemove,
//         allowEdit: canEdit,
//       });
//     } catch (e) {
//       return res.status(400).json({ errors: e.errors.map(err => err.message) });
//     }
//   }
//   async delete(req, res) {
//     try {
//       const { id } = req.params;
//       const { userId } = req.user;

//       const post = await Post.findByPk(id);

//       if (!post) {
//         return res.status(404).json({ errors: ['Post não encontrado.'] });
//       }

//       if (post.usuario_id !== userId) {
//         return res.status(403).json({ errors: ['Você não tem permissão para remover este post.'] });
//       }

//       await post.destroy();
//       return res.json({ deleted: true });
//     } catch (e) {
//       return res.status(400).json({ errors: e.errors.map(err => err.message) });
//     }
//   }

//   // Atualizar um post
//   async update(req, res) {
//     try {
//       const { id } = req.params;
//       const { userId } = req.user;
//       const { titulo, texto, resumo, available_at } = req.body;

//       const post = await Post.findByPk(id);

//       if (!post) {
//         return res.status(404).json({ errors: ['Post não encontrado.'] });
//       }

//       if (post.usuario_id !== userId) {
//         return res.status(403).json({ errors: ['Você não tem permissão para editar este post.'] });
//       }

//       await post.update({
//         titulo: titulo || post.titulo,
//         texto: texto || post.texto,
//         resumo: resumo || post.resumo,
//         available_at: available_at || post.available_at,
//       });

//       return res.json(post);
//     } catch (e) {
//       return res.status(400).json({ errors: e.errors.map(err => err.message) });
//     }
//   }
// }

// export default new PostController();


import PostService from "../services/PostService";
import BaseController from "./BaseController";

export default class PostController extends BaseController{
    constructor() { 
        super();

        this.PostService = new PostService();

        this.bindActions(['create', 'update', 'delete', 'list', 'listById']);
    }

    async create(req, res) {
        try {
            const post = await this.PostService.create(req.body);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async update(req, res) {
        const authenticatedUser = req.auth.id;

        try {
            const post = await this.PostService.update({ changes: req.body, filter: { id: req.params.id, userId: authenticatedUser } });
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    async delete(req, res) {
        const authenticatedUser = req.id;

        try {
            const post = await this.PostService.delete({ id: req.params.id, userId: authenticatedUser });
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    // List all posts
    async list(req, res) {
        try {
            const posts = await this.PostService.list();
            this.successHandler(posts, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }

    // List a post by ID
    async listById(req, res) {
        try {
            const post = await this.PostService.listById(req.params.id);
            this.successHandler(post, res);
        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
}
