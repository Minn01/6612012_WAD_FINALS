import { NextResponse } from 'next/server';
import Customer from '../../../../models/Customer';
import connectDB from '../../../../lib/db.js';

// GET single customer by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const customer = await Customer.findById(params.id);
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customer', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update customer by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const customer = await Customer.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update customer', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE customer by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const customer = await Customer.findByIdAndDelete(params.id);
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Customer deleted successfully', customer },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete customer', details: error.message },
      { status: 500 }
    );
  }
}