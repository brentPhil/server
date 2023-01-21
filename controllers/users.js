import User from "../models/UserDetails.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({error: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriend = friends.map(
            ({ _id, firstName, lastName, occupation, location, imgPath }) => {
                return { _id, firstName, lastName, occupation, location, imgPath };
            }
        );
        res.status(200).json(formattedFriend);
    } catch (error) {
        res.status(500).json({error: err.message });
    }
    
};

// UPDATE

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.friendId(id);
        const friend = await User.findById(friendId);

        if (user.friend.includes(friendId)){
            user.friend = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friendId.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriend = friends.map(
            ({ _id, firstName, lastName, occupation, location, imgPath }) => {
                return { _id, firstName, lastName, occupation, location, imgPath };
            }
        );

        res.status(200).json(formattedFriend);

    } catch (err) {
        res.status(500).json({error: err.message });
    }
}