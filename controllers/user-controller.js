const { User, Thought } = require('../models');



const userController = {
//get all users
getAllUsers(req, res) {
    User.find({})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},

getUserbyId({params}, res) {
    User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'not found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    });
    
},

//creating a user
createUser({body}, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
},

//update user by id
updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id}, body, {
        new: true,
        runValidators: true
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'nothing found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

//delete user
deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
    .then(() => {
        User.findOneAndDelete({ userId: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found'})
                return;
            }
            res.json(dbUserData);
        });
    })
    .catch(err => res.status(400).json(err));
},

//add friend
addFriend({ params}, res) {
    User.findOneAndUpdate(
        { _id: params.userId},
        { $push: { friends: params.friendId} },
        { new: true }
    )
    .populate({ path: 'friends', select: ('-__v') })
    .select('-__v')
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({ message:'nothing found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
},

//remove friend
removeFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId},
        { $pull: {friends: params.friendId}},
        { new: true }
    )
    .populate({ path: 'friends', select: '-__v' })
    .select('-__v')
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'nothing found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
}

};

module.exports = userController;