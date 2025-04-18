"use client";

import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner'; // Spinner loader

const BuyerDashboard = () => {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const response = await fetch('/api/buyers/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBuyer(data);
        } else {
          throw new Error('Failed to fetch farmer data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerData();
  }, []);

  if (loading) {
    return <div className="flex bg-white justify-center items-center min-h-screen">
    <TailSpin
      height={60}
      width={60}
      color="gray"
      ariaLabel="loading-spinner"
    />
  </div>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4">
          <nav className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block py-2 px-4 rounded hover:bg-blue-100 text-gray-800">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/buyers/myContracts" className="block py-2 px-4 rounded hover:bg-blue-100 text-gray-800">
                  My Contracts
                </a>
              </li>
              <li>
                <a href="/buyers/profile" className="block py-2 px-4 rounded hover:bg-blue-100 text-gray-800">
                  Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="block py-2 px-4 rounded hover:bg-blue-100 text-gray-800">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Welcome, {buyer?.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Current Contracts</h3>
              <p className="text-gray-700">View and manage your current contracts here.</p>
              {/* Display a list or table of contracts */}
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Farm Statistics</h3>
              <p className="text-gray-700">View your farm statistics and performance metrics here.</p>
              {/* Display charts or stats */}
            </div>
        <div className="grid-container">
      <div className="card weather">
        <h4>🌦️ Weather Forecast</h4>
        <p>Get real-time and daily weather updates.</p>
        <a href="https://agrisens.netlify.app/weather-forecast/">Check Weather →</a>
      </div>

      <div className="card crop">
        <h4>🌱 Crop Recommendation</h4>
        <p>Find the best crops to grow based on your soil and season.</p>
        <a href="https://crop-recomm.streamlit.app/">Get Recommendations →</a>
      </div>

      <div className="card disease">
        <h4>🧬 Disease Prediction</h4>
        <p>Detect potential plant diseases using AI insights.</p>
        <a href="https://agrisens-crop-disease-pred.streamlit.app/">Predict Now →</a>
      </div>

      <div className="card guide">
        <h4>📘 Farming Guidance</h4>
        <p>Get step-by-step advice for better agricultural practices.</p>
        <a href="https://agrisens.netlify.app/guide/">Get Guidance →</a>
      </div>

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }

        .card {
          background: #f5f5f5;
          padding: 1.2rem;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }

        .card h4 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }

        .card p {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.75rem;
        }

        .card a {
          color: #0077cc;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .card a:hover {
          text-decoration: underline;
        }

        /* Color accents */
        .weather {
          background: #e0f2fe;
        }

        .crop {
          background: #e6f4ea;
        }

        .disease {
          background: #fce7e9;
        }

        .guide {
          background: #fef9c3;
        }
      `}</style>
    </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
