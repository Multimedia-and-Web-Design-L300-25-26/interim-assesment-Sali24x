const mongoose = require('mongoose');
require('dotenv').config();

const Crypto = require('./models/Crypto');

const seedCryptos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Crypto.deleteMany({});
    console.log('Cleared existing crypto data');

    // Seed data
    const cryptoData = [
      {
        name: "Bitcoin",
        symbol: "BTC",
        price: 45250.50,
        image: "https://images.unsplash.com/photo-1516745511142-66f962d2000b?w=100&h=100&fit=crop",
        change24h: 3.25,
        marketCap: 890000000000,
        volume24h: 35000000000,
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price: 2580.75,
        image: "https://images.unsplash.com/photo-1518546305927-30259ccede15?w=100&h=100&fit=crop",
        change24h: 2.10,
        marketCap: 310000000000,
        volume24h: 18000000000,
      },
      {
        name: "Tether",
        symbol: "USDT",
        price: 1.00,
        image: "https://images.unsplash.com/photo-1579621970563-430f63602d4b?w=100&h=100&fit=crop",
        change24h: 0.02,
        marketCap: 95000000000,
        volume24h: 50000000000,
      },
      {
        name: "BNB",
        symbol: "BNB",
        price: 612.80,
        image: "https://images.unsplash.com/photo-1523314409910-d40cedf1d647?w=100&h=100&fit=crop",
        change24h: 1.75,
        marketCap: 93000000000,
        volume24h: 2500000000,
      },
      {
        name: "Ripple",
        symbol: "XRP",
        price: 2.45,
        image: "https://images.unsplash.com/photo-1529148482759-b8610a9fb56f?w=100&h=100&fit=crop",
        change24h: -1.50,
        marketCap: 132000000000,
        volume24h: 3800000000,
      },
      {
        name: "USDC",
        symbol: "USDC",
        price: 1.00,
        image: "https://images.unsplash.com/photo-1634498692151-c3e1e1f4c85b?w=100&h=100&fit=crop",
        change24h: 0.01,
        marketCap: 39000000000,
        volume24h: 3200000000,
      },
      {
        name: "Solana",
        symbol: "SOL",
        price: 192.50,
        image: "https://images.unsplash.com/photo-1516271088733-e4a2b76bb049?w=100&h=100&fit=crop",
        change24h: 5.80,
        marketCap: 85000000000,
        volume24h: 2800000000,
      },
      {
        name: "Cardano",
        symbol: "ADA",
        price: 1.08,
        image: "https://images.unsplash.com/photo-1521314049149-fc42fc3e4c74?w=100&h=100&fit=crop",
        change24h: 2.30,
        marketCap: 40000000000,
        volume24h: 1200000000,
      },
      {
        name: "Dogecoin",
        symbol: "DOGE",
        price: 0.42,
        image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=100&h=100&fit=crop",
        change24h: 8.50,
        marketCap: 62000000000,
        volume24h: 950000000,
      },
      {
        name: "Polkadot",
        symbol: "DOT",
        price: 7.25,
        image: "https://images.unsplash.com/photo-1526666923127-b2c5f7ff681d?w=100&h=100&fit=crop",
        change24h: 1.20,
        marketCap: 35000000000,
        volume24h: 890000000,
      },
      {
        name: "Polygon",
        symbol: "MATIC",
        price: 0.92,
        image: "https://images.unsplash.com/photo-1534629852190-d2d1ca7a5df2?w=100&h=100&fit=crop",
        change24h: 4.50,
        marketCap: 9500000000,
        volume24h: 850000000,
      },
      {
        name: "Litecoin",
        symbol: "LTC",
        price: 182.30,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop",
        change24h: -0.75,
        marketCap: 25000000000,
        volume24h: 1100000000,
      },
      {
        name: "Chainlink",
        symbol: "LINK",
        price: 28.50,
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=100&fit=crop",
        change24h: 3.15,
        marketCap: 13500000000,
        volume24h: 680000000,
      },
      {
        name: "Uniswap",
        symbol: "UNI",
        price: 18.75,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop",
        change24h: 2.80,
        marketCap: 14000000000,
        volume24h: 420000000,
      },
      {
        name: "Avalanche",
        symbol: "AVAX",
        price: 38.90,
        image: "https://images.unsplash.com/photo-1515378960830-ce8aca02012d?w=100&h=100&fit=crop",
        change24h: 6.25,
        marketCap: 14800000000,
        volume24h: 580000000,
      },
    ];

    const inserted = await Crypto.insertMany(cryptoData);
    console.log(`Successfully seeded ${inserted.length} cryptocurrencies`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedCryptos();
