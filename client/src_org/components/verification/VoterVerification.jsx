// frontend/src/components/verification/VoterVerification.jsx
import React, { useState } from 'react';
import axios from 'axios';

const VoterVerification = () => {
  const [voterId, setVoterId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!voterId.trim()) {
      setError('Please enter a voter ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/verify/verify', 
        { voterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Voter Verification</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Voter ID (NFC)</label>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Scan or enter voter ID"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium mb-6 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Verifying...' : 'Verify Voter'}
      </button>
      
      {result && (
        <div className={`p-4 rounded-md border ${result.verified ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <h3 className={`font-bold ${result.verified ? 'text-green-700' : 'text-red-700'}`}>
            {result.message}
          </h3>
          
          {result.voter && (
            <div className="mt-3">
              <div className="flex items-center mb-2">
                {result.voter.photo && (
                  <img 
                    src={result.voter.photo} 
                    alt="Voter" 
                    className="w-16 h-16 rounded-full mr-3 border-2 border-white shadow"
                  />
                )}
                <div>
                  <p className="font-medium">{result.voter.name}</p>
                  <p className="text-sm text-gray-600">ID: {result.voter.voterId}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoterVerification;