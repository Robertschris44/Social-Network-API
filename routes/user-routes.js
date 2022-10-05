const router = require('express').Router();









//home route to get all users and post to user
router
.route('/')

.get()
.post();

//get one route, put route, and delete route
router
.route('/:id')
.get()
.put()
.delete();



module.exports = router;