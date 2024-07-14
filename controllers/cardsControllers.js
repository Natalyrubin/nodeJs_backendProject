const schemas = require("../schemas/cardsSchema");
const Card = require("../models/Card");

const getAllCards = async (req, res) => {
  try {
    const allCards = await Card.find({});

    return res.status(200).json({
      success: true,
      data: allCards,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getCardById = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Card.findById(id).populate('user_id').exec();

    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }

    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for card id",
    });
  }
};


const getCardsByUserId = async (req, res) => {
  const { userId } = req.params;
  const { id: loggedInUserId } = req.user;

  if (userId !== loggedInUserId) {
    return res.status(403).json({ success: false, message: 'Forbidden: You can only access your own cards' });
  }

  try {
    const cards = await Card.find({ user_id: userId }).exec();
    return res.status(200).json({
      success: true,
      data: cards
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error retrieving cards: ${err.message}`
    });
  }
};




const createNewCard = async (req, res) => {
  const { error, value } = schemas.createNewCard.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  const newCardData = {
    ...value,
    user_id: req.user.id
  };

  const newCard = new Card(newCardData);

  try {
    newCard.bizNumber = await Card.getNextBizNumber();

    const saved = await newCard.save();

    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error saving the card: ${err.message}` });
  }
};





const deleteCard = async (req, res) => {
  const { id } = req.params;
  const { id: userId, isAdmin } = req.user;

  try {
    const card = await Card.findOne({ _id: id });

    if (!card) {
      return res.status(404).json({ success: false, message: `Card id ${id} not found.` });
    }

    if (isAdmin || card.user_id.toString() === userId) {
      const deleted = await Card.findByIdAndDelete(id);

      if (!deleted) {
        throw new Error();
      }

      return res.status(200).json({ success: true, deleted: deleted });
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized: You are not allowed to delete this card.' });
    }
  } catch (err) {
    return res.status(404).json({ success: false, message: `Card id ${id} not found or error deleting the card.` });
  }
};





const updateCard = async (req, res) => {
  const { error, value } = schemas.updateCard.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }

  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const card = await Card.findOne({ _id: id, user_id: userId });

    if (!card) {
      return res.status(404).json({ success: false, message: `Card id ${id} not found or user is not authorized to update this card.` });
    }

    const updated = await Card.findByIdAndUpdate(id, value, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: `Card id ${id} was not found.` });
    }

    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error updating the card: ${err.message}` });
  }
};



const likeCard = async (req, res) => {
  const { cardId } = req.params;
  const { id: userId } = req.user;

  console.log('cardId:', cardId);

  try {
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ success: false, message: `Card id ${cardId} not found.` });
    }

    if (card.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: `User ${userId} already liked this card.` });
    }

    card.likes.push(userId);

    const updatedCard = await card.save();

    return res.status(200).json({ success: true, updatedCard });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error adding like to card: ${err.message}` });
  }
};


const updateBizNumber = async (req, res) => {
  const { cardId } = req.params;
  const { newBizNumber } = req.body;
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Only admins can update the business number.' });
  }

  try {
    const existingCard = await Card.findOne({ bizNumber: newBizNumber });
    if (existingCard) {
      return res.status(400).json({ success: false, message: `Business number ${newBizNumber} is already taken.` });
    }

    const updatedCard = await Card.findByIdAndUpdate(cardId, { bizNumber: newBizNumber }, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ success: false, message: `Card id ${cardId} not found.` });
    }

    return res.status(200).json({ success: true, updatedCard });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error updating business number: ${err.message}` });
  }
};




module.exports = {
  getAllCards,
  getCardById,
  getCardsByUserId,
  createNewCard,
  deleteCard,
  updateCard,
  likeCard,
  updateBizNumber
};
