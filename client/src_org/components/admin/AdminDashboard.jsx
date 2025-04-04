// frontend/src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [pollingHeads, setPollingHeads] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollingHeads = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/polling-heads', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPollingHeads(response.data);
      } catch (error) {
        console.error('Error fetching polling heads:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPollingHeads();
  }, [navigate]);

  const handleHeadCreated = (newHead) => {
    setPollingHeads([...pollingHeads, newHead]);
    setShowCreateForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <button 
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-6"
      >
        {showCreateForm ? 'Cancel' : 'Create Polling Station Head'}
      </button>
      
      {showCreateForm && (
        <CreatePollingHead onSuccess={handleHeadCreated} />
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Polling Station Heads</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Polling Station</th>
                </tr>
              </thead>
              <tbody>
                {pollingHeads.map(head => (
                  <tr key={head._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{head.username}</td>
                    <td className="py-3 px-4">{head.email}</td>
                    <td className="py-3 px-4">{head.pollingStation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;