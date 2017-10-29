
const express  = require('express');
const router   = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const user = require('./controllers/user');
router.get('/user', user.getUsers);
router.get('/user/:id', user.getUserById);
router.post('/user', user.createUser);
router.put('/user/:id', user.updateUserById);
router.delete('/user/:id', user.deleteUserById);

const auth = require('./controllers/auth');
router.get('/me', auth.signInByToken);
router.post('/signin', auth.signIn);
router.post('/signup', user.createUser);

module.exports = router;