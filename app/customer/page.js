'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: ''
  });
  const [error, setError] = useState('');
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE}/customer`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = editingCustomer
        ? `${API_BASE}/customer/${editingCustomer._id}`
        : `${API_BASE}/customer`;

      const method = editingCustomer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save customer');
      }

      setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
      setShowForm(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      dateOfBirth: customer.dateOfBirth.split('T')[0],
      memberNumber: customer.memberNumber,
      interests: customer.interests || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    try {
      const response = await fetch(`${API_BASE}/customer/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete customer');

      fetchCustomers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    setError('');
  };

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-violet-950">Customer Management</h1>
            <div className="space-x-2">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Home
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-violet-950 text-white rounded hover:bg-violet-800"
              >
                {showForm ? 'Cancel' : 'Add New Customer'}
              </button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 border-2 border-violet-200 rounded p-4 bg-violet-50">
              <h2 className="text-xl font-semibold mb-4 text-violet-950">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Member Number *</label>
                  <input
                    type="number"
                    required
                    value={formData.memberNumber}
                    onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Interests</label>
                  <input
                    type="text"
                    placeholder="e.g., movies, football, gym"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editingCustomer ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-violet-950 text-white">
                  <th className="p-3 text-left">Member #</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date of Birth</th>
                  <th className="p-3 text-left">Interests</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No customers found. Add your first customer!
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{customer.memberNumber}</td>
                      <td className="p-3">
                        <button
                          onClick={() => router.push(`/customer/${customer._id}`)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {customer.name}
                        </button>
                      </td>
                      <td className="p-3">
                        {new Date(customer.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="p-3">{customer.interests || 'N/A'}</td>
                      <td className="p-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}