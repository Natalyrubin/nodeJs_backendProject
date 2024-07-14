const router = require('express').Router();
const { getAllUsers, getUserById, deleteUser, updateUser, toggleIsBusiness } = require('../controllers/usersControllers');
const { register, login, mustLogin, allowedRoles } = require('../controllers/authControllers');



router.get('/', mustLogin, allowedRoles(['admin']), getAllUsers)
router.get('/:id', mustLogin, allowedRoles(['ownUser', 'admin']), getUserById)
router.post('/', register)
router.post('/login', login)
router.delete('/:id', mustLogin, allowedRoles(['ownUser', 'admin']), deleteUser)
router.put('/:id', mustLogin, allowedRoles(['ownUser']), updateUser)
router.patch('/:id', mustLogin, allowedRoles(['ownUser']), toggleIsBusiness)

module.exports = router;