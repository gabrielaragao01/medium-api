import PostLike from "../models/PostLike";
import Post from "../models/Post";

export default class PostLikeService {
  async like(filter) {
    const transaction = await PostLike.sequelize.transaction();
    console.log(filter);

    try {
      const liked = await PostLike.findOne({
        where: {
          post_id: filter.id,
          user_id: filter.user_id,
          is_deleted: false,
        },
        transaction,
      });

      console.log(liked);

      if (liked) {
        throw new Error("Post already liked");
      }

      await PostLike.create(
        {
          post_id: filter.id,
          user_id: filter.user_id,
        },
        { transaction }
      );

      await Post.increment("total_likes", {
        where: {
          id: filter.id,
        },
        by: 1,
        transaction,
      });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
