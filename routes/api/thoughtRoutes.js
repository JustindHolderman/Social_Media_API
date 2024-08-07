const router = require('express').Router();
const { Thought, User } = require('../../models/index');
const { Types } = require('mongoose');

    // /api/thoughts/
    router
        .route('/')
        .get(async (req, res) => {
            try {
                const thoughts = await Thought.find();
                res.json(thoughts);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        })
        .post(async (req, res) => {
            try {
                const newThought = await Thought.create(req.body);
                const user = await User.updateOne(
                    { username: req.body.username },
                    { $addToSet: { thoughts: newThought._id}},
                    { new: true }
                );
                res.json(newThought);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });

    // /api/thoughts/:thoughtId
    router
        .route('/:thoughtId')
        .get(async (req, res) => {
            try {
                const singleThought = await Thought.findById(req.params.thoughtId);
                res.json(singleThought);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        })
        .put(async (req, res) => {
            try {
                const updateThought = await Thought.updateOne(
                    { _id: req.params.thoughtId },
                    req.body,
                    { new: true }
                );
                res.json(updateThought);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err)
            };
        })
        .delete(async (req, res) => {
            try {
                const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
                if (!deleteThought) return res.status(404).json({ error: "thought id does not exist" });
                const updateUser = await User.updateOne(
                    { username: deleteThought.username },
                    { $pull: { thoughts: req.params.thoughtId }},
                );
                res.json({ deleted_thought: deleteThought});
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });

    // /api/thoughts/:thoughtId/reactions
    router  
        .route('/:thoughtId/reactions')
        .post(async (req, res) => {
            try {
                const addReaction = await Thought.updateOne(
                    { _id: req.params.thoughtId },
                    { $addToSet: { reactions: req.body }},
                    { new: true }
                );
                res.json(addReaction);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });

    // /api/thoughts/:thoughtId/reactions/:reactionId
    router
        .route('/:thoughtId/reactions/:reactionId')
        .delete(async (req, res) => {
            try {
                const deleteReaction = await Thought.updateOne(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { reactionId: req.params.reactionId }}},
                    { new: true }
                );
                res.json(deleteReaction);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            };
        });
        

    module.exports = router;