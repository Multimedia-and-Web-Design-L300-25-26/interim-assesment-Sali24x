const express = require('express');
const {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  createCrypto,
  getCryptoById,
  updateCrypto,
  deleteCrypto
} = require('../controllers/cryptoController');
const {
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET user profile
router.get('/profile', authMiddleware, getUserProfile);

// UPDATE user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Public crypto routes
router.get('/', getAllCryptos);
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);
router.get('/:id', getCryptoById);

// Protected crypto routes (for adding new cryptos - can be restricted to admin later)
router.post('/', authMiddleware, createCrypto);
router.put('/:id', authMiddleware, updateCrypto);
router.delete('/:id', authMiddleware, deleteCrypto);

module.exports = router;
