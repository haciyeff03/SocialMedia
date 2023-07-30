const User = require('../models/User.js');



/* read */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findbyId(id);
        req.status(200).json(user);


    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findbyId(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findbyId(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        req.status(200).json(formattedFriends);

    }
    catch (err) {
        res.status(404).json({message: err.message })
    }
};

/* update */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findbyId(id);
        const friend = await User.findbyId(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }

        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findbyId(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}