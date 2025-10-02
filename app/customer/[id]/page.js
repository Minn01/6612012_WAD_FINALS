'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CustomerDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (params.id) {
            fetchCustomer();
        }
    }, [params.id]);

    const fetchCustomer = async () => {
        try {
            const response = await fetch(`${API_BASE}/customer/${params.id}`);

            if (!response.ok) {
                throw new Error('Customer not found');
            }

            const data = await response.json();
            setCustomer(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this customer?')) return;

        try {
            const response = await fetch(`${API_BASE}/customer/${params.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete customer');

            router.push('/customer');
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error || !customer) {
        return (
            <div className="min-h-screen bg-gray-50 p-5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                            <p className="text-gray-600 mb-4">{error || 'Customer not found'}</p>
                            <button
                                onClick={() => router.push('/customer')}
                                className="px-6 py-2 bg-violet-950 text-white rounded hover:bg-violet-800"
                            >
                                Back to Customers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-violet-950">Customer Details</h1>
                        <button
                            onClick={() => router.push('/customer')}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Back to List
                        </button>
                    </div>

                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-20 h-20 bg-violet-950 text-white rounded-full flex items-center justify-center text-3xl font-bold mr-4">
                                    {customer.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
                                    <p className="text-gray-500">Member #{customer.memberNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Date of Birth</h3>
                            <p className="text-lg text-gray-800">
                                {new Date(customer.dateOfBirth).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Age: {calculateAge(customer.dateOfBirth)} years old
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Member Number</h3>
                            <p className="text-lg text-gray-800">{customer.memberNumber}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Interests</h3>
                            <p className="text-lg text-gray-800">
                                {customer.interests || 'No interests specified'}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Created At</h3>
                            <p className="text-sm text-gray-800">
                                {new Date(customer.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Last Updated</h3>
                            <p className="text-sm text-gray-800">
                                {new Date(customer.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => router.push('/customer')}
                            className="flex-1 px-6 py-3 bg-violet-950 text-white rounded-lg hover:bg-violet-800 font-medium"
                        >
                            Back to Customer List
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                        >
                            Delete Customer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}