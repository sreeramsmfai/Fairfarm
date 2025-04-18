"use client";

import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner'; // Spinner loader

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await fetch('/api/farmers/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFarmer(data);
        } else {
          throw new Error('Failed to fetch farmer data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  if (loading) {
    return <div className="flex bg-white justify-center items-center min-h-screen">
    <TailSpin
      height={60}
      width={60}
      color="gray"
      ariaLabel="loading-spinner"
    />
    </div>;
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
                <a href="#" className="block py-2 px-4 rounded hover:bg-green-100 text-gray-800">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/farmers/myContracts" className="block py-2 px-4 rounded hover:bg-green-100 text-gray-800">
                  My Contracts
                </a>
              </li>
              <li>
                <a href="/farmers/profile" className="block py-2 px-4 rounded hover:bg-green-100 text-gray-800">
                  Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="block py-2 px-4 rounded hover:bg-green-100 text-gray-800">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Welcome, {farmer?.name}!</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-1">Weather Forecast</h4>
        <p className="text-sm text-gray-600 mb-2">Get real-time and weekly weather updates.</p>
        <a href="https://agrisens.netlify.app/weather-forecast/" className="text-blue-500 text-sm hover:underline">Check Weather</a>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-1">Crop Recommendation</h4>
        <p className="text-sm text-gray-600 mb-2">Find the best crops to grow based on your soil and season.</p>
        <a href="https://crop-recomm.streamlit.app/" className="text-blue-500 text-sm hover:underline">Get Recommendations</a>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-1">Disease Prediction</h4>
        <p className="text-sm text-gray-600 mb-2">Detect potential plant diseases using AI insights.</p>
        <a href="https://agrisens-crop-disease-pred.streamlit.app/" className="text-blue-500 text-sm hover:underline">Predict Now</a>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-1">Farming Guidance</h4>
        <p className="text-sm text-gray-600 mb-2">Get step-by-step advice for better agricultural practices.</p>
        <a href="https://agrisens.netlify.app/guide/" className="text-blue-500 text-sm hover:underline">Get Guidance</a>
      </div>
    </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
