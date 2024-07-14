const router = require('express').Router();
const { getAllCards, getCardById, getCardsByUserId, createNewCard, deleteCard, updateCard, likeCard, updateBizNumber } = require('../controllers/cardsControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');


router.get('/', getAllCards)
router.get('/:id', getCardById)
router.get('/my-cards/:userId', mustLogin, allowedRoles(['ownUser']), getCardsByUserId);
router.post('/', mustLogin, allowedRoles(['business']), createNewCard);
router.delete('/:id', mustLogin, allowedRoles(['ownUser', 'admin']), deleteCard)
router.put('/:id', mustLogin, allowedRoles(['ownUser']), updateCard)
router.patch('/:cardId', mustLogin, likeCard)
router.patch('/biz-number/:cardId', mustLogin, allowedRoles(['admin']), updateBizNumber);


module.exports = router;


