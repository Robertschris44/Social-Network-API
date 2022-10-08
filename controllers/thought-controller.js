const { User, Thought } = require('../models');

const thoughtControlller = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //get one thoughts by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thoughts found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //add thought to user
    addThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no user found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    //adding reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thoughts found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err =>  res.status(400).json(err)); 
    },

    //update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
        .populate({path: 'reactions', select: '-__V'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thoughts found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    //remove thought
    removeThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found'});
                return;
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true}
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'user not found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$pull: { reactions: { reactionId: params.reactionId} } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'not found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }







};

module.exports = thoughtControlller;