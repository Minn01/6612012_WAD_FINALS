import { NextResponse } from 'next/server';
import Customer from '../../../models/Customer.js';
import connectDB from '../../../lib/db.js';

// GET all customers
export async function GET() {
    try {
        await connectDB();
        const customers = await Customer.find({}).sort({ memberNumber: 1 });
        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch customers', details: error.message },
            { status: 500 }
        );
    }
}

// POST - Create new customer
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        const customer = await Customer.create(body);
        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Member number already exists' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to create customer', details: error.message },
            { status: 500 }
        );
    }
}