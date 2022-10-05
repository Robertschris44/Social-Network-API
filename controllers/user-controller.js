const { User, Thought } = require('../models');



const userController = {
//write function to create user
createUser({ body } , res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
},

getAllUsers(req, res) {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
},

getUserbyId({params}, res) {
    User.findOne({_id: params.id})
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({ message: 'user not found' });
            return;
        }
        res.json(dbUserData);
        
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
















}

module.exports = userController;