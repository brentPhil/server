import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, imgPath } = req.body;
        const user = await User.findById(userId);
        const newPost = Post({
            userId,
            filename: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userImgPath: user.imgPath,
            imgPath,
            like: {},
            comments: []
        })
        await newPost.save();
        
        const post = await Post.find();

        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({message: err.message})
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: err.message})
    }
}

// UPDATE

export const likePost = async (req, res) => {
    try {
        const { Id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById;
        const isLiked = post.likes.get(userId);

        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true)

        const updatePOST = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: err.message})
    }
}
