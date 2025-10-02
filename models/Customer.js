import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth']
  },
  memberNumber: {
    type: Number,
    required: [true, 'Please provide member number'],
    unique: true
  },
  interests: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);