import React, { useState, useEffect, useRef } from "react";
import LoadingScreen from "../components/common/LoadingScreen";
import { cryptoAPI } from "../services/api";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Zap } from "lucide-react";

// Section Components
import ExploreHero from "../components/explore-sections/ExploreHero";
import ExploreCTA from "../components/explore-sections/ExploreCTA";
import Button from "../components/ui/Button";

function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [allCryptos, setAllCryptos] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [newListings, setNewListings] = useState([]);
  
  const topMoversRef = useRef(null);
  const newOnCoinbaseRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [allRes, gainersRes, newRes] = await Promise.all([
          cryptoAPI.getAllCryptos(),
          cryptoAPI.getTopGainers(),
          cryptoAPI.getNewListings(),
        ]);

        setAllCryptos(allRes.data || []);
        setTopGainers(gainersRes.data || []);
        setNewListings(newRes.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch cryptocurrency data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <ExploreHero />

      {/* Error Message */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-red-50 p-4 text-red-600 border border-red-200">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Market Stats Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-[#0a0b0d]">Market Overview</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
              <p className="text-sm text-gray-600 mb-2">Total Cryptocurrencies</p>
              <p className="text-3xl font-bold text-[#1652f0]">{allCryptos.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
              <p className="text-sm text-gray-600 mb-2">24h Top Gainers</p>
              <p className="text-3xl font-bold text-green-600">{topGainers.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
              <p className="text-sm text-gray-600 mb-2">New Listings</p>
              <p className="text-3xl font-bold text-purple-600">{newListings.length}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6">
              <p className="text-sm text-gray-600 mb-2">Total Listed</p>
              <p className="text-3xl font-bold text-orange-600">{allCryptos.length}</p>
            </div>
          </div>
        </div>

        {/* Top Gainers Section */}
        {topGainers.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={28} className="text-green-600" />
                <h2 className="text-3xl font-bold text-[#0a0b0d]">Top Gainers</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(topMoversRef, "left")}
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll(topMoversRef, "right")}
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={topMoversRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            >
              {topGainers.map((crypto) => (
                <div
                  key={crypto._id}
                  className="min-w-[280px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="h-12 w-12 rounded-full"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48?text=" + crypto.symbol;
                      }}
                    />
                    <div>
                      <p className="font-semibold text-[#0a0b0d]">{crypto.symbol}</p>
                      <p className="text-sm text-gray-600">{crypto.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#0a0b0d]">
                        ${crypto.price.toFixed(2)}
                      </p>
                      <p className={`text-sm font-semibold ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change24h >= 0 ? '↗' : '↘'} {Math.abs(crypto.change24h).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Listings Section */}
        {newListings.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap size={28} className="text-yellow-600" />
                <h2 className="text-3xl font-bold text-[#0a0b0d]">New on Coinbase</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(newOnCoinbaseRef, "left")}
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll(newOnCoinbaseRef, "right")}
                  className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div
              ref={newOnCoinbaseRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            >
              {newListings.map((crypto) => (
                <div
                  key={crypto._id}
                  className="min-w-[280px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="h-12 w-12 rounded-full"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48?text=" + crypto.symbol;
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#0a0b0d]">{crypto.symbol}</p>
                      <p className="text-sm text-gray-600">{crypto.name}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Price</p>
                      <p className="text-lg font-bold text-[#0a0b0d]">
                        ${crypto.price.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="primary" size="sm" className="bg-[#1652f0]">
                      Trade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Cryptocurrencies Table */}
        {allCryptos.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[#0a0b0d]">All Cryptocurrencies</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Symbol</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">24h Change</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {allCryptos.slice(0, 15).map((crypto) => (
                    <tr key={crypto._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="h-8 w-8 rounded-full"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/32?text=" + crypto.symbol;
                            }}
                          />
                          <span className="font-medium text-[#0a0b0d]">{crypto.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{crypto.symbol}</td>
                      <td className="px-6 py-4 text-right font-semibold text-[#0a0b0d]">
                        ${crypto.price.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600">
                        ${(crypto.marketCap / 1000000000).toFixed(2)}B
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Data Message */}
        {allCryptos.length === 0 && !error && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-600">No cryptocurrency data available yet.</p>
            <Button variant="primary" className="mt-4 bg-[#1652f0]">
              Refresh
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <ExploreCTA />
    </div>
  );
}

export default Explore;
