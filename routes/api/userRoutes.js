const router = require('express').Router();
const { User, Thought } = require('../../models/index');
    

        // get all users
    router
        .route('/')
        .get(async (req, res) => {
            try {
                const users = await User.find({});
                res.json(users);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        })
        .post(async (req, res) => {
            try {
                const newUser = await User.create(req.body);
                res.json(newUser);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });
        
        // get single user by id
        router
        .route('/:userId')
        .get(async (req, res) => {
            try {
                const singleUser = await User.findById(req.params.userId);
                res.json(singleUser);
            }
            catch (err) {
                console.err(err);
                res.status(500).json(err);
            };
        })
        .put(async (req, res) => {
            try {
                const updateUser = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    req.body,
                    { new: true }
                );
                res.json(updateUser)
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        })

        .delete(async (req, res) => {
            try {
                const deleteUser = await User.findByIdAndDelete(req.params.userId);

        // BONUS delete associated thoughts if the user has any
                if (deleteUser.thoughts.length > 0) {
                    await Thought.deleteMany({ username: deleteUser.username });
                };
                
                res.json({
                    user_deleted: deleteUser
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });
            // add friend to user friends array

        router
        .route('/:userId/friends/:friendId')
        .post(async (req, res) => {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            try {
                const user = await User.updateOne(
                    { _id: userId },
                    { $addToSet: { friends: friendId }}
                );
                res.json(user);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);          
            };
        })
        // delete friend from user friends array
        .delete(async (req, res) => {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            try {
                const deleteFriend = await User.updateOne(
                    { _id: userId },
                    { $pull: { friends: friendId }}
                );
                res.json(deleteFriend);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);  
            };
        })


module.exports = router;

