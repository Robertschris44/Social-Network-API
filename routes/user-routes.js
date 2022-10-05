const router = require('express').Router();

//import function
const {
    createUser
} = require('../controllers/user-controller');







//home route to get all users and post to user
router
.route('/')

.get()
.post(createUser);

//get one route, put route, and delete route
router
.route('/:id')
.get()
.put()
.delete();



module.exports = router;