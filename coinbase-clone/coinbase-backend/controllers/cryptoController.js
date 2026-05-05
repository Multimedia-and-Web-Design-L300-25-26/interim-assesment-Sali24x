const Crypto = require('../models/Crypto');

// Get all cryptocurrencies
exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get top gainers
exports.getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get new listings
exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new cryptocurrency (Admin only - you can add role-based access later)
exports.createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validation
    if (!name || !symbol || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, symbol, price, and image are required'
      });
    }

    // Check if crypto already exists
    const existingCrypto = await Crypto.findOne({ symbol });
    if (existingCrypto) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists'
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h: change24h || 0
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency created successfully',
      data: crypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single cryptocurrency
exports.getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found'
      });
    }

    res.status(200).json({
      success: true,
      data: crypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update cryptocurrency
exports.updateCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    let crypto = await Crypto.findById(req.params.id);

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found'
      });
    }

    crypto = await Crypto.findByIdAndUpdate(
      req.params.id,
      { name, symbol, price, image, change24h },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Cryptocurrency updated successfully',
      data: crypto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete cryptocurrency
exports.deleteCrypto = async (req, res) => {
  try {
    const crypto = await Crypto.findByIdAndDelete(req.params.id);

    if (!crypto) {
      return res.status(404).json({
        success: false,
        message: 'Cryptocurrency not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cryptocurrency deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
