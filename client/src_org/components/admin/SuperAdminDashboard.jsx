// frontend/src/components/admin/SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateRegionalOfficer from './CreateRegionalOfficer';

const SuperAdminDashboard = () => {
    const [regions, setRegions] = useState([]);
    const [officers, setOfficers] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const regionsRes = await axios.get('/api/admin/regions', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setRegions(regionsRes.data);

                const officersRes = await axios.get('/api/admin/regional-officers', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setOfficers(officersRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
            
            <div className="mb-8">
                <button 
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {showCreateForm ? 'Cancel' : 'Create Regional Officer'}
                </button>
                
                {showCreateForm && (
                    <CreateRegionalOfficer 
                        regions={regions} 
                        onSuccess={() => {
                            setShowCreateForm(false);
                            // Refresh officers list
                        }}
                    />
                )}
            </div>
            
            <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Regional Officers</h2>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Region</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officers.map(officer => (
                            <tr key={officer._id}>
                                <td className="py-2 px-4 border">{officer.profile?.name || 'N/A'}</td>
                                <td className="py-2 px-4 border">{officer.email}</td>
                                <td className="py-2 px-4 border">{officer.region?.name || 'N/A'}</td>
                                <td className="py-2 px-4 border">
                                    <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;