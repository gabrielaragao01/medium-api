import Post from "../models/Post";

export default class PostService {
    async create(post) {
        const transaction = await Post.sequelize.transaction();

        try {
            console.log('Criando:', post)
            const postCreated = await Post.create(post, { transaction });

            await transaction.commit();

            return postCreated;
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao criar post:', error)  ;  // Log do erro

            throw error;
        }
    }

    update({ changes, filter }) {
		return Post.update(changes, {
			where: {
				user_id: filter.logged_user_id,
				id: filter.id,
			},
		});
	}

    delete(filter) {
		return Post.destroy({
			where: {
				id: filter.id,
			},
		});
	}

	async list() {
        // eslint-disable-next-line no-useless-catch
        try {
            const posts = await Post.findAll();
            return posts;
        } catch (error) {
            throw error;
        }
    }

    // Função para listar um post por ID
    async listById(id) {
        // eslint-disable-next-line no-useless-catch
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } catch (error) {
            throw error;
        }
    }
}

