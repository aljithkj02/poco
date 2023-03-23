
import Post from "../Models/post.js";
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            status: true,
            posts
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}