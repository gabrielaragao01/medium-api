import Post from "../models/Post";
import User from "../models/User";
import PaginationUtils from '../utils/pagination'

export default class PostService {
    async create(post) {
        const transaction = await Post.sequelize.transaction();

        try {
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

	async list(meta) {

        const Pagination = PaginationUtils.config({
            page: meta.page
        });
        const postsPromise = Post.findAll({
            ...Pagination.getQueryParams(),
            order: [['updated_at', 'DESC']]
        });

        let totalItemsPromise;
        if (Pagination.getPage() === 1) {
            totalItemsPromise = Post.count({});
        }
        const [posts, totalItems] = await Promise.all([
            postsPromise,
            totalItemsPromise || 0
        ]);

        return {
            ...Pagination.mount(totalItems),
            posts,
        };
    }


    async listById(id) {
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email"],
                    },
                ],
            });
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        }
    }

