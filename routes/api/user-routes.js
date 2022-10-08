const router = require('express').Router();

//import function
const {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');




//home route to get all users and post to user
router
.route('/')
.get(getAllUsers)
.post(createUser);

//get one route, put route, and delete route
router
.route('/:id')
.get(getUserbyId)
.put(updateUser)
.delete(deleteUser);



router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)



module.exports = router;