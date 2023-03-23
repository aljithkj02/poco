import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: {
            type: 'string',
            required: true
        },
        img: {
            type: 'string',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('post', postSchema);

export default Post;